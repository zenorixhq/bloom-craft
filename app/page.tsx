"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/data/mockData";
import { Category } from "@/types/store";
import { HeroEditorial } from "@/components/storefront/HeroEditorial";
import { FeaturedHampersSection } from "@/components/storefront/FeaturedHampersSection";
import { CustomHamperBanner } from "@/components/storefront/CustomHamperBanner";
import { ShopByOccasion } from "@/components/storefront/ShopByOccasion";
import { MilestoneTickerBanner } from "@/components/storefront/MilestoneTickerBanner";
import { AboutUsSection } from "@/components/storefront/AboutUsSection";
import { BrandValueBadges } from "@/components/storefront/BrandValueBadges";
import { GiftingFAQSection } from "@/components/storefront/GiftingFAQSection";
import { CustomerReviewsWithVideos } from "@/components/storefront/CustomerReviewsWithVideos";
import { FollowTheHouseSection } from "@/components/storefront/FollowTheHouseSection";
import { useProductStore } from "@/store/useProductStore";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

export default function HomePage() {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem("bloomcraft_categories");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return categories;
  });
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const productsLoaded = useProductStore((s) => s.hasLoaded);

  useEffect(() => {
    const loadCategories = () => {
      fetch(`/api/categories?t=${Date.now()}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCategoryList(data);
            try {
              sessionStorage.setItem("bloomcraft_categories", JSON.stringify(data));
            } catch (e) {}
          }
        })
        .catch(() => {});
    };

    loadCategories();

    const handleUpdate = (e?: any) => {
      if (e?.detail && Array.isArray(e.detail) && e.detail.length > 0) {
        setCategoryList(e.detail);
      } else {
        loadCategories();
      }
    };

    window.addEventListener("bloomcraft:categories-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("focus", loadCategories);

    // Non-blocking background preload after initial page render
    if (!productsLoaded) {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => fetchProducts());
      } else {
        setTimeout(() => fetchProducts(), 800);
      }
    }

    return () => {
      window.removeEventListener("bloomcraft:categories-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("focus", loadCategories);
    };
  }, [fetchProducts, productsLoaded]);

  return (
    <div className="w-full max-w-full bg-[#FAF8F5] overflow-x-clip font-primary">
      {/* 1. Dynamic Hero Slideshow & Campaign Showcase */}
      <HeroEditorial />

      {/* 2. Shop by Category / Our Collection Grid */}
      <div id="shop-collection" className="scroll-mt-16 sm:scroll-mt-20">
        <section className="w-full max-w-full py-8 sm:py-12 lg:py-16 bg-[#FAF8F5] border-b border-[#E7E3DC] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-6 sm:space-y-8">
            {/* Header - Clean style matching diecutsmart screenshot */}
            <div className="flex items-center justify-between pb-1 sm:pb-2">
              <h2 className="font-primary text-2xl sm:text-3xl md:text-4xl font-semibold text-[#18221D] tracking-tight">
                Our Collection
              </h2>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-medium text-[#214332] hover:text-[#162f23] flex items-center gap-1.5 group transition-colors font-primary shrink-0"
              >
                <span>View All ({categoryList.length})</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* MOBILE: Horizontally Scrollable Cards (Matching diecutsmart screenshot) */}
            <div className="block md:hidden overflow-hidden w-full max-w-full">
              <div
                className="flex items-start gap-5 sm:gap-6 overflow-x-auto pb-5 pt-4 scrollbar-none snap-x snap-mandatory select-none -mx-4 px-4 sm:-mx-8 sm:px-8 overscroll-x-contain"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "contain",
                }}
              >
                {categoryList.map((cat) => (
                  <Link
                    key={cat.id || cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="w-[240px] xs:w-[250px] sm:w-[260px] flex-shrink-0 snap-start flex flex-col group cursor-pointer pt-3 relative"
                  >
                    {/* Rounded Photo Card with Floating Top-Right Circular Arrow Badge */}
                    <div className="relative w-full">
                      <div className="relative w-full aspect-[241/272] rounded-2xl overflow-hidden bg-white border border-[#E7E3DC] shadow-xs group-hover:shadow-md transition-all duration-300">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>

                      {/* Floating Circular Arrow Badge (Exact SVG geometry from diecutsmart) */}
                      <div className="absolute -top-3 right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-stone-200/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#214332] group-hover:text-white transition-all duration-300 z-10 text-[#18221D]">
                        <svg viewBox="0 0 48 48" className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none">
                          <circle cx="24" cy="24" r="22.5" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" className="group-hover:fill-[#214332] transition-colors" />
                          <path
                            d="M17 31L31 17M31 17H21M31 17V27"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Centered Category Title Below Card */}
                    <h3 className="text-center font-medium text-base text-[#214332] group-hover:text-[#18221D] transition-colors mt-3 font-primary tracking-normal">
                      {cat.name.replace(/\s*Collection/gi, "").trim()}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* Mobile Swipe Helper Indicator */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-subtext pt-2 px-1 border-t border-[#E7E3DC]/60 mt-1">
                <span>← Swipe to explore categories →</span>
                <span>{categoryList.length} Collections</span>
              </div>
            </div>

            {/* DESKTOP: Grid of the Same Large Rounded Cards with Corner Arrow Badges (>= md) */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-8 pt-4">
              {categoryList.map((cat) => (
                <Link
                  key={cat.id || cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="flex flex-col group cursor-pointer pt-3 relative"
                >
                  {/* Rounded Photo Card with Floating Top-Right Circular Arrow Badge */}
                  <div className="relative w-full">
                    <div className="relative w-full aspect-[241/272] rounded-2xl overflow-hidden bg-white border border-[#E7E3DC] shadow-xs group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Floating Circular Arrow Badge */}
                    <div className="absolute -top-3 right-2.5 w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-stone-200/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#214332] group-hover:text-white transition-all duration-300 z-10 text-[#18221D]">
                      <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none">
                        <circle cx="24" cy="24" r="22.5" fill="#ffffff" stroke="rgba(0,0,0,0.08)" strokeWidth="1" className="group-hover:fill-[#214332] transition-colors" />
                        <path
                          d="M17 31L31 17M31 17H21M31 17V27"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Centered Category Title Below Card */}
                  <h3 className="text-center font-medium text-base sm:text-lg text-[#214332] group-hover:text-[#18221D] transition-colors mt-3.5 font-primary tracking-normal">
                    {cat.name.replace(/\s*Collection/gi, "").trim()}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 3. Curated Celebration Hampers & Quick Add Shelf (Crafto Arte-Inspired Budget & Deluxe Shelf) */}
      <FeaturedHampersSection />

      {/* 4. Customise Your Hamper Banner (Crafto Arte High-Conversion WhatsApp Concierge Banner) */}
      <CustomHamperBanner />

      {/* 5. Shop by Occasion & Celebration (Crafto Arte Occasion Finder) */}
      <ShopByOccasion />

      {/* 6. Capture Every Milestone Word Rotator Ticker (Crafto Arte Interactive Milestone Section) */}
      <MilestoneTickerBanner />

      {/* 7. Brand Story & Craftsmanship Atelier (Crafto Arte: "A Small Brand with a Big Heart") */}
      <div id="about-us" className="scroll-mt-16 sm:scroll-mt-20">
        <AboutUsSection />
      </div>

      {/* 8. Five Signature Brand Badges & Guarantees */}
      <BrandValueBadges />

      {/* 9. Gifting FAQ Accordion (Crafto Arte: "Got Questions? We've Got Answers") */}
      <GiftingFAQSection />

      {/* 10. Follow The House (Instagram Community Mosaic) */}
      <FollowTheHouseSection />

      {/* 11. Customer Testimonials & Verified Unboxing Reviews */}
      <CustomerReviewsWithVideos />
    </div>
  );
}
