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
    <div className="w-full bg-[#FAF8F5] overflow-x-hidden font-primary">
      {/* 1. Dynamic Hero Slideshow & Campaign Showcase */}
      <HeroEditorial />

      {/* 2. Shop by Category / Our Collection Grid */}
      <div id="shop-collection" className="scroll-mt-16 sm:scroll-mt-20">
        <section className="w-full py-8 sm:py-12 lg:py-16 bg-[#FAF8F5] border-b border-[#E7E3DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-6 sm:space-y-8">
            {/* Header - Clean style matching diecutsmart screenshot */}
            <div className="flex items-center justify-between pb-1 sm:pb-2">
              <h2 className="font-logo text-2xl sm:text-3xl md:text-4xl font-bold text-[#18221D] tracking-tight">
                Our Collection
              </h2>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-semibold text-[#214332] hover:text-[#162f23] flex items-center gap-1.5 group transition-colors font-primary shrink-0"
              >
                <span>View All ({categoryList.length})</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* MOBILE: Horizontally Scrollable Cards (Matching uploaded diecutsmart screenshot) */}
            <div className="block md:hidden">
              <div
                className="flex items-start gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory select-none -mx-4 px-4 sm:-mx-8 sm:px-8"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {categoryList.map((cat) => (
                  <Link
                    key={cat.id || cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="w-[68vw] xs:w-[64vw] max-w-[275px] flex-shrink-0 snap-start flex flex-col group cursor-pointer"
                  >
                    {/* Rounded Photo Card with Top-Right Arrow Badge */}
                    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-white border border-[#E7E3DC] shadow-sm group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Floating Circular Up-Right Arrow Button (Matching diecutsmart badge) */}
                      <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#214332] group-hover:bg-[#214332] transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-[#214332] group-hover:text-white transition-colors" />
                      </div>

                      {cat.slug === "hamper-boxes" && (
                        <span className="absolute top-3.5 left-3.5 text-[8px] font-bold bg-[#214332] text-white px-2 py-0.5 rounded-full uppercase tracking-tight shadow-xs font-subtext">
                          HOT
                        </span>
                      )}
                    </div>

                    {/* Centered Category Title Below Card */}
                    <h3 className="text-center font-bold text-sm xs:text-base text-[#18221D] group-hover:text-[#214332] transition-colors mt-3 font-primary tracking-wide">
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

            {/* DESKTOP: Grid of the Same Large Rounded Cards with Arrow Badges (>= md) */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {categoryList.map((cat) => (
                <Link
                  key={cat.id || cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Rounded Photo Card with Top-Right Arrow Badge */}
                  <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-white border border-[#E7E3DC] shadow-sm group-hover:shadow-xl group-hover:border-[#214332]/60 hover:-translate-y-1 transition-all duration-500 ease-out">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Floating Circular Up-Right Arrow Button */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#214332] group-hover:bg-[#214332] transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-[#214332] group-hover:text-white transition-colors" />
                    </div>

                    {cat.slug === "hamper-boxes" && (
                      <span className="absolute top-4 left-4 text-[9px] font-bold bg-[#214332] text-white px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider font-subtext">
                        NEW DROP
                      </span>
                    )}
                  </div>

                  {/* Centered Category Title Below Card */}
                  <h3 className="text-center font-bold text-base sm:text-lg text-[#18221D] group-hover:text-[#214332] transition-colors mt-3.5 font-primary tracking-wide">
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
