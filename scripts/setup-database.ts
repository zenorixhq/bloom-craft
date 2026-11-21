import dns from "dns";
import { Client } from "pg";
import { categories, products } from "../data/mockData";

// Hook dns.lookup to use public Google & Cloudflare DNS if local resolver fails
const origLookup = dns.lookup;
dns.lookup = function (hostname: any, options: any, callback: any) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  if (hostname && typeof hostname === "string" && hostname.includes("neon.tech")) {
    const resolver = new dns.Resolver();
    resolver.setServers(["8.8.8.8", "1.1.1.1"]);
    resolver.resolve4(hostname, (err, addresses) => {
      if (err) return origLookup.call(dns, hostname, options, callback);
      if (options && options.all) {
        callback(null, addresses.map((a) => ({ address: a, family: 4 })));
      } else {
        callback(null, addresses[0], 4);
      }
    });
    return;
  }
  return origLookup.call(dns, hostname, options, callback);
};

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_ODPxmdUBw0S5@ep-broad-block-b3tzm8qx-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

async function main() {
  console.log("Connecting to new Neon PostgreSQL database...");
  console.log("Host:", connectionString.split("@")[1]?.split("/")[0]);
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log("Connected successfully to Neon!");

  // 1. Create Tables
  console.log("Creating database tables if not exist...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS "Product" (
      "id" TEXT PRIMARY KEY,
      "slug" TEXT UNIQUE NOT NULL,
      "title" TEXT NOT NULL,
      "shortDescription" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "price" DOUBLE PRECISION NOT NULL,
      "salePrice" DOUBLE PRECISION,
      "priceQatar" DOUBLE PRECISION,
      "salePriceQatar" DOUBLE PRECISION,
      "category" TEXT NOT NULL,
      "subcategory" TEXT,
      "tags" TEXT NOT NULL,
      "images" TEXT NOT NULL,
      "rating" DOUBLE PRECISION DEFAULT 5.0,
      "reviewCount" INTEGER DEFAULT 0,
      "inStock" BOOLEAN DEFAULT true,
      "stockCount" INTEGER DEFAULT 10,
      "featured" BOOLEAN DEFAULT false,
      "isNewArrival" BOOLEAN DEFAULT false,
      "isBestSeller" BOOLEAN DEFAULT false,
      "variantJson" TEXT,
      "specsJson" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "Order" (
      "id" TEXT PRIMARY KEY,
      "orderNumber" TEXT UNIQUE NOT NULL,
      "customerName" TEXT NOT NULL,
      "customerEmail" TEXT NOT NULL,
      "customerPhone" TEXT NOT NULL,
      "shippingAddress" TEXT NOT NULL,
      "itemsJson" TEXT NOT NULL,
      "subtotal" DOUBLE PRECISION NOT NULL,
      "discountTotal" DOUBLE PRECISION DEFAULT 0,
      "shippingFee" DOUBLE PRECISION DEFAULT 0,
      "taxTotal" DOUBLE PRECISION DEFAULT 0,
      "grandTotal" DOUBLE PRECISION NOT NULL,
      "paymentMethod" TEXT NOT NULL,
      "paymentStatus" TEXT DEFAULT 'pending',
      "orderStatus" TEXT DEFAULT 'processing',
      "razorpayOrderId" TEXT,
      "razorpayPaymentId" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "SiteContent" (
      "key" TEXT PRIMARY KEY,
      "value" TEXT NOT NULL,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "MediaStorage" (
      "id" TEXT PRIMARY KEY,
      "fileName" TEXT NOT NULL,
      "mimeType" TEXT NOT NULL,
      "data" TEXT NOT NULL,
      "size" INTEGER NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Tables verified / created: Product, Order, SiteContent, MediaStorage.");

  // 2. Seed Categories into SiteContent
  console.log("Seeding site_categories into SiteContent...");
  await client.query(
    `
    INSERT INTO "SiteContent" ("key", "value", "updatedAt")
    VALUES ('site_categories', $1, CURRENT_TIMESTAMP)
    ON CONFLICT ("key")
    DO UPDATE SET "value" = EXCLUDED."value", "updatedAt" = CURRENT_TIMESTAMP;
  `,
    [JSON.stringify(categories)]
  );
  console.log(`Seeded ${categories.length} categories:`, categories.map(c => c.name).join(", "));

  // 3. Seed Products
  console.log("Seeding products...");
  for (const prod of products) {
    const tagsJson = JSON.stringify(prod.tags || []);
    const imagesJson = JSON.stringify(prod.images || []);
    const specsJson = prod.specifications ? JSON.stringify(prod.specifications) : null;
    const variantJson = prod.variants ? JSON.stringify(prod.variants) : null;

    await client.query(
      `
      INSERT INTO "Product" (
        "id", "slug", "title", "shortDescription", "description",
        "price", "salePrice", "category", "tags", "images",
        "rating", "reviewCount", "inStock", "stockCount",
        "featured", "isNewArrival", "isBestSeller", "variantJson", "specsJson", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15, $16, $17, $18, $19, CURRENT_TIMESTAMP
      )
      ON CONFLICT ("slug")
      DO UPDATE SET
        "title" = EXCLUDED."title",
        "shortDescription" = EXCLUDED."shortDescription",
        "description" = EXCLUDED."description",
        "price" = EXCLUDED."price",
        "salePrice" = EXCLUDED."salePrice",
        "category" = EXCLUDED."category",
        "tags" = EXCLUDED."tags",
        "images" = EXCLUDED."images",
        "inStock" = EXCLUDED."inStock",
        "stockCount" = EXCLUDED."stockCount",
        "featured" = EXCLUDED."featured",
        "isBestSeller" = EXCLUDED."isBestSeller",
        "isNewArrival" = EXCLUDED."isNewArrival",
        "specsJson" = EXCLUDED."specsJson",
        "updatedAt" = CURRENT_TIMESTAMP;
    `,
      [
        prod.id,
        prod.slug,
        prod.title,
        prod.shortDescription || "",
        prod.description || "",
        prod.price,
        prod.salePrice || null,
        prod.category,
        tagsJson,
        imagesJson,
        prod.rating || 5.0,
        prod.reviewCount || 0,
        prod.inStock !== false,
        prod.stockCount || 10,
        prod.featured || false,
        prod.isNewArrival || false,
        prod.isBestSeller || false,
        variantJson,
        specsJson,
      ]
    );
  }

  // 4. Verification
  const prodRes = await client.query('SELECT COUNT(*) as count FROM "Product"');
  const catRes = await client.query('SELECT "value" FROM "SiteContent" WHERE "key" = \'site_categories\'');
  const activeCats = JSON.parse(catRes.rows[0].value);
  
  console.log("\n=================== VERIFICATION SUCCESS ===================");
  console.log(`Total Products in Database: ${prodRes.rows[0].count}`);
  console.log(`Total Categories in Database: ${activeCats.length}`);
  console.log(`Active Categories: ${activeCats.map((c: any) => c.name).join(" | ")}`);
  console.log("============================================================\n");

  await client.end();
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
