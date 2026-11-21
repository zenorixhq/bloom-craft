"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Gift, ArrowRight, Heart, Briefcase, Flower2, Cake, Award } from "lucide-react";

export function ShopByOccasion() {
  const occasions = [
    {
      id: "birthday",
      title: "Birthdays & Milestones",
      subtitle: "Celebration hampers, gilded journals & joyful unboxing moments",
      badge: "MOST POPULAR",
      icon: <Cake className="w-4 h-4 text-[#DC9924]" />,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
      link: "/products?category=hamper",
      color: "from-amber-950/70 to-black/40",
    },
    {
      id: "anniversary",
      title: "Anniversaries & Love",
      subtitle: "Wax-sealed love letters, keepsake memory boxes & soy candles",
      badge: "ROMANTIC",
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
      link: "/products?category=hamper",
      color: "from-rose-950/70 to-black/40",
    },
    {
      id: "corporate",
      title: "Corporate & Executive",
      subtitle: "Artisanal walnut desk trays, solid brass pens & bespoke client sets",
      badge: "BESPOKE INQUIRIES",
      icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
      image: "https://images.unsplash.com/photo-1507842229451-79b1be886a05?auto=format&fit=crop&q=80&w=600",
      link: "/products?category=desk-accessories",
      color: "from-emerald-950/70 to-black/40",
    },
    {
      id: "self-care",
      title: "Self-Care & Mindfulness",
      subtitle: "Archival gratitude diaries, wild fig candles & calming desk mists",
      badge: "WELLBEING",
      icon: <Flower2 className="w-4 h-4 text-amber-300" />,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
      link: "/products?category=journals-planners",
      color: "from-stone-900/70 to-black/40",
    },
    {
      id: "wedding",
      title: "Weddings & Ceremonies",
      subtitle: "Custom brass wax monogram seals & deckle-edge cotton suites",
      badge: "HEIRLOOM",
      icon: <Award className="w-4 h-4 text-[#DC9924]" />,
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600",
      link: "/products?category=wax-seals-calligraphy",
      color: "from-stone-950/70 to-black/40",
    },
  ];

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16 bg-[#FAF8F5] border-b border-[#E7E3DC] font-glacial">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#214332] uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
              <span>Gifting Concierge</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-[#18221D] mt-1 tracking-tight">
              Shop by Occasion &amp; Moment
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5750] font-light max-w-xl mt-1">
              Find the quintessential handcrafted gesture for every celebration, milestone, and heartfelt expression.
            </p>
          </div>

          <Link
            href="/products?category=hamper"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#214332] hover:text-[#162f23] group transition-colors flex-shrink-0"
          >
            <span>Explore All Hampers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              href={occ.link}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] border border-[#E7E3DC] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between p-4 sm:p-5"
            >
              {/* Background Image */}
              <img
                src={occ.image}
                alt={occ.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${occ.color} group-hover:opacity-90 transition-opacity duration-500`}
              />

              {/* Top Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                  {occ.icon}
                  <span>{occ.badge}</span>
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 text-white space-y-1">
                <h3 className="font-editorial text-lg sm:text-xl font-normal leading-snug tracking-wide group-hover:text-amber-200 transition-colors">
                  {occ.title}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                  {occ.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-amber-300 group-hover:text-amber-100 transition-colors">
                  <span>DISCOVER GIFTS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
