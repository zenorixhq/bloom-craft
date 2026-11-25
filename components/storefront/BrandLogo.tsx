"use client";

import React from "react";
import Link from "next/link";
import { storeConfig } from "@/config/store.config";
import { useSiteImages } from "@/hooks/useSiteImages";
import { BloomCraftWordmark } from "./BloomCraftWordmark";

interface BrandLogoProps {
  variant?: "full" | "compact" | "emblem-only";
  showTagline?: boolean;
  className?: string;
  theme?: "light" | "dark";
}

export function BrandLogo({
  variant = "full",
  showTagline = true,
  className = "",
  theme = "light",
}: BrandLogoProps) {
  const { images } = useSiteImages();

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}
      aria-label="Bloom Craft Home"
    >
      {/* 1. Official Bloom Craft Emblem */}
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden border border-primary/20 shadow-xs bg-white group-hover:scale-105 transition-all duration-300">
        <img
          src={images.brandLogo || "/bloom-craft-emblem.png"}
          alt="Bloom Craft Logo Emblem"
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* 2. Official Brand Wordmark matching logo font */}
      {variant !== "emblem-only" && (
        <div className="flex flex-col text-left justify-center">
          <div className="flex items-center gap-1.5">
            <BloomCraftWordmark
              theme={theme}
              className="h-[18px] sm:h-[22px] w-auto max-w-[150px] sm:max-w-[185px]"
            />
            <span className="sr-only">BLOOM CRAFT</span>
            <span className="text-[10px] text-[#DC9924]">✦</span>
          </div>
          {showTagline && (
            <span
              className={`font-editorial italic text-[10.5px] sm:text-[12px] tracking-wide mt-[-2px] truncate max-w-[210px] sm:max-w-none ${
                theme === "dark" ? "text-emerald-200/90" : "text-primary/90"
              }`}
            >
              {storeConfig.meta.tagline}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
