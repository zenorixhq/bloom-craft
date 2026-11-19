"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/data/mockData";
import { Category } from "@/types/store";
import { HeroEditorial } from "@/components/storefront/HeroEditorial";
import { AboutUsSection } from "@/components/storefront/AboutUsSection";
import { BrandValueBadges } from "@/components/storefront/BrandValueBadges";
import { CustomerReviewsWithVideos } from "@/components/storefront/CustomerReviewsWithVideos";
import { FollowTheHouseSection } from "@/components/storefront/FollowTheHouseSection";
import { useProductStore } from "@/store/useProductStore";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
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
    <div className="w-full bg-[#FAF8F5] overflow-x-hidden font-glacial">
      {/* 1. Hero Section */}
      <HeroEditorial />

      {/* 2. About Us Section */}
      <div id="about-us" className="scroll-mt-16 sm:scroll-mt-20">
        <AboutUsSection />
      </div>

      {/* 3. The Atelier Collection / Shop by Category Grid */}
      <div id="shop-collection" className="scroll-mt-16 sm:scroll-mt-20">
        <section className="w-full py-6 sm:py-8 lg:py-10 bg-[#FAF8F5] border-b border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="bg-white/85 backdrop-blur-xs border border-[#E7E3DC] rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xs space-y-4 sm:space-y-5">
            {/* Window Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E7E3DC]/60 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#214332] uppercase tracking-widest font-glacial">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                  <span>The Atelier Collection</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#18221D] mt-0.5 tracking-wide">
                  Shop by Category
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-semibold text-[#214332] hover:text-[#162f23] flex items-center gap-1 group transition-colors font-glacial"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Editorial Framed Arch Category Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {categoryList.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="group relative bg-[#FFFDF9] border border-[#E7E3DC] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-2xs hover:shadow-xl hover:border-[#214332]/60 hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between card-shine"
                >
                  <div className="w-full h-36 xs:h-40 sm:h-48 md:h-52 lg:h-56 rounded-t-[1.3rem] sm:rounded-t-[1.8rem] rounded-b-xl overflow-hidden bg-[#FAF8F5] relative flex items-center justify-center border border-stone-100 shadow-2xs group-hover:shadow-md transition-shadow duration-500">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {idx === 0 && (
                      <span className="absolute top-2 right-2 text-[8px] sm:text-[9px] font-bold bg-[#214332] text-white px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider font-glacial">
                        NEW DROP
                      </span>
                    )}
                  </div>

                  <div className="pt-2 pb-0.5 px-0.5 flex flex-col items-center text-center">
                    <h3 className="font-editorial text-sm sm:text-base md:text-[17px] font-semibold tracking-wide text-[#18221D] group-hover:text-[#214332] transition-colors leading-tight truncate max-w-full">
                      {cat.name.replace(/\s*Collection/gi, "").trim()}
                    </h3>
                    <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#DC9924] group-hover:text-[#214332] transition-colors font-glacial mt-1">
                      <span>EXPLORE</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* 4. Five Signature Brand Badges & WhatsApp Direct Contact Banner */}
      <BrandValueBadges />

      {/* 5. Follow The House (Instagram Editorial Mosaic) */}
      <FollowTheHouseSection />

      {/* 7. Customer Testimonials & Influencer Video Reels ("IN THEIR WORDS") */}
      <CustomerReviewsWithVideos />
    </div>
  );
}
