"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
      kicker: "Sale!",
      hasDiscountBadge: true,
      discountNumber: "25",
      discountUnit: "%",
      discountSub: "off",
      title: "Handcrafted Artisanal Hampers",
      subtitle: "Use a special discount to indulge yourself! You deserve it!",
      primaryCta: { label: "Shop Hampers", href: "/products?category=hamper-boxes" },
      secondaryCta: { label: "Build Custom Hamper", href: "/custom-hamper" },
      image: "/images/craft-series-4219650.jpg",
      tag: "CURATED HAMPERS",
    },
    {
      kicker: "Handmade!",
      hasDiscountBadge: true,
      discountNumber: "20",
      discountUnit: "%",
      discountSub: "off",
      title: "Korean Stationery & Pastel Journals",
      subtitle: "Aesthetic pastel mildliners, archival notebooks & deco tapes for creative minds.",
      primaryCta: { label: "Shop Stationery", href: "/products?category=korean-stationery" },
      secondaryCta: { label: "Browse Collection", href: "/products" },
      image: "/images/craft-series-4219653.jpg",
      tag: "KOREAN CRAFT",
    },
    {
      kicker: "Bespoke!",
      hasDiscountBadge: false,
      title: "Build Your Dream Gift Hamper",
      subtitle: "Mix and match plushies, jewellery, perfume, stationery & frames into a luxury gift box.",
      primaryCta: { label: "Start Customizing", href: "/custom-hamper" },
      secondaryCta: { label: "Browse All Gifts", href: "/products" },
      image: "/images/craft-series-4219658.jpg",
      tag: "CUSTOM ATELIER",
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

  // Synchronize scroll position on user touch swipe or drag
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
      className="relative w-full h-[64vh] min-h-[420px] max-h-[520px] sm:h-[72vh] sm:min-h-[500px] md:h-[84vh] md:min-h-[580px] md:max-h-[820px] bg-stone-950 text-white overflow-hidden select-none border-b border-stone-800"
    >
      {/* 3 Full-Window Scrollable & Swipeable Slides */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth select-none cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full w-full h-full flex-shrink-0 relative snap-center flex items-center justify-center"
          >
            {/* Background Craft Image (Takes Whole Window Size) */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-1000 ease-out"
              loading={idx === 0 ? "eager" : "lazy"}
              draggable={false}
            />

            {/* Subtle Lighting Overlays for Text Contrast while preserving real craft photography */}
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Center-Aligned Editorial Content Matching Reference */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-12 text-center flex flex-col items-center justify-center space-y-2.5 sm:space-y-4 md:space-y-6">
              
              {/* Cursive / Script Callout ("Sale!" style) */}
              <div className="animate-fadeIn">
                <span className="font-script text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white font-normal drop-shadow-md select-none tracking-wide">
                  {slide.kicker}
                </span>
              </div>

              {/* Giant Display Headline */}
              {slide.hasDiscountBadge ? (
                <div className="flex items-start justify-center drop-shadow-xl text-white select-none">
                  <span className="font-extrabold text-6xl xs:text-7xl sm:text-8xl md:text-9xl tracking-tight leading-none">
                    {slide.discountNumber}
                  </span>
                  <div className="flex flex-col items-start ml-2 sm:ml-3 pt-1 sm:pt-2 text-left leading-none">
                    <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black">
                      {slide.discountUnit}
                    </span>
                    <span className="text-base xs:text-xl sm:text-2xl md:text-3xl font-bold lowercase tracking-wider mt-0.5">
                      {slide.discountSub}
                    </span>
                  </div>
                </div>
              ) : (
                <h1 className="font-logo text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-xl max-w-3xl">
                  {slide.title}
                </h1>
              )}

              {/* Subtitle / Indulgence Prompt */}
              <p className="font-editorial italic text-sm sm:text-lg md:text-xl text-white/95 max-w-xl mx-auto leading-relaxed drop-shadow-md line-clamp-2 sm:line-clamp-none">
                {slide.subtitle}
              </p>

              {/* Dual Action Buttons matching reference */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 pt-1 sm:pt-2">
                <Link
                  href={slide.primaryCta.href}
                  className="px-5 py-2.5 sm:px-8 sm:py-3 rounded-full sm:rounded-md bg-white hover:bg-stone-100 text-stone-900 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-primary"
                >
                  {slide.primaryCta.label}
                </Link>

                <Link
                  href={slide.secondaryCta.href}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-white hover:text-stone-200 text-xs sm:text-sm font-semibold uppercase tracking-wider drop-shadow-md hover:underline underline-offset-4 transition-all group font-primary"
                >
                  <span>{slide.secondaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Bottom-right Tag Pill */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 hidden md:block">
              <span className="bg-black/40 backdrop-blur-md text-white/90 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {slide.tag}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Floating Edge Arrow Controls */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Centered Bottom Indicator Pill */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5 bg-black/45 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 shadow-md">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 cursor-pointer ${
              currentSlide === idx
                ? "w-6 sm:w-8 bg-white"
                : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
        <span className="text-[10px] sm:text-[11px] font-mono text-white/80 font-semibold pl-1">
          0{currentSlide + 1} / 0{slides.length}
        </span>
      </div>
    </section>
  );
}
