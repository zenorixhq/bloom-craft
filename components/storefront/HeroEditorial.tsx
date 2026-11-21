"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Gift, ShieldCheck } from "lucide-react";

export function HeroEditorial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
      primaryCta: { label: "Discover Hampers", href: "/products?category=hamper" },
      secondaryCta: { label: "Shop All Stationery", href: "/products" },
      image: "/images/hero-hamper-curation.jpg",
      productHighlight: {
        tag: "BESTSELLER CURATION",
        title: "The Artisanal Botanical Hamper",
        price: "₹2,199",
        href: "/products/artisanal-botanical-gift-hamper",
      },
    },
    {
      badge: "AUTHENTIC SCRIBE & WAX",
      kicker: "The timeless romance of written words",
      title: "Handcrafted Calligraphy & Vintage Monogram Seals",
      primaryCta: { label: "Shop Wax Seals", href: "/products?category=wax-seals-calligraphy" },
      secondaryCta: { label: "Explore Scribe Sets", href: "/products" },
      image: "/images/hero-calligraphy-seal.jpg",
      productHighlight: {
        tag: "ARTISANAL SET",
        title: "The Vintage Scribe Calligraphy Set",
        price: "₹2,699",
        href: "/products/vintage-scribe-calligraphy-hamper",
      },
    },
    {
      badge: "LUXURY CELEBRATION",
      kicker: "Delightful sensory unboxing experiences",
      title: "Celebration Keepsake Boxes & Gourmet Hampers",
      primaryCta: { label: "Celebration Hampers", href: "/products?category=hamper" },
      secondaryCta: { label: "Custom Keepsakes", href: "/products?category=gifting-keepsakes" },
      image: "/images/hero-celebration-box.jpg",
      productHighlight: {
        tag: "DELUXE PAMPER",
        title: "Celebration Blooms Deluxe Hamper",
        price: "₹2,999",
        href: "/products/celebration-blooms-deluxe-hamper",
      },
    },
  ];

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

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  }, []);

  // Synchronize scroll on user touch swipe or drag
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

  // Mouse drag-to-scroll handlers for desktop
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
    const walk = (x - dragStartX) * 1.5;
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

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUpOrLeave();
      }}
      className="relative w-full bg-stone-950 text-white overflow-hidden select-none border-b border-stone-800 font-glacial"
    >
      {/* Full-bleed 3 Scrollable Image Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className="flex w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth select-none cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex-shrink-0 relative snap-center flex items-center"
          >
            {/* Background Full-Width Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 ease-out"
              loading={idx === 0 ? "eager" : "lazy"}
              draggable={false}
            />

            {/* Cinematic Gradient Overlays for High-Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Overlaid Editorial Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 text-left">
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                
                {/* Eyebrow Badge */}
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#E8AE4C] bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                    <span>{slide.badge}</span>
                  </span>
                  <span className="text-xs text-white/60 font-mono font-medium hidden sm:inline-block">
                    0{idx + 1} / 0{slides.length}
                  </span>
                </div>

                {/* Handwritten Script Kicker */}
                <div>
                  <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#E8AE4C] select-none block leading-tight drop-shadow-md">
                    {slide.kicker}
                  </span>
                </div>

                {/* Display Headline */}
                <div className="space-y-2">
                  <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <div className="w-20 h-[2.5px] bg-gradient-to-r from-[#DC9924] to-transparent rounded-full mt-2" />
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-xs sm:text-sm text-stone-200">
                  <span className="inline-flex items-center gap-1.5 font-medium bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Handcrafted Precision
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    <Gift className="w-3.5 h-3.5 text-[#DC9924]" />
                    Free Handwritten Note
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Pan-India Delivery
                  </span>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <Link
                    href={slide.primaryCta.href}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#DC9924] hover:bg-[#c9891c] text-[#18221D] text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
                  >
                    <span>{slide.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/40 hover:border-white text-white text-sm font-semibold transition-all hover:bg-white/15 backdrop-blur-md shadow-sm"
                  >
                    <span>{slide.secondaryCta.label}</span>
                  </Link>
                </div>

              </div>
            </div>

            {/* Bottom-right Floating Product Quick Link */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 hidden md:block">
              <Link
                href={slide.productHighlight.href}
                className="group/tag flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 transition-all shadow-lg hover:scale-[1.02]"
              >
                <span className="w-2 h-2 rounded-full bg-[#DC9924] animate-pulse" />
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8AE4C] block">
                    {slide.productHighlight.tag}
                  </span>
                  <p className="text-xs font-medium text-white truncate max-w-[220px]">
                    {slide.productHighlight.title}
                  </p>
                </div>
                <span className="text-xs font-bold text-white bg-white/20 px-2 py-1 rounded-lg">
                  {slide.productHighlight.price}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Arrow Controls on Hero Edges */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Centered Bottom Navigation Dots & Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-md">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              currentSlide === idx
                ? "w-8 bg-[#DC9924]"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
        <span className="text-[11px] font-mono text-white/70 font-semibold pl-1">
          0{currentSlide + 1} / 0{slides.length}
        </span>
      </div>
    </section>
  );
}
