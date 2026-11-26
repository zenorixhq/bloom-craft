"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, Search, Heart, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { storeConfig } from "@/config/store.config";

export function MobileBottomDock() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const wishlist = useCartStore((s) => s.wishlist);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not render dock in admin portal or full checkout flow
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/checkout")) {
    return null;
  }

  const isHomeActive = pathname === "/" || pathname === "";
  const isWishlistActive =
    pathname?.includes("wishlist") ||
    (pathname === "/account" && searchParams?.get("tab") === "wishlist");

  const phone = storeConfig.brand.contact.whatsappNumber;
  const waMessage = encodeURIComponent(
    "Hi Bloom Craft! 🌿 I would love some assistance with custom gift hampers and bespoke stationery."
  );
  const waUrl = `https://wa.me/${phone}?text=${waMessage}`;

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch (e) {}
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    triggerHaptic();
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchClick = () => {
    triggerHaptic();
    window.dispatchEvent(new CustomEvent("bloomcraft:open-search"));
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-3.5 right-3.5 z-40 max-w-md mx-auto flex items-end justify-between gap-2.5 pointer-events-none md:hidden select-none font-primary"
    >
      {/* 1. Frosted Glass Navigation Pill (Apple VisionOS / Liquid Glass Material) */}
      <div className="flex-1 h-[62px] glass-dock rounded-full px-2.5 py-1.5 flex items-center justify-around pointer-events-auto transition-transform duration-200">
        {/* Item: Home */}
        <Link
          href="/"
          onClick={handleHomeClick}
          aria-label="Home"
          className="flex flex-col items-center justify-center flex-1 py-1 active:scale-90 transition-transform duration-150 group"
        >
          <div
            className={`w-11 h-7 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isHomeActive
                ? "bg-[#FFEBF0] text-[#EE2761]"
                : "text-stone-500 group-hover:text-stone-800"
            }`}
          >
            <Home className="w-[18px] h-[18px] stroke-[1.9]" />
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
              isHomeActive
                ? "font-semibold text-[#EE2761]"
                : "font-medium text-stone-500 group-hover:text-stone-800"
            }`}
          >
            Home
          </span>
        </Link>

        {/* Item: Search */}
        <button
          type="button"
          onClick={handleSearchClick}
          aria-label="Search"
          className="flex flex-col items-center justify-center flex-1 py-1 active:scale-90 transition-transform duration-150 group cursor-pointer"
        >
          <div className="w-11 h-7 rounded-xl flex items-center justify-center text-stone-500 group-hover:text-stone-800 relative transition-all duration-200">
            <div className="relative">
              <Search className="w-[18px] h-[18px] stroke-[1.9]" />
              <Sparkles className="w-2.5 h-2.5 text-stone-400 absolute -top-1 -right-1" />
            </div>
          </div>
          <span className="text-[10px] font-medium tracking-tight text-stone-500 group-hover:text-stone-800 mt-0.5 transition-colors">
            Search
          </span>
        </button>

        {/* Item: Wishlist */}
        <Link
          href="/account?tab=wishlist"
          onClick={triggerHaptic}
          aria-label="Wishlist"
          className="flex flex-col items-center justify-center flex-1 py-1 active:scale-90 transition-transform duration-150 group"
        >
          <div
            className={`w-11 h-7 rounded-xl flex items-center justify-center relative transition-all duration-200 ${
              isWishlistActive
                ? "bg-[#FFEBF0] text-[#EE2761]"
                : "text-stone-500 group-hover:text-stone-800"
            }`}
          >
            <Heart
              className={`w-[18px] h-[18px] ${
                isWishlistActive ? "stroke-[2] fill-current" : "stroke-[1.9]"
              }`}
            />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-0.5 bg-[#EE2761] text-white text-[9px] font-bold min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
              isWishlistActive
                ? "font-semibold text-[#EE2761]"
                : "font-medium text-stone-500 group-hover:text-stone-800"
            }`}
          >
            Wishlist
          </span>
        </Link>
      </div>

      {/* 2. Action Stack: Circular WhatsApp FAB directly above Black Squircle Atelier CTA */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0 pointer-events-auto">
        {/* Floating WhatsApp Action Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerHaptic}
          aria-label="Chat with Bloom Craft Concierge on WhatsApp"
          className="w-11 h-11 rounded-full bg-[#25D366] text-white shadow-[0_6px_18px_rgba(37,211,102,0.45)] flex items-center justify-center hover:scale-105 active:scale-90 transition-all duration-150 relative group"
        >
          {/* Crisp Official WhatsApp Emblem SVG */}
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          {/* Subtle live beacon dot */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-300 border-2 border-white rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-300 border-2 border-white rounded-full" />
        </a>

        {/* Black Squircle Luxury Atelier / Custom Hamper Button */}
        <Link
          href="/custom-hamper"
          onClick={triggerHaptic}
          aria-label="Build Custom Hamper - Bespoke Atelier"
          className="w-[62px] h-[62px] rounded-2xl bg-[#121815] text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.38)] flex items-center justify-center hover:scale-105 active:scale-90 transition-all duration-150 border border-white/10 group cursor-pointer"
        >
          {/* Precision Rosette Medal Emblem with Star & Ribbon Tails */}
          <svg
            className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Medallion Rosette */}
            <circle cx="12" cy="8" r="5.5" />
            {/* 5-Point Center Star */}
            <polygon
              points="12,4.8 13.3,7.5 16.2,7.9 14.1,9.9 14.6,12.8 12,11.4 9.4,12.8 9.9,9.9 7.8,7.9 10.7,7.5"
              fill="currentColor"
              stroke="none"
            />
            {/* Medallion Ribbon Tails with inverted-V notches */}
            <polyline points="8.2 13.5 6.5 21.5 12 18.5 17.5 21.5 15.8 13.5" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
