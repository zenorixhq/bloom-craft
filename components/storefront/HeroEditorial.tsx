"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { storeConfig } from "@/config/store.config";
import { useSiteImages } from "@/hooks/useSiteImages";

export function HeroEditorial() {
  const { images } = useSiteImages();
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    // Reveal animations gracefully
    const timer = setTimeout(() => setIntroReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const heroAnim = (className: string) => (introReady ? className : "opacity-0");

  const scrollToCollection = () => {
    const target = document.getElementById("shop-collection") || document.getElementById("about-us");
    if (target) {
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/products";
    }
  };

  return (
    <section className="relative w-full bg-[#FAF8F5] text-[#18221D] overflow-hidden select-none border-b border-[#E7E3DC] lg:min-h-[92svh] flex flex-col justify-center">
      
      {/* Background Subtle Gradient & Organic Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-emerald-950/[0.04] via-stone-100/50 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-700/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Brand Eyebrow */}
            <div className={`flex items-center gap-2.5 ${heroAnim("animate-hero-1")}`}>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#214332] bg-[#EEF3F0] px-3 py-1 rounded-full border border-emerald-900/10">
                <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                <span>{storeConfig.meta.name} • ARTISANAL ATELIER</span>
              </span>
            </div>

            {/* Handwritten Script Kicker */}
            <div className={heroAnim("animate-hero-2")}>
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#DC9924] select-none block leading-none">
                Thoughtfully crafted for moments that matter
              </span>
            </div>

            {/* Display Headline */}
            <div className={`space-y-2 ${heroAnim("animate-hero-3")}`}>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#18221D] leading-[1.08]">
                Bespoke Stationery &amp; <br />
                <span className="italic font-light text-[#214332]">Curated Gift Hampers</span>
              </h1>
              <div className="w-20 h-[2.5px] bg-gradient-to-r from-[#DC9924] to-transparent rounded-full mt-3" />
            </div>

            {/* Brand Manifesto */}
            <p className={`text-base sm:text-lg text-[#3D4942] font-light leading-relaxed max-w-xl font-glacial ${heroAnim("animate-hero-5")}`}>
              From hand-bound leather journals and vintage wax seals to artfully curated celebration hampers, every Bloom Craft creation is made to inspire creativity, warmth, and lifelong keepsakes.
            </p>

            {/* Quality Commitment Badges */}
            <div className={`flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-[#4A5750] font-glacial ${heroAnim("animate-hero-6")}`}>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Handcrafted Precision
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-medium">Acid-Free Archival Paper</span>
              <span className="text-stone-300">•</span>
              <span className="font-medium">Custom Wax Seal Crests</span>
              <span className="text-stone-300">•</span>
              <span className="font-medium">Pan-India Gift Shipping</span>
            </div>

            {/* Interactive Action Buttons */}
            <div className={`flex flex-wrap items-center gap-3.5 pt-3 font-glacial ${heroAnim("animate-hero-7")}`}>
              <button
                type="button"
                onClick={scrollToCollection}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#214332] hover:bg-[#162f23] text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
              >
                <span>Discover Hampers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-300 hover:border-[#214332] text-[#18221D] hover:text-[#214332] text-sm font-semibold transition-all hover:bg-white/60 shadow-2xs"
              >
                <span>Explore All Stationery</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Visual Showcase Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#E7E3DC] group">
              <img
                src={images.heroDesktop || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1000"}
                alt="Bloom Craft Artisanal Gift Hamper and Stationery Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#214332]">
                    BESTSELLER CURATION
                  </span>
                  <h4 className="font-editorial text-base font-semibold text-stone-900 leading-tight">
                    The Artisanal Botanical Hamper
                  </h4>
                  <p className="text-xs text-stone-600 font-glacial mt-0.5">
                    Linen Journal • Brass Pen • Fig Candle • Wax Seal
                  </p>
                </div>
                <Link
                  href="/products/artisanal-botanical-gift-hamper"
                  className="px-3.5 py-2 rounded-xl bg-[#214332] text-white text-xs font-semibold hover:bg-[#162f23] transition-colors whitespace-nowrap shadow-xs"
                >
                  View Set
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
