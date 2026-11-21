"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  // Mouse drag-to-scroll state for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

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

  // Programmatic smooth scroll to slide
  const scrollToSlide = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isProgrammaticScroll.current = true;
    setCurrentSlide(index);

    const slideWidth = container.clientWidth;
    container.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });

    // Reset programmatic flag after smooth scroll finishes
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  }, []);

  // Synchronize scroll on user touch swipe or scroll
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth } = container;
    if (clientWidth === 0) return;

    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex >= 0 && newIndex < slides.length && newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  }, [currentSlide, slides.length]);

  // Auto-play timer (pauses when user hovers or interacts)
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        scrollToSlide(next);
        return next;
      });
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length, scrollToSlide]);

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    scrollToSlide(prev);
  };

  // Mouse Drag-to-Scroll Handlers (for desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    setDragStartX(e.pageX - container.offsetLeft);
    setDragStartScrollLeft(container.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartX) * 1.4;
    container.scrollLeft = dragStartScrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, clientWidth } = container;
      const targetIndex = Math.round(scrollLeft / clientWidth);
      const clampedIndex = Math.max(0, Math.min(slides.length - 1, targetIndex));
      scrollToSlide(clampedIndex);
    }
    setIsPaused(false);
  };

  const current = slides[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUpOrLeave();
      }}
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
                    type="button"
                    onClick={() => scrollToSlide(idx)}
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

              <span className="text-xs text-stone-400 font-medium pl-1">
                Swipe or scroll images →
              </span>
            </div>

          </div>

          {/* Right Column: 3 Scrollable Image Showcase Gallery */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              
              {/* Scrollable / Swipeable Track Container */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-x-auto snap-x snap-mandatory flex shadow-xl border border-[#E7E3DC] bg-stone-100 select-none cursor-grab active:cursor-grabbing scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="min-w-full w-full h-full flex-shrink-0 relative snap-center overflow-hidden"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading={idx === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                    {/* Slide Counter on Image */}
                    <div className="absolute top-4 right-4 z-10 pointer-events-none">
                      <span className="bg-black/50 backdrop-blur-md text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                        0{idx + 1} / 0{slides.length}
                      </span>
                    </div>

                    {/* Floating Product Highlight Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg flex items-center justify-between gap-3 z-10 pointer-events-auto">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#214332] block">
                          {slide.productHighlight.tag}
                        </span>
                        <h4 className="font-editorial text-sm sm:text-base font-semibold text-stone-900 leading-tight truncate">
                          {slide.productHighlight.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-stone-600 truncate mt-0.5">
                          {slide.productHighlight.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs sm:text-sm font-bold text-[#214332]">
                            {slide.productHighlight.price}
                          </span>
                          <span className="text-[11px] text-stone-400 line-through">
                            {slide.productHighlight.originalPrice}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={slide.productHighlight.href}
                        className="px-3.5 py-2 rounded-xl bg-[#214332] text-white text-xs font-semibold hover:bg-[#162f23] transition-colors whitespace-nowrap shadow-xs flex-shrink-0"
                      >
                        View Set
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="bg-[#214332]/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20 shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#DC9924] text-[#DC9924]" />
                    <span>CRAFTED IN INDIA</span>
                  </span>
                </div>

                {/* Direct On-Image Left / Right Overlay Arrows */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-stone-800 hover:text-[#214332] shadow-md hover:shadow-lg flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 backdrop-blur-xs cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-stone-800 hover:text-[#214332] shadow-md hover:shadow-lg flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 backdrop-blur-xs cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* 3 Interactive Thumbnail Preview Cards Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Scroll to image ${idx + 1}: ${s.productHighlight.title}`}
                    className={`group/thumb flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      currentSlide === idx
                        ? "bg-white border-[#DC9924] shadow-sm ring-2 ring-[#DC9924]/20 scale-[1.02]"
                        : "bg-white/70 hover:bg-white border-stone-200/80 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={s.image}
                      alt={s.productHighlight.title}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg object-cover flex-shrink-0 border border-stone-200/60"
                    />
                    <div className="min-w-0 pr-1 hidden sm:block">
                      <span
                        className={`text-[9px] uppercase font-bold tracking-wider block truncate ${
                          currentSlide === idx ? "text-[#DC9924]" : "text-stone-400"
                        }`}
                      >
                        0{idx + 1} • {s.badge.split(" ")[0]}
                      </span>
                      <p className="text-xs font-semibold text-stone-800 truncate leading-tight mt-0.5">
                        {s.productHighlight.title.replace("The ", "")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
