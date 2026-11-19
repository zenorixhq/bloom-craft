export interface StoreConfig {
  meta: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    favicon: string;
  };
  brand: {
    logo: {
      text: string;
      subtext?: string;
      imageUrl?: string;
    };
    theme: {
      primary: string;         // HSL
      primaryHover: string;
      primaryForeground: string;
      accent: string;
      accentForeground: string;
      borderRadius: string;
      fontHeading: string;
      fontSans: string;
    };
    contact: {
      email: string;
      phone: string;
      whatsappNumber: string; // WhatsApp ordering phone without + or spaces
      address: string;
      hours: string;
    };
    socials: {
      instagram?: string;
      whatsapp?: string;
      facebook?: string;
    };
  };
  commerce: {
    defaultCurrency: "INR";
    supportedCurrencies: { code: string; symbol: string; name?: string; flag?: string; rate: number }[];
    freeShippingThreshold: number;
    flatShippingFee: number;
    shippingFeeKerala: number;
    shippingFeeOutsideKerala: number;
    taxRatePercent: number;
    taxInclusive: boolean;
    checkoutMode: "gateway" | "whatsapp"; // 'gateway' online checkout with Razorpay + WhatsApp assisted
    activeCoupons: {
      code: string;
      discountType: "percentage" | "fixed";
      amount: number;
      minSpend?: number;
      description: string;
      firstPurchaseOnly?: boolean;
    }[];
  };
  features: {
    enableWishlist: boolean;
    enableReviews: boolean;
    enableQuickView: boolean;
    enableStockBadges: boolean;
    enableAnnouncementBar: boolean;
    announcementText: string;
    enableWhatsAppFloat: boolean;
    enableCurrencySwitcher: boolean;
  };
}

export const storeConfig: StoreConfig = {
  meta: {
    name: "Bloom Craft",
    tagline: "Artisanal Stationery & Curated Gift Hampers",
    description: "Handcrafted Journals, Wax Seal Sets, Bespoke Paper Goods & Curated Celebration Gift Hampers. Thoughtfully crafted to make every moment memorable.",
    url: "https://bloomcraft.in",
    favicon: "/bloom-craft-logo.png",
  },
  brand: {
    logo: {
      text: "Bloom Craft",
      subtext: "Artisanal Stationery & Curated Hampers",
      imageUrl: "/bloom-craft-logo.png",
    },
    theme: {
      // Artisanal Botanical Sage, Deep Pine & Warm Amber Gold Palette
      primary: "158 35% 20%",       // Deep Botanical Pine #214332
      primaryHover: "158 40% 15%",  // Rich Evergreen
      primaryForeground: "0 0% 100%",
      accent: "38 75% 50%",         // Warm Artisan Gold Amber #DC9924
      accentForeground: "0 0% 100%",
      borderRadius: "0.75rem",
      fontHeading: "var(--font-heading)",
      fontSans: "var(--font-sans)",
    },
    contact: {
      email: "hello@bloomcraft.in",
      phone: "+91 98765 43210",
      whatsappNumber: "919876543210",
      address: "India • Pan-India Express Delivery & Gift Shipping",
      hours: "Mon – Sat: 9:30 AM – 7:30 PM IST",
    },
    socials: {
      instagram: "https://www.instagram.com/bloomcraft.in",
      whatsapp: "https://wa.me/919876543210",
    },
  },
  commerce: {
    defaultCurrency: "INR",
    supportedCurrencies: [
      { code: "INR", symbol: "₹", name: "India (₹)", flag: "🇮🇳", rate: 1.0 },
    ],
    freeShippingThreshold: 999,
    flatShippingFee: 60,
    shippingFeeKerala: 50,
    shippingFeeOutsideKerala: 60,
    taxRatePercent: 0,
    taxInclusive: true,
    checkoutMode: "gateway",
    activeCoupons: [
      {
        code: "BLOOM10",
        discountType: "percentage",
        amount: 10,
        firstPurchaseOnly: true,
        description: "10% off your first stationery or hamper order",
      },
      {
        code: "WELCOME5",
        discountType: "percentage",
        amount: 5,
        firstPurchaseOnly: true,
        description: "5% off your first order",
      },
      {
        code: "FREESHIP",
        discountType: "fixed",
        amount: 60,
        minSpend: 999,
        description: "Free express delivery on orders ₹999+",
      },
    ],
  },
  features: {
    enableWishlist: true,
    enableReviews: true,
    enableQuickView: true,
    enableStockBadges: true,
    enableAnnouncementBar: true,
    announcementText: "🌿 Handcrafted Stationery & Thoughtful Gift Hampers • Free Shipping on Orders ₹999+ • Secure Checkout via UPI & Cards",
    enableWhatsAppFloat: true,
    enableCurrencySwitcher: false,
  },
};
