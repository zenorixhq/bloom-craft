import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    id: "cat-gift-hampers",
    slug: "gift-hampers",
    name: "Curated Gift Hampers",
    description: "Handcrafted wooden celebration boxes, gourmet tea sets, artisanal journals & bespoke hampers.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
    productCount: 8,
  },
  {
    id: "cat-journals-planners",
    slug: "journals-planners",
    name: "Journals & Planners",
    description: "Handcrafted full-grain leather journals, botanical linen notebooks & undated daily planners.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    productCount: 12,
  },
  {
    id: "cat-wax-seals-calligraphy",
    slug: "wax-seals-calligraphy",
    name: "Wax Seals & Calligraphy",
    description: "Solid brass monogram wax stamps, pearlescent sealing wax beads & vintage dip pen sets.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    productCount: 10,
  },
  {
    id: "cat-desk-accessories",
    slug: "desk-accessories",
    name: "Desk Accessories",
    description: "Carved solid walnut pen stands, vintage brass ruler clips & handcrafted leather desk mats.",
    image: "https://images.unsplash.com/photo-1507842229451-79b1be886a05?auto=format&fit=crop&q=80&w=800",
    productCount: 9,
  },
  {
    id: "cat-cards-envelopes",
    slug: "cards-envelopes",
    name: "Greeting Cards & Envelopes",
    description: "Handmade deckle-edge cotton cards, botanical pressed floral stationery & wax-sealed notelets.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800",
    productCount: 14,
  },
  {
    id: "cat-gifting-keepsakes",
    slug: "gifting-keepsakes",
    name: "Gifting Keepsakes",
    description: "Hand-poured botanical soy candles, solid brass floral bookmarks & luxury velvet ribbon wraps.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    productCount: 11,
  },
];

async function main() {
  await prisma.siteContent.upsert({
    where: { key: "site_categories" },
    update: { value: JSON.stringify(categories) },
    create: { key: "site_categories", value: JSON.stringify(categories) },
  });

  console.log("Successfully seeded site_categories to Neon database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
