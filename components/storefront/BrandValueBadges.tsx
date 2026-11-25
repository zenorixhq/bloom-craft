"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Feather, Gift, Leaf, Award, ShieldCheck } from "lucide-react";
import { storeConfig } from "@/config/store.config";

export function BrandValueBadges() {
  const badges = [
    {
      id: "handcrafted",
      title: "Artisanal Handcrafting",
      desc: "Hand-stitched leather bindings, deckle-edge papers & custom wax seals",
      tag: "Handmade",
      icon: <Feather className="w-7 h-7 text-[#214332]" />,
    },
    {
      id: "gift-ready",
      title: "Curated & Gift Ready",
      desc: "Elegantly boxed with botanical ribbons, dried florals & personal note cards",
      tag: "Unboxing Joy",
      icon: <Gift className="w-7 h-7 text-[#214332]" />,
    },
    {
      id: "eco-archival",
      title: "Eco-Conscious & Archival",
      desc: "100% acid-free cotton paper, pure soy waxes & recyclable packaging",
      tag: "Sustainable",
      icon: <Leaf className="w-7 h-7 text-[#214332]" />,
    },
    {
      id: "bespoke",
      title: "Bespoke Personalization",
      desc: "Custom monograms, calligraphy inscriptions & tailored corporate sets",
      tag: "Unique",
      icon: <Award className="w-7 h-7 text-[#214332]" />,
    },
    {
      id: "delivery",
      title: "Safe Express Shipping",
      desc: "Damage-proof cushioned packaging dispatched fast across all of India",
      tag: "Pan-India",
      icon: <ShieldCheck className="w-7 h-7 text-[#214332]" />,
    },
  ];

  return (
    <section id="brand-values" className="w-full max-w-full py-8 sm:py-12 lg:py-14 bg-[#FAF8F5] border-b border-[#E7E3DC] font-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="bg-white/90 backdrop-blur-xs border border-[#E7E3DC] rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xs space-y-6 sm:space-y-8">
          
          {/* Section Editorial Header */}
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 border-b border-[#E7E3DC]/60 pb-5 sm:pb-6">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#214332] block font-subtext">
              OUR STANDARDS
            </span>
            <h3 className="font-logo text-2xl sm:text-3xl md:text-4xl font-bold text-[#18221D] tracking-tight">
              The Bloom Craft Promise
            </h3>
            <p className="font-editorial italic text-xs sm:text-sm text-[#4A5750] max-w-md mx-auto leading-relaxed">
              Every journal, wax seal, and curated gift box is crafted to make someone feel truly special.
            </p>
          </div>

          {/* Desktop 5 Badges in 1 Row */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-3.5 xl:gap-4 items-stretch">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="group relative rounded-2xl bg-[#FFFDF9] border border-[#E7E3DC] hover:border-[#214332]/60 p-4 xl:p-5 text-center shadow-[0_2px_12px_rgba(24,34,29,0.03)] hover:shadow-[0_12px_28px_rgba(33,67,50,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between"
              >
                <span className="text-[9px] font-bold tracking-wider uppercase text-[#214332] bg-[#EEF3F0] border border-emerald-900/10 px-2.5 py-0.5 rounded-full mb-2.5 font-subtext">
                  {badge.tag}
                </span>

                <div className="relative w-14 h-14 rounded-xl border border-emerald-900/15 bg-gradient-to-br from-[#FFFDF9] via-[#EEF3F0] to-[#E2ECE6] flex items-center justify-center p-2.5 mb-3 shadow-xs group-hover:scale-105 group-hover:border-[#214332] transition-all duration-300 shrink-0">
                  {badge.icon}
                </div>

                <div className="space-y-1 flex-1 flex flex-col justify-start">
                  <h4 className="font-primary text-sm xl:text-[15px] font-bold tracking-wide text-[#18221D] group-hover:text-[#214332] transition-colors leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] xl:text-xs text-[#4A5750] font-normal leading-snug mt-0.5 font-subtext">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden space-y-3 sm:space-y-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-3.5 items-stretch">
              {badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="group relative rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#E7E3DC] p-2 sm:p-4 text-center shadow-xs flex flex-col items-center justify-between"
                >
                  <span className="text-[7.5px] sm:text-[9px] font-bold tracking-wider uppercase text-[#214332] bg-[#EEF3F0] px-1.5 sm:px-2 py-0.5 rounded-full mb-1.5 sm:mb-2.5">
                    {badge.tag}
                  </span>
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl border border-emerald-900/15 bg-[#EEF3F0] flex items-center justify-center mb-1.5 sm:mb-2.5 shrink-0">
                    <div className="scale-75 sm:scale-90">{badge.icon}</div>
                  </div>
                  <div className="space-y-0.5 flex-1 flex flex-col justify-start">
                    <h4 className="font-editorial text-[11px] sm:text-sm font-bold tracking-wide text-[#18221D] leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[9.5px] sm:text-[11px] text-[#4A5750] font-normal leading-tight mt-0.5 line-clamp-2">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3.5 max-w-[80%] sm:max-w-md mx-auto items-stretch">
              {badges.slice(3, 5).map((badge) => (
                <div
                  key={badge.id}
                  className="group relative rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#E7E3DC] p-2 sm:p-4 text-center shadow-xs flex flex-col items-center justify-between"
                >
                  <span className="text-[7.5px] sm:text-[9px] font-bold tracking-wider uppercase text-[#214332] bg-[#EEF3F0] px-1.5 sm:px-2 py-0.5 rounded-full mb-1.5 sm:mb-2.5">
                    {badge.tag}
                  </span>
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl border border-emerald-900/15 bg-[#EEF3F0] flex items-center justify-center mb-1.5 sm:mb-2.5 shrink-0">
                    <div className="scale-75 sm:scale-90">{badge.icon}</div>
                  </div>
                  <div className="space-y-0.5 flex-1 flex flex-col justify-start">
                    <h4 className="font-editorial text-[11px] sm:text-sm font-bold tracking-wide text-[#18221D] leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[9.5px] sm:text-[11px] text-[#4A5750] font-normal leading-tight mt-0.5 line-clamp-2">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Hamper Customization Banner */}
          <div className="pt-2 sm:pt-3">
            <Link
              href={`https://wa.me/${storeConfig.brand.contact.whatsappNumber}?text=Hi%20Bloom%20Craft%2C%20I%20would%20like%20to%20customize%20a%20gift%20hamper`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-row items-center justify-between gap-3 sm:gap-4 px-4 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-[#EEF3F0] via-[#FFFDF9] to-[#EEF3F0] hover:from-[#E2ECE6] hover:to-[#E2ECE6] border border-[#214332]/25 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide sm:tracking-widest uppercase text-[#214332] truncate">
                <span className="text-[#DC9924] text-xs shrink-0">✦</span>
                <span className="truncate">CUSTOM GIFT HAMPER ASSISTANCE &amp; BULK ORDERS</span>
                <span className="text-[#DC9924] text-xs hidden md:inline shrink-0">✦</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#18221D] text-white group-hover:bg-[#214332] text-xs sm:text-sm font-bold tracking-wider transition-colors shadow-xs shrink-0 whitespace-nowrap">
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366] fill-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
