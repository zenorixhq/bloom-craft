import pg from "pg";
import fs from "fs";
import path from "path";

const { Client } = pg;

const noomisDbUrl = "postgresql://neondb_owner:npg_B6OWXlF5TuyL@ep-summer-darkness-az7ghj9g-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// Bloom Craft category slugs
const bloomCategorySlugs = [
  "hamper-boxes", "plushies", "korean-stationery", "anti-tarnish-jewellery",
  "perfume", "ribbons", "frames", "quran-musalla", "acrylic-cutouts",
  "keychains", "basket", "trolley", "bouquet-sheet", "hamper", "journals-planners",
  "wax-seals-calligraphy", "desk-accessories", "cards-envelopes", "gifting-keepsakes"
];

async function main() {
  console.log("Connecting to Noomi's Neon DB (ep-summer-darkness)...");
  const client = new Client({
    connectionString: noomisDbUrl,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log("Connected successfully!");

  // 1. Check current site_categories
  const currentContentRes = await client.query('SELECT value FROM "SiteContent" WHERE key = $1', ['site_categories']);
  if (currentContentRes.rows.length > 0) {
    try {
      const parsed = JSON.parse(currentContentRes.rows[0].value);
      console.log("Current DB site_categories count:", parsed.length);
      console.log("Sample categories currently in DB:", parsed.slice(0, 5).map(c => c.name));
    } catch (e) {
      console.log("Current raw value:", currentContentRes.rows[0].value.slice(0, 100));
    }
  } else {
    console.log("No site_categories found in DB!");
  }

  // 2. Read Noomi's categories from ecom/data/mockData.ts
  const mockDataPath = "c:\\Users\\ACER\\Downloads\\ecom\\data\\mockData.ts";
  const mockContent = fs.readFileSync(mockDataPath, "utf-8");
  const match = mockContent.match(/export const categories: Category\[\] = (\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error("Could not find categories in " + mockDataPath);
  }

  const noomiCategories = eval(match[1]);
  console.log(`\nFound ${noomiCategories.length} original Noomi's Couture categories:`);
  noomiCategories.forEach((c, i) => console.log(`  ${i + 1}. ${c.name} (${c.slug})`));

  // 3. Update or Insert site_categories in SiteContent
  const newJson = JSON.stringify(noomiCategories);
  const upsertQuery = `
    INSERT INTO "SiteContent" (key, value, "updatedAt")
    VALUES ($1, $2, NOW())
    ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value, "updatedAt" = NOW();
  `;
  await client.query(upsertQuery, ['site_categories', newJson]);
  console.log("\n✅ Restored site_categories in Noomi's DB to original 11 jewelry categories!");

  // 4. Delete foreign Bloom Craft products from Noomi's DB
  const deleteQuery = `
    DELETE FROM "Product"
    WHERE category = ANY($1)
       OR id LIKE 'prod-ultimate%'
       OR id LIKE 'prod-serene%'
       OR id LIKE 'prod-kawaii%'
       OR id LIKE 'prod-golden%'
       OR id LIKE 'prod-box-%'
       OR id LIKE 'prod-plush-%'
       OR id LIKE 'prod-korean-%'
       OR id LIKE 'prod-perfume-%'
       OR id LIKE 'prod-ribbon-%'
       OR id LIKE 'prod-frame-%'
       OR id LIKE 'prod-musalla-%'
       OR id LIKE 'prod-acrylic-%'
       OR id LIKE 'prod-keychain-%'
       OR id LIKE 'prod-basket-%'
       OR id LIKE 'prod-trolley-%'
       OR id LIKE 'prod-bouquet-%';
  `;
  const delRes = await client.query(deleteQuery, [bloomCategorySlugs]);
  console.log(`✅ Deleted ${delRes.rowCount} foreign Bloom Craft products from Noomi's database.`);

  // 5. Verify products remaining in Noomi's database
  const prodCountRes = await client.query('SELECT COUNT(*) FROM "Product"');
  console.log(`✅ Noomi's Couture total products in DB: ${prodCountRes.rows[0].count}`);

  const catCountsRes = await client.query('SELECT category, count(*) FROM "Product" GROUP BY category ORDER BY count(*) DESC');
  console.log("\nNoomi's Product breakdown by category in DB:");
  catCountsRes.rows.forEach(r => console.log(`  - ${r.category}: ${r.count} products`));

  // 6. Verify SiteContent final check
  const verifyRes = await client.query('SELECT value FROM "SiteContent" WHERE key = $1', ['site_categories']);
  const finalCats = JSON.parse(verifyRes.rows[0].value);
  console.log("\n=================== VERIFIED NOOMI'S CATEGORIES IN NEON ===================");
  console.log(finalCats.map(c => `${c.name} (${c.slug})`).join("\n"));
  console.log("==========================================================================");

  await client.end();
}

main().catch(err => {
  console.error("Error restoring Noomi's DB:", err);
  process.exit(1);
});
