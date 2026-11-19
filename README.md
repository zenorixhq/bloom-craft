# 🌿 Bloom Craft — Artisanal Stationery & Curated Gift Hampers

Official e-commerce storefront for **Bloom Craft** (`https://bloomcraft.in`), specializing in handcrafted journals, brass wax seal kits, bespoke greeting stationery, and curated celebration gift hampers.

Built with **Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma ORM, Neon Serverless PostgreSQL, and Razorpay Payment Gateway**.

---

## ✨ Features

- **Artisanal Design Aesthetic**: Botanical pine (`#214332`), warm gold (`#DC9924`), and warm cream paper palette (`#FAF8F5`).
- **Curated Collections**:
  1. Curated Gift Hampers
  2. Journals & Planners
  3. Wax Seals & Calligraphy
  4. Desk Accessories
  5. Greeting Cards & Envelopes
  6. Gifting Keepsakes
- **Checkout & Payment**: Full **Razorpay** checkout integration (supporting UPI, Google Pay, PhonePe, Cards, NetBanking, and Cash on Delivery).
- **First-Order Promotions**: Automatic first-purchase coupon system with `BLOOM10` (10% off) and `WELCOME5`.
- **Fulfillment & Tracking**: Complete order management, DTDC Express tracking lookup, unboxing video policy guide, and WhatsApp concierge notifications.
- **Merchant Admin Portal** (`/admin`): Live product inventory manager, order status updates, WhatsApp dispatch notification generator, and category configuration.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (Neon Serverless or any PostgreSQL instance)
- Razorpay account (Test or Live credentials)

### 2. Environment Setup
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://username:password@ep-host.aws.neon.tech/neondb?sslmode=require&schema=bloomcraft"

RAZORPAY_KEY_ID="rzp_test_your_key_id"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
```

### 3. Installation & Database Sync
```bash
# Install dependencies
npm install

# Push Prisma schema to the isolated bloomcraft PostgreSQL schema
npx prisma db push

# (Optional) Seed initial products & categories
node scripts/seed-bloomcraft.mjs
node scripts/seed-categories.mjs
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```text
bloom-craft/
├── app/
│   ├── api/
│   │   ├── create-order/       # Order submission endpoint
│   │   ├── orders/             # Order lookup and management
│   │   ├── products/           # Live product catalog API
│   │   └── razorpay/           # Razorpay order generation & HMAC signature verification
│   ├── account/                # Customer order tracking & address management
│   ├── admin/                  # Merchant administrative dashboard
│   ├── checkout/               # Multi-step checkout funnel & Razorpay modal
│   │   └── success/            # Order confirmation receipt & printable invoice
│   ├── policies/               # Shipping, unboxing video, return & care guide
│   ├── products/               # Filterable catalog with search, price & category facets
│   │   └── [slug]/             # Product detail page with gallery & variants
│   ├── layout.tsx              # Root layout & dynamic metadata
│   └── page.tsx                # Atelier editorial homepage
├── components/storefront/      # Reusable UI components & dialogs
├── config/
│   └── store.config.ts         # Master store configuration, branding & coupons
├── data/
│   └── mockData.ts             # Fallback stationery & hamper catalog
├── prisma/
│   └── schema.prisma           # PostgreSQL schema (Product, Order, SiteContent)
└── public/
    └── bloom-craft-logo.png    # Official brand logo
```

---

## 🔐 Admin Dashboard

Access the merchant portal at `/admin`:
- **Default Username**: `admin@bloomcraft.in` or `admin`
- **Default Password**: `bloomcraft@2026` or `admin123`

---

## 📦 Deployment

This project is optimized for deployment on **Vercel**:
1. Connect the repository `https://github.com/zenorixhq/bloom-craft`.
2. Configure environment variables (`DATABASE_URL`, `RAZORPAY_KEY_ID`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
3. Deploy! Next.js will build production assets and serve edge-optimized routes.
