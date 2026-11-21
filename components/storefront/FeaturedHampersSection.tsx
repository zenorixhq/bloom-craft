"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/types/store";
import { useProductStore } from "@/store/useProductStore";
import { products as fallbackProducts } from "@/data/mockData";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Sparkles, Gift, ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";

export function FeaturedHampersSection() {
  const storeProducts = useProductStore((s) => s.products);
  const [activeTab, setActiveTab] = useState<"all" | "budget" | "luxury" | "scribe">("all");

  // Fallback to mock data if store products are loading
  const allProducts = useMemo(() => {
    const list = storeProducts && storeProducts.length > 0 ? storeProducts : fallbackProducts;
    return list;
  }, [storeProducts]);

  // Filter hampers and gift sets
  const hamperProducts = useMemo(() => {
    const hampers = allProducts.filter(
      (p) =>
        p.isHamper ||
        p.category === "hamper-boxes" ||
        p.category === "hamper" ||
        p.tags?.some((t) => /hamper|gift box|gift set/i.test(t)) ||
        p.title.toLowerCase().includes("hamper") ||
        p.title.toLowerCase().includes("gift set")
    );

    // If hampers list is small, also include featured gift items
    if (hampers.length < 4) {
      const additional = allProducts.filter(
        (p) => p.featured || p.category === "basket" || p.category === "trolley"
      );
      return Array.from(new Set([...hampers, ...additional])).slice(0, 8);
    }
    return hampers;
  }, [allProducts]);

  // Filter based on active tab
  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "budget":
        return hamperProducts.filter((p) => (p.salePrice || p.price) <= 2200);
      case "luxury":
        return hamperProducts.filter((p) => (p.salePrice || p.price) > 2200);
      case "scribe":
        return hamperProducts.filter((p) =>
          /scribe|calligraphy|wax/i.test(p.title + " " + (p.tags || []).join(" "))
        );
      case "all":
      default:
        return hamperProducts;
    }
  }, [hamperProducts, activeTab]);

  return (
    <section id="featured-hampers" className="w-full py-10 sm:py-14 lg:py-16 bg-[#FAF8F5] border-b border-[#E7E3DC] font-glacial">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7E3DC]/60 pb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#214332] uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
              <span>CURATED CELEBRATION HAMPERS</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-[#18221D] mt-1 tracking-tight">
              Gift Hampers &amp; Keepsake Boxes
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5750] font-light max-w-xl mt-1">
              Thoughtfully curated for birthdays, anniversaries, and gratitude. Hand-assembled with bespoke botanical wax seals.
            </p>
          </div>

          <Link
            href="/products?category=hamper-boxes"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#214332] hover:text-[#162f23] group transition-colors flex-shrink-0"
          >
            <span>View All Hampers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills / Tabs (Inspired by Crafto Arte Quick Filter) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#214332] text-white shadow-sm"
                : "bg-white/80 text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            All Hampers &amp; Sets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("budget")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "budget"
                ? "bg-[#214332] text-white shadow-sm"
                : "bg-white/80 text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            Under ₹2,200
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("luxury")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "luxury"
                ? "bg-[#214332] text-white shadow-sm"
                : "bg-white/80 text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            Deluxe Keepsakes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("scribe")}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "scribe"
                ? "bg-[#214332] text-white shadow-sm"
                : "bg-white/80 text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            Calligraphy &amp; Wax Kits
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Trust & Unboxing Delight Banner (Inspired by Crafto Arte) */}
        <div className="bg-[#FAF4EB] border border-[#E4DCCE] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#214332] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Gift className="w-5 h-5 text-[#DC9924]" />
            </div>
            <div>
              <h4 className="font-editorial text-base sm:text-lg font-medium text-[#18221D]">
                Every Hamper Arrives Gift-Ready with Wax Seal &amp; Custom Note
              </h4>
              <p className="text-xs text-[#526058] mt-0.5">
                Complimentary handwritten calligraphy card, pinewood/rigid keepsake box &amp; botanical ribbon included.
              </p>
            </div>
          </div>
          <Link
            href="/products?category=hamper"
            className="px-5 py-2.5 rounded-full bg-[#214332] hover:bg-[#162f23] text-white text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shadow-xs"
          >
            Explore Hamper Collection
          </Link>
        </div>

      </div>
    </section>
  );
}
