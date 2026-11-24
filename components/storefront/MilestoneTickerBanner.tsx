"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

export function MilestoneTickerBanner() {
  const words = [
    "CHERISHED MOMENTS",
    "HANDWRITTEN LOVE",
    "SPECIAL CELEBRATIONS",
    "LIFELONG KEEPSAKES",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 350);
    }, 3200);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#214332] text-white overflow-hidden relative border-b border-[#182C22] font-primary">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#DC9924]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-5 sm:space-y-6">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-[#DC9924] font-subtext">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CELEBRATE LIFE</span>
        </div>

        {/* Section Headline */}
        <h2 className="font-logo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Capture Every Milestone
        </h2>

        {/* Dynamic Flip Word Indicator (Inspired by Crafto Arte Flip Words) */}
        <div className="py-2 flex items-center justify-center">
          <div className="inline-block bg-[#162F23] border border-[#DC9924]/40 rounded-2xl px-5 sm:px-8 py-3 sm:py-4 shadow-xl">
            <span
              className={`font-primary text-xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#DC9924] block transition-all duration-300 transform ${
                fade ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"
              }`}
            >
              ✦ {words[currentIndex]} ✦
            </span>
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="font-editorial italic text-base sm:text-lg md:text-xl text-stone-200/90 max-w-xl mx-auto leading-relaxed">
          Turn your cherished memories into a physical celebration. Hand-bound journals, botanical soy candles, and custom brass wax seals delivered with love across India.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/products?category=hamper"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAF8F5] hover:bg-white text-[#214332] text-sm font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Explore Celebration Hampers</span>
            <ArrowRight className="w-4 h-4 text-[#214332]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
