"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, Gift, CheckCircle2, ArrowRight } from "lucide-react";
import { storeConfig } from "@/config/store.config";

export function CustomHamperBanner() {
  const whatsappUrl = `https://wa.me/${storeConfig.brand.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Bloom Craft! I'm looking for a personalized gift hamper for a special occasion. Can you help me customize it?"
  )}`;

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16 bg-[#FAF8F5] border-b border-[#E7E3DC] font-glacial">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E382B] via-[#214332] to-[#14261D] text-white p-6 sm:p-10 lg:p-14 shadow-xl border border-emerald-900/30">
          
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC9924]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <div className="inline-flex items-center gap-1.5 bg-[#DC9924]/20 border border-[#DC9924]/40 text-[#F5C46B] text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BESPOKE CONCIERGE</span>
              </div>

              <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Customise Your Hamper
              </h2>

              <p className="font-editorial italic text-base sm:text-lg lg:text-xl text-stone-200/90 leading-relaxed max-w-xl">
                Make your gifting unforgettable with a personalized hamper. Choose your journal, candle fragrance, brass wax seal monogram, and custom handwritten message — our atelier will hand-craft and wax-seal it beautifully for you.
              </p>

              {/* Feature Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-stone-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DC9924] flex-shrink-0" />
                  <span>Choose Your Theme &amp; Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DC9924] flex-shrink-0" />
                  <span>Complimentary Calligraphy Note</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DC9924] flex-shrink-0" />
                  <span>Custom Monogram Wax Seal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DC9924] flex-shrink-0" />
                  <span>Pan-India Safe Express Dispatch</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link
                  href="/custom-hamper"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#DC9924] hover:bg-[#c9891c] text-[#14261D] text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-[#14261D]" />
                  <span>Build Custom Hamper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products?category=hamper-boxes"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 hover:border-white text-white text-sm font-semibold transition-all hover:bg-white/10"
                >
                  <span>Browse Ready Hampers</span>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-200 hover:text-[#DC9924] underline underline-offset-4 py-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Or Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Photography Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
                  alt="Custom gift hamper packaging with wax seal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#DC9924] block">
                    ATELIER CURATION
                  </span>
                  <p className="text-xs text-white/90 font-medium">
                    Pinewood Keepsake Boxes • Botanical Ribbons • Wax Crests
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
