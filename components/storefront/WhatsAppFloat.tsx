"use client";

import { useState } from "react";
import { storeConfig } from "@/config/store.config";
import { MessageCircle, X, Sparkles } from "lucide-react";

export function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  if (!storeConfig.features.enableWhatsAppFloat) return null;

  const phone = storeConfig.brand.contact.whatsappNumber;
  const message = encodeURIComponent(
    "Hi Bloom Craft! 🌿 I am browsing your stationery & gift hamper collection and would love some assistance with custom orders."
  );
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-end gap-3 group font-primary">
      {/* Floating Tooltip Callout */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-card border border-border/80 text-foreground px-3.5 py-2 rounded-2xl shadow-xl text-xs animate-in fade-in slide-in-from-right-4 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-[#214332] flex-shrink-0" />
          <span className="font-medium font-subtext">Need custom hamper help? Chat on WhatsApp!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-muted-foreground hover:text-foreground p-0.5 ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Bloom Craft on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative group"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        {/* Live Pulse Beacon */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full animate-ping" />
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full" />
      </a>
    </div>
  );
}
