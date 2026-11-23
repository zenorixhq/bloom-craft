"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useSiteImages } from "@/hooks/useSiteImages";

export function AboutUsSection() {
  const { images } = useSiteImages();

  return (
    <section
      id="about-us"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] text-[#18221D] overflow-hidden border-b border-[#E7E3DC] select-none scroll-mt-20 font-glacial"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          
          {/* 1. Left Editorial Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6 sm:space-y-7 py-1">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#214332]">
                <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                <span>Our Philosophy</span>
              </span>
              <h2 className="font-logo text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18221D] leading-[1.1]">
                The Bloom Craft Atelier
              </h2>
              <div className="w-16 sm:w-20 h-[2.5px] bg-gradient-to-r from-[#DC9924] to-transparent rounded-full mt-2.5 sm:mt-3" />
            </div>

            <div className="space-y-5 max-w-md">
              <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#3D4942] leading-relaxed">
                In an increasingly digital world, we cherish the enduring warmth of physical paper, handwritten words, and artful gifts.
              </p>
              <p className="text-sm sm:text-base text-[#4A5750] font-light leading-relaxed">
                Every journal is bound by hand, every wax seal stamp is poured and stamped individually, and each gift hamper is assembled with personalized attention to detail to make your recipient feel truly treasured.
              </p>

              <div className="pt-2">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#18221D] pb-1.5 border-b-2 border-[#18221D] hover:text-[#214332] hover:border-[#214332] transition-all duration-300"
                >
                  <span>EXPLORE OUR ATELIER</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Right Dual Photography Spread */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6 items-center">
            {/* Image 1: Handcrafted Journal & Calligraphy */}
            <div className="col-span-1 relative aspect-[4/5] sm:aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-2xl bg-stone-100 shadow-md border border-[#E7E3DC] group">
              <img
                src={images.aboutImage1 || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"}
                alt="Bloom Craft Handcrafted Journals and Notebooks"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium font-glacial opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Archival Paper Goods
              </div>
            </div>

            {/* Image 2: Wax Seal & Hamper Packaging */}
            <div className="col-span-1 relative aspect-[4/5] sm:aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-2xl bg-stone-100 shadow-md border border-[#E7E3DC] group mt-6 sm:mt-8">
              <img
                src={images.aboutImage2 || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"}
                alt="Bloom Craft Custom Wax Seals & Gifting Details"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium font-glacial opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Bespoke Wax Seals
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
