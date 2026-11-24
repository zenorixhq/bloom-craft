"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { storeConfig } from "@/config/store.config";

interface FAQItem {
  question: string;
  answer: string;
}

export function GiftingFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to prepare and dispatch a handcrafted hamper?",
      answer:
        "Since each hamper is thoughtfully hand-assembled, personalized with your custom note, and wax-sealed individually in our atelier, we typically dispatch orders within 24–48 hours. Delivery takes 2–4 business days across Kerala and South India, and 3–6 business days pan-India.",
    },
    {
      question: "Can I choose a specific celebration or delivery date?",
      answer:
        "Yes, absolutely! During checkout or via our WhatsApp concierge, simply let us know your recipient's special milestone date (Birthday, Anniversary, Wedding). We will schedule dispatch so your hamper arrives right in time.",
    },
    {
      question: "Will the price tag or invoice be included inside the gift box?",
      answer:
        "Never. Since Bloom Craft items are treasured gifts sent directly to cherished recipients, we never include a physical price tag, invoice, or receipt inside the parcel. You will receive your complete digital invoice privately via email and WhatsApp.",
    },
    {
      question: "How does the handwritten calligraphy note work?",
      answer:
        "Every single Bloom Craft hamper includes a complimentary handmade deckle-edge cotton message card. During checkout, write your heartfelt message in the order notes (or WhatsApp our curator), and we will transcribe it in elegant handwritten script, tucked into a wax-sealed envelope.",
    },
    {
      question: "Do you offer safe delivery and pan-India shipping?",
      answer:
        "Yes! We deliver to over 25,000+ pin codes across all Indian states. Every fragile item (such as soy candles, glass inkwells, and pinewood boxes) is cushioned in eco-friendly protective packaging to ensure it arrives in pristine, photo-ready condition.",
    },
    {
      question: "Can I customize the items in my hamper or place corporate / bulk orders?",
      answer:
        "Yes! We specialize in bespoke gifting for corporate milestones, executive retreats, and wedding favors. You can choose specific journal colors, brass seal monogram crests, candle scents, and branded wax stamps. Contact our concierge via WhatsApp for volume tier pricing.",
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const whatsappUrl = `https://wa.me/${storeConfig.brand.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Bloom Craft! I have a question about placing a gift hamper order."
  )}`;

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E7E3DC] font-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-8 sm:space-y-10">
        
        {/* Header (Inspired by Crafto Arte: Got Questions? We've Got Answers) */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#214332] font-subtext">
            <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
            <span>GIFTING CLARITY</span>
          </div>
          <h2 className="font-logo text-2xl sm:text-3xl md:text-4xl font-normal text-[#18221D] tracking-tight">
            Got Questions? We’ve Got Answers.
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5750] font-editorial italic leading-relaxed">
            Everything you need to know about our handcrafted assembly, delivery timelines, and personalized note cards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xs border border-[#E7E3DC] rounded-2xl overflow-hidden shadow-2xs transition-all duration-300 hover:border-[#214332]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-primary text-base sm:text-lg font-medium text-[#18221D]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#214332] text-white border-[#214332]" : "text-stone-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#4A5750] font-subtext leading-relaxed border-t border-stone-100 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#FAF4EB] border border-[#E4DCCE] rounded-2xl p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#214332] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5 text-[#DC9924]" />
            </div>
            <div>
              <h4 className="font-primary text-base font-semibold text-[#18221D]">
                Still have a question or need a quick consultation?
              </h4>
              <p className="text-xs text-[#526058] font-subtext mt-0.5">
                Our gifting curator is available on WhatsApp to assist with bespoke orders and express requests.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#214332] hover:bg-[#162f23] text-white text-xs font-primary uppercase tracking-wider font-semibold transition-all whitespace-nowrap shadow-xs hover:scale-105"
          >
            Chat with Curator
          </a>
        </div>

      </div>
    </section>
  );
}
