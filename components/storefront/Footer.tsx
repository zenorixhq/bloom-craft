"use client";

import { useState } from "react";
import Link from "next/link";
import { storeConfig } from "@/config/store.config";
import {
  MessageCircle,
  Instagram,
  Facebook,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { BrandLogo } from "@/components/storefront/BrandLogo";
import { PolicyModal, PolicyTab } from "@/components/storefront/PolicyModal";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState<PolicyTab | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#121915] text-[#FAF8F5] border-t border-emerald-950/80 mt-16 sm:mt-24 select-none font-glacial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main 4-Column Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Atelier Essence (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="full" showTagline={true} theme="dark" />
            
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-sm">
              Artisanal stationery, handcrafted journals, bespoke wax seals, and thoughtfully curated gift hampers. Made with love for life&apos;s most cherished celebrations.
            </p>

            {/* Social & WhatsApp Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={storeConfig.brand.socials.instagram || "https://www.instagram.com/bloomcraft.in"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-emerald-300 hover:border-emerald-400/60 hover:bg-emerald-500/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${storeConfig.brand.contact.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[#25D366] hover:border-[#25D366]/60 hover:bg-[#25D366]/10 transition-all"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={storeConfig.brand.socials.facebook || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DC9924]">
              Collections
            </h5>
            <ul className="space-y-2 text-xs sm:text-[13px] text-stone-300">
              <li>
                <Link href="/products?category=gift-hampers" className="hover:text-white transition-colors">
                  Curated Hampers
                </Link>
              </li>
              <li>
                <Link href="/products?category=journals-planners" className="hover:text-white transition-colors">
                  Journals &amp; Planners
                </Link>
              </li>
              <li>
                <Link href="/products?category=wax-seals-calligraphy" className="hover:text-white transition-colors">
                  Wax Seals &amp; Ink
                </Link>
              </li>
              <li>
                <Link href="/products?category=desk-accessories" className="hover:text-white transition-colors">
                  Desk Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=cards-envelopes" className="hover:text-white transition-colors">
                  Cards &amp; Envelopes
                </Link>
              </li>
              <li>
                <Link href="/products?category=gifting-keepsakes" className="hover:text-white transition-colors">
                  Gifting Keepsakes
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-emerald-300 hover:underline transition-colors flex items-center gap-1 pt-1 font-medium">
                  <span>View All Products</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DC9924]">
              Gifting Concierge
            </h5>
            <ul className="space-y-2 text-xs sm:text-[13px] text-stone-300">
              <li>
                <button
                  onClick={() => setPolicyModalTab("shipping")}
                  className="hover:text-white transition-colors text-left"
                >
                  Pan-India Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModalTab("return-refund")}
                  className="hover:text-white transition-colors text-left"
                >
                  Hamper Returns &amp; Replacements
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModalTab("care-guide")}
                  className="hover:text-white transition-colors text-left"
                >
                  Wax Sealing &amp; Paper Care Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModalTab("terms")}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModalTab("privacy")}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li className="pt-1">
                <Link
                  href="/admin"
                  className="text-stone-400 hover:text-white transition-colors text-[11px] tracking-wide"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Exclusive Offers (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DC9924]">
              Bloom Craft Circle
            </h5>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Subscribe to receive first access to limited-edition gift hampers, seasonal drops, and 10% off your first craft order.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Welcome! Use code <strong className="text-white">BLOOM10</strong> for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#214332] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#214332] text-white flex items-center justify-center hover:bg-[#162f23] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-[11px] text-stone-400 leading-normal">
              Direct Assistance: <a href="mailto:hello@bloomcraft.in" className="text-emerald-300 hover:underline">hello@bloomcraft.in</a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Payment Trust Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} Bloom Craft. All rights reserved. Handcrafted in India.</p>
          <div className="flex items-center gap-3 text-stone-400 text-xs">
            <span>UPI</span>
            <span>•</span>
            <span>Cards</span>
            <span>•</span>
            <span>NetBanking</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Secure Razorpay Checkout</span>
          </div>
        </div>
      </div>

      {policyModalTab && (
        <PolicyModal
          initialTab={policyModalTab}
          isOpen={true}
          onClose={() => setPolicyModalTab(null)}
        />
      )}
    </footer>
  );
}
