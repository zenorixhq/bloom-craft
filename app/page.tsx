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
import { ArrowRight, Sparkles } from "lucide-react";

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

      {/* 2. Shop by Category Grid */}
      <div id="shop-collection" className="scroll-mt-16 sm:scroll-mt-20">
        <section className="w-full py-3.5 sm:py-10 lg:py-14 bg-[#FAF8F5] border-b border-[#E7E3DC]">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-8 lg:px-12 w-full space-y-3 sm:space-y-8">
            {/* Header - Direct & Open, No Outer Box */}
            <div className="flex items-center justify-between gap-3 border-b border-[#E7E3DC]/80 pb-2.5 sm:pb-4">
              <div>
                <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#214332] font-subtext mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                  <span>CURATED DEPARTMENTS</span>
                </div>
                <h2 className="font-logo text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold text-[#18221D] tracking-tight">
                  Shop by Category
                </h2>
                <p className="hidden sm:block font-editorial italic text-sm sm:text-base text-stone-600 mt-1">
                  Explore our curated hampers, artisanal stationery &amp; keepsake gifts
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-bold text-[#214332] hover:text-[#162f23] flex items-center gap-1.5 group transition-colors font-primary shrink-0 self-center sm:self-end pb-0.5 sm:pb-1"
              >
                <span>View All Collections ({categoryList.length})</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* MOBILE: 6 Categories Grid (3 cols x 2 rows) - Fits cleanly in the Home Main Window (< md) */}
            <div className="block md:hidden">
              <div className="grid grid-cols-3 gap-2 xs:gap-3 py-1 select-none">
                {(showAllCategories ? categoryList : categoryList.slice(0, 6)).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="relative w-16 h-16 xs:w-18 xs:h-18 rounded-2xl overflow-hidden bg-white border border-[#E7E3DC] group-hover:border-[#214332] shadow-2xs group-hover:shadow-md transition-all duration-300 p-1">
                      <div className="w-full h-full rounded-[0.85rem] overflow-hidden bg-stone-100">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                          loading="eager"
                        />
                      </div>
                      {cat.slug === "hamper-boxes" && (
                        <span className="absolute -top-1 -right-1 text-[7px] font-bold bg-[#214332] text-white px-1.5 py-0.5 rounded-full uppercase tracking-tight shadow-xs font-subtext">
                          HOT
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] xs:text-xs font-bold text-[#18221D] group-hover:text-[#214332] transition-colors leading-tight line-clamp-1 mt-1 font-primary">
                      {cat.name.replace(/\s*Collection/gi, "").trim()}
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-[#DC9924] font-subtext">
                      Shop →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Mobile Button for View All */}
              <div className="pt-2 flex justify-center w-full">
                {!showAllCategories ? (
                  <button
                    type="button"
                    onClick={() => setShowAllCategories(true)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-5 rounded-full bg-white border border-[#214332]/40 hover:bg-[#214332] hover:text-white text-[#214332] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-2xs active:scale-95 font-primary cursor-pointer"
                  >
                    <span>View All Categories ({categoryList.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2.5 w-full justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllCategories(false)}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-4 rounded-full bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold uppercase tracking-wider transition-all shadow-2xs font-primary cursor-pointer"
                    >
                      <span>Show Less</span>
                    </button>
                    <Link
                      href="/products"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-[#214332] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#162f23] transition-all shadow-2xs font-primary text-center"
                    >
                      <span>Shop All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP: Larger Editorial Framed Arch Category Cards (>= md) */}
            <div className="hidden md:block">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
                {(showAllCategories ? categoryList : categoryList.slice(0, 8)).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    className="group relative bg-white border border-[#E7E3DC] rounded-3xl p-3.5 sm:p-4 shadow-xs hover:shadow-xl hover:border-[#214332]/60 hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between card-shine font-primary"
                  >
                    <div className="w-full h-52 sm:h-56 md:h-60 lg:h-64 rounded-t-[2rem] rounded-b-xl overflow-hidden bg-[#FAF8F5] relative flex items-center justify-center border border-stone-100 shadow-2xs group-hover:shadow-md transition-shadow duration-500">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {cat.slug === "hamper-boxes" && (
                        <span className="absolute top-3 right-3 text-[9px] font-bold bg-[#214332] text-white px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider font-subtext">
                          NEW DROP
                        </span>
                      )}
                    </div>

                    <div className="pt-3.5 pb-1 px-1 flex flex-col items-center text-center">
                      <h3 className="font-logo text-base sm:text-lg font-bold tracking-wide text-[#18221D] group-hover:text-[#214332] transition-colors leading-tight line-clamp-1 max-w-full">
                        {cat.name.replace(/\s*Collection/gi, "").trim()}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#DC9924] group-hover:text-[#214332] transition-colors font-subtext mt-1.5">
                        <span>EXPLORE COLLECTION</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Desktop View All Toggle Button */}
              {categoryList.length > 8 && (
                <div className="pt-6 flex justify-center">
                  {!showAllCategories ? (
                    <button
                      type="button"
                      onClick={() => setShowAllCategories(true)}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-8 rounded-full bg-white border border-[#214332]/40 hover:bg-[#214332] hover:text-white text-[#214332] text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md font-primary cursor-pointer"
                    >
                      <span>View All Categories ({categoryList.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setShowAllCategories(false)}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-6 rounded-full bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-bold uppercase tracking-wider transition-all shadow-xs font-primary cursor-pointer"
                      >
                        <span>Show Less</span>
                      </button>
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-8 rounded-full bg-[#214332] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#162f23] transition-all shadow-xs font-primary"
                      >
                        <span>Shop All Products</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
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
