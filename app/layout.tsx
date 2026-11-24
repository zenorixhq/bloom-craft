import type { Metadata } from "next";
import "./globals.css";
import { storeConfig } from "@/config/store.config";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { QuickViewModal } from "@/components/storefront/QuickViewModal";
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat";
import { SmoothScrollProvider } from "@/components/storefront/SmoothScrollProvider";
import { WebsiteLoadingAnimation } from "@/components/storefront/WebsiteLoadingAnimation";

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.meta.url || "https://www.bloomcraft.co.in"),
  title: {
    default: `${storeConfig.meta.name} | ${storeConfig.meta.tagline}`,
    template: `%s | ${storeConfig.meta.name}`,
  },
  description: storeConfig.meta.description,
  icons: {
    icon: [
      { url: "/bloom-craft-logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/bloom-craft-logo.png",
    apple: "/bloom-craft-logo.png",
  },
  openGraph: {
    title: storeConfig.meta.name,
    description: storeConfig.meta.description,
    url: storeConfig.meta.url,
    siteName: storeConfig.meta.name,
    images: [
      {
        url: "/bloom-craft-logo.png",
        width: 602,
        height: 400,
        alt: "Bloom Craft",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: storeConfig.meta.name,
    description: storeConfig.meta.description,
    images: ["/bloom-craft-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = storeConfig.brand;

  const dynamicThemeStyles = {
    "--primary": theme.primary,
    "--primary-hover": theme.primaryHover,
    "--primary-foreground": theme.primaryForeground,
    "--accent": theme.accent,
    "--accent-foreground": theme.accentForeground,
    "--radius": theme.borderRadius,
  } as React.CSSProperties;

  return (
    <html lang="en" className="scroll-smooth" style={dynamicThemeStyles} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-primary bg-background text-foreground" suppressHydrationWarning>
        <SmoothScrollProvider>
          <WebsiteLoadingAnimation />
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Slide-overs & Modals */}
          <CartDrawer />
          <QuickViewModal />
          <WhatsAppFloat />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
