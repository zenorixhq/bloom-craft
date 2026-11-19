"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { storeConfig } from "@/config/store.config";

export function WebsiteLoadingAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Only show on the very first initial load of the website session
    const hasSeen = typeof window !== "undefined" && sessionStorage.getItem("bloomcraft_intro_shown");
    if (hasSeen) {
      setIsVisible(false);
      try {
        document.documentElement.classList.add("bloomcraft-intro-complete");
      } catch (e) {}
      return;
    }

    const startTime = Date.now();
    const MIN_SPLASH_TIME = 900;
    let completed = false;

    const revealPage = () => {
      if (completed) return;
      completed = true;

      const elapsed = Date.now() - startTime;
      const waitRemaining = Math.max(0, MIN_SPLASH_TIME - elapsed);

      const fadeTimer = setTimeout(() => {
        setIsFading(true);
        try {
          sessionStorage.setItem("bloomcraft_intro_shown", "true");
          document.documentElement.classList.add("bloomcraft-intro-complete");
        } catch (e) {}
        window.dispatchEvent(new CustomEvent("bloomcraft:intro-ready"));
      }, waitRemaining);

      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, waitRemaining + 600);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    };

    if (document.readyState === "complete") {
      const cleanup = revealPage();
      return () => {
        if (cleanup) cleanup();
      };
    } else {
      window.addEventListener("load", revealPage, { once: true });
      const safetyTimer = setTimeout(revealPage, 2200);

      return () => {
        window.removeEventListener("load", revealPage);
        clearTimeout(safetyTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5] select-none transition-all duration-700 ease-out ${
        isFading
          ? "opacity-0 pointer-events-none scale-[1.03]"
          : "opacity-100 pointer-events-auto"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,153,36,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center text-center space-y-4 px-6">
        <div className="w-14 h-14 rounded-full border border-emerald-900/15 p-2 bg-white shadow-xs">
          <img
            src="/bloom-craft-logo.png"
            alt="Bloom Craft"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#18221D] tracking-[0.34em] sm:tracking-[0.44em] uppercase leading-none pl-[0.34em] sm:pl-[0.44em]">
          {storeConfig?.meta?.name || "BLOOM CRAFT"}
        </h1>

        <div className="w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-[#DC9924] to-transparent rounded-full transform scale-x-0 animate-[lineExpand_0.8s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards]" />

        <p className="font-glacial text-[10px] sm:text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#3D4942] pl-[0.28em] opacity-0 animate-[fadeIn_0.6s_ease-out_0.35s_forwards]">
          ARTISANAL STATIONERY &amp; HAMPERS
        </p>
      </div>
    </div>
  );
}
