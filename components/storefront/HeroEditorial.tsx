"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Gift, Star, ShieldCheck } from "lucide-react";
import { storeConfig } from "@/config/store.config";
import { useSiteImages } from "@/hooks/useSiteImages";

export function HeroEditorial() {
  const { images } = useSiteImages();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      badge: "SIGNATURE CURATION",
      kicker: "Thoughtfully crafted for moments that matter",
      title: "Bespoke Stationery & Curated Gift Hampers",
      description:
        "From hand-bound linen journals and vintage brass wax seals to artfully curated celebration hampers, every Bloom Craft creation is crafted to inspire creativity, warmth, and lifelong keepsakes.",
      primaryCta: { label: "Discover Hampers", href: "/products?category=hamper" },
      secondaryCta: { label: "Shop All Stationery", href: "/products" },
      image: "/images/hero-hamper-curation.jpg",
      productHighlight: {
        tag: "BESTSELLER CURATION",
        title: "The Artisanal Botanical Hamper",
        subtitle: "Linen Journal • Brass Pen • Fig Candle • Wax Seal",
        price: "₹2,199",
        originalPrice: "₹2,499",
        href: "/products/artisanal-botanical-gift-hamper",
      },
    },
    {
      badge: "AUTHENTIC SCRIBE & WAX",
      kicker: "The timeless romance of written words",
      title: "Handcrafted Calligraphy & Vintage Monogram Seals",
      description:
        "Solid brass monogram wax stamps, shimmering pearlescent wax beads, and hand-turned walnut dip pens engineered for the modern artisan and poetic soul.",
      primaryCta: { label: "Shop Wax Seals", href: "/products?category=wax-seals-calligraphy" },
      secondaryCta: { label: "Explore Scribe Sets", href: "/products" },
      image: "/images/hero-calligraphy-seal.jpg",
      productHighlight: {
        tag: "ARTISANAL SET",
        title: "The Vintage Scribe Calligraphy Set",
        subtitle: "Walnut Dip Pen • 5 Steel Nibs • Archival Ink • Brass Stamp",
        price: "₹2,699",
        originalPrice: "₹2,999",
        href: "/products/vintage-scribe-calligraphy-hamper",
      },
    },
    {
      badge: "LUXURY CELEBRATION",
      kicker: "Delightful sensory unboxing experiences",
      title: "Celebration Keepsake Boxes & Gourmet Hampers",
      description:
        "Gilded foil-embossed hardcover journals, pure organic Kashmir rose herbal tea, raw wildflower honey with a brass dipper, and hand-poured botanical soy candles in magnetic keepsake boxes.",
      primaryCta: { label: "Celebration Hampers", href: "/products?category=hamper" },
      secondaryCta: { label: "Custom Keepsakes", href: "/products?category=gifting-keepsakes" },
      image: "/images/hero-celebration-box.jpg",
      productHighlight: {
        tag: "DELUXE PAMPER",
        title: "Celebration Blooms Deluxe Hamper",
        subtitle: "Hardcover Journal • Rose Tea • Raw Honey • Soy Candle",
        price: "₹2,999",
        originalPrice: "₹3,499",
        href: "/products/celebration-blooms-deluxe-hamper",
      },
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIntroReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#FAF8F5] text-[#18221D] overflow-hidden select-none border-b border-[#E7E3DC] min-h-[82svh] lg:min-h-[88svh] flex flex-col justify-center font-glacial"
    >
      {/* Background Subtle Gradient & Organic Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-emerald-950/[0.04] via-stone-100/50 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-700/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Dynamic CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Slide Eyebrow Badge */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#214332] bg-[#EEF3F0] px-3.5 py-1.5 rounded-full border border-emerald-900/10 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                <span>{current.badge}</span>
              </span>
              <span className="text-xs text-stone-400 font-medium hidden sm:inline-block">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>

            {/* Handwritten Script Kicker */}
            <div className="transition-all duration-500 transform">
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#DC9924] select-none block leading-tight">
                {current.kicker}
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#18221D] leading-[1.12]">
                {current.title}
              </h1>
              <div className="w-20 h-[2.5px] bg-gradient-to-r from-[#DC9924] to-transparent rounded-full mt-2" />
            </div>

            {/* Brand Manifesto Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-[#3D4942] font-light leading-relaxed max-w-xl">
              {current.description}
            </p>

            {/* Quality Commitment Trust Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 text-xs sm:text-sm text-[#4A5750]">
              <span className="inline-flex items-center gap-1.5 font-medium bg-white/80 px-2.5 py-1 rounded-full border border-stone-200/60 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Handcrafted Precision
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium bg-white/80 px-2.5 py-1 rounded-full border border-stone-200/60 shadow-2xs">
                <Gift className="w-3.5 h-3.5 text-[#DC9924]" />
                Free Handwritten Note
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium bg-white/80 px-2.5 py-1 rounded-full border border-stone-200/60 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Pan-India Delivery
              </span>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={current.primaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#214332] hover:bg-[#162f23] text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
              >
                <span>{current.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={current.secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-300 hover:border-[#214332] text-[#18221D] hover:text-[#214332] text-sm font-semibold transition-all hover:bg-white/80 shadow-2xs"
              >
                <span>{current.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Carousel Navigation Dots & Controls */}
            <div className="flex items-center gap-4 pt-3">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      currentSlide === idx
                        ? "w-8 bg-[#214332]"
                        : "w-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-8 h-8 rounded-full border border-stone-300 hover:border-[#214332] hover:bg-white text-stone-700 hover:text-[#214332] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-8 h-8 rounded-full border border-stone-300 hover:border-[#214332] hover:bg-white text-stone-700 hover:text-[#214332] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#E7E3DC] group bg-stone-100">
              <img
                key={currentSlide}
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out animate-fadeIn"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#214332]/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20 shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#DC9924] text-[#DC9924]" />
                  <span>CRAFTED IN INDIA</span>
                </span>
              </div>

              {/* Floating Product Highlight Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#214332] block">
                    {current.productHighlight.tag}
                  </span>
                  <h4 className="font-editorial text-sm sm:text-base font-semibold text-stone-900 leading-tight truncate">
                    {current.productHighlight.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-600 truncate mt-0.5">
                    {current.productHighlight.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-[#214332]">
                      {current.productHighlight.price}
                    </span>
                    <span className="text-[11px] text-stone-400 line-through">
                      {current.productHighlight.originalPrice}
                    </span>
                  </div>
                </div>
                <Link
                  href={current.productHighlight.href}
                  className="px-3.5 py-2 rounded-xl bg-[#214332] text-white text-xs font-semibold hover:bg-[#162f23] transition-colors whitespace-nowrap shadow-xs flex-shrink-0"
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
