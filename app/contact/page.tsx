"use client";

import { useState } from "react";
import Link from "next/link";
import { storeConfig } from "@/config/store.config";
import {
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  ChevronRight,
  Package,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "Custom Hamper Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.message) return;

    // Direct WhatsApp Concierge redirect with formatted message
    const text = `*New Inquiry from Bloom Craft Website*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Contact:* ${formData.contact}\n` +
      `*Type:* ${formData.subject}\n` +
      `*Message:* ${formData.message}`;

    const waUrl = `https://wa.me/${storeConfig.brand.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-sans">
          <Link href="/" className="hover:text-[#214332] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#18221D] font-semibold">Contact &amp; Concierge</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3F0] border border-[#214332]/15 text-[#214332] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
            <span>Bloom Craft Concierge</span>
          </span>
          <h1 className="font-logo text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18221D] tracking-tight">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            Whether you&apos;re planning a bespoke gift hamper, need assistance with your order, or want to collaborate for corporate celebrations, our team is here to assist.
          </p>
        </div>

        {/* Quick Contact Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: WhatsApp Hotline */}
          <div className="bg-white/90 border border-[#E7E3DC] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18221D]">Instant WhatsApp Concierge</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Fastest response for urgent custom hampers, customization photos, and tracking.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-stone-100">
              <a
                href={`https://wa.me/${storeConfig.brand.contact.whatsappNumber}?text=Hi%20Bloom%20Craft%2C%20I%20have%20an%20inquiry%20regarding%20an%20order`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#214332] hover:text-[#162f23] transition-colors"
              >
                <span>Chat on WhatsApp (+91 {storeConfig.brand.contact.whatsappNumber.slice(-10)})</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 2: Email Support */}
          <div className="bg-white/90 border border-[#E7E3DC] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#DC9924]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18221D]">Customer Support Email</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Ideal for corporate catalogs, bulk gifting requests, and order inquiries.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-stone-100">
              <a
                href={`mailto:${storeConfig.brand.contact.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#214332] hover:text-[#162f23] transition-colors"
              >
                <span>{storeConfig.brand.contact.email}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 3: Atelier Hours & Dispatch */}
          <div className="bg-white/90 border border-[#E7E3DC] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18221D]">Studio &amp; Dispatch Hours</h3>
                <p className="text-xs text-stone-500 mt-1">
                  {storeConfig.brand.contact.hours}
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-stone-100 text-xs text-stone-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Pan-India Express DTDC &amp; India Post</span>
            </div>
          </div>
        </div>

        {/* Contact Form & Help Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/95 border border-[#E7E3DC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="font-logo text-xl sm:text-2xl font-bold text-[#18221D]">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Fill in the details below and we&apos;ll get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#EEF3F0] border border-[#214332]/20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#214332] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-logo text-lg font-bold text-[#18221D]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                  Your inquiry has been received. Our concierge will review your message and connect with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", contact: "", subject: "Custom Hamper Inquiry", message: "" });
                  }}
                  className="mt-2 text-xs font-bold text-[#214332] underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E3DC] text-sm text-[#18221D] placeholder:text-stone-400 focus:outline-none focus:border-[#214332] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    WhatsApp Number or Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98765 43210 or yourname@gmail.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E3DC] text-sm text-[#18221D] placeholder:text-stone-400 focus:outline-none focus:border-[#214332] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E3DC] text-sm text-[#18221D] focus:outline-none focus:border-[#214332] focus:bg-white transition-colors"
                  >
                    <option value="Custom Hamper Inquiry">Custom Hamper Inquiry</option>
                    <option value="Existing Order Tracking">Existing Order Tracking</option>
                    <option value="Corporate / Bulk Favors">Corporate / Bulk Favors</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you're looking for (e.g. occasion, preferred budget, delivery date)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E3DC] text-sm text-[#18221D] placeholder:text-stone-400 focus:outline-none focus:border-[#214332] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-[#214332] text-white font-semibold text-sm hover:bg-[#162f23] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp Concierge</span>
                </button>
                <p className="text-[11px] text-stone-400 text-center font-light">
                  Opens WhatsApp directly with your message pre-filled. No waiting required.
                </p>
              </form>
            )}
          </div>

          {/* Right: Quick Resources & FAQ Links (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/90 border border-[#E7E3DC] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#214332]" />
                <h3 className="font-logo text-base font-bold text-[#18221D]">
                  Quick Self-Service Links
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                Looking for immediate information? These resources might answer your question instantly:
              </p>

              <div className="divide-y divide-stone-100">
                <Link
                  href="/policies?tab=shipping"
                  className="py-3 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-[#214332] group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-stone-400 group-hover:text-[#214332]" />
                    <span>Pan-India Shipping &amp; Timelines</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/policies?tab=return-refund"
                  className="py-3 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-[#214332] group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-stone-400 group-hover:text-[#214332]" />
                    <span>360° Unboxing Video &amp; Return Policy</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/custom-hamper"
                  className="py-3 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-[#214332] group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#DC9924]" />
                    <span>Build Your Own Custom Hamper Online</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/account"
                  className="py-3 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-[#214332] group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-stone-400 group-hover:text-[#214332]" />
                    <span>Track My Existing Order Status</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Atelier Note */}
            <div className="bg-[#FAF7F2] border border-[#EADBBE] rounded-2xl p-5 text-xs text-stone-700 space-y-1.5">
              <span className="font-bold text-[#214332] block">Atelier Care Promise</span>
              <p className="text-stone-600 font-light leading-relaxed">
                Every hamper is carefully assembled, sealed with premium ribbons, and packed in shock-proof bubble wraps to ensure pristine arrival across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
