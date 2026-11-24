"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { categories, products } from "@/data/mockData";
import { Product } from "@/types/store";
import {
  Gift,
  Sparkles,
  CheckCircle2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Heart,
  Package,
  Layers,
  Sparkle
} from "lucide-react";

export default function CustomHamperPage() {
  const addCustomHamper = useCartStore((s) => s.addCustomHamper);

  // Step 1: Base Container (Hamper Box, Basket, or Trolley)
  const containerOptions = useMemo(() => {
    return products.filter((p) =>
      p.category === "hamper-boxes" || p.category === "basket" || p.category === "trolley"
    );
  }, []);

  const [selectedBase, setSelectedBase] = useState<Product>(containerOptions[0] || products[0]);

  // Step 2: Items inside Hamper
  // Categories to select from: Plushies, Korean Stationery, Anti-tarnish Jewellery, Perfume, Frames, Quran Musalla, Acrylic Cutouts, Keychains
  const giftCategories = [
    { slug: "all", label: "All Gift Items" },
    { slug: "plushies", label: "Plushies" },
    { slug: "korean-stationery", label: "Korean Stationery" },
    { slug: "anti-tarnish-jewellery", label: "Anti-tarnish Jewellery" },
    { slug: "perfume", label: "Perfume" },
    { slug: "frames", label: "Frames" },
    { slug: "quran-musalla", label: "Quran Musalla" },
    { slug: "acrylic-cutouts", label: "Acrylic Cutouts" },
    { slug: "keychains", label: "Keychains" },
  ];

  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<{ [productId: string]: number }>({});

  // Filtered products for Step 2
  const giftProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.isHamper) return false;
      if (p.category === "hamper-boxes" || p.category === "basket" || p.category === "trolley") {
        return false;
      }
      if (p.category === "ribbons" || p.category === "bouquet-sheet") {
        return false;
      }
      if (activeCategoryFilter === "all") return true;
      return p.category === activeCategoryFilter;
    });
  }, [activeCategoryFilter]);

  // Step 3: Ribbons, Wraps, Card
  const ribbonOptions = useMemo(() => {
    return products.filter((p) => p.category === "ribbons");
  }, []);

  const wrapOptions = useMemo(() => {
    return products.filter((p) => p.category === "bouquet-sheet");
  }, []);

  const [selectedRibbon, setSelectedRibbon] = useState<Product | null>(ribbonOptions[0] || null);
  const [selectedWrap, setSelectedWrap] = useState<Product | null>(null);
  const [giftNote, setGiftNote] = useState("");

  // Helpers to add / remove items
  const handleAddItem = (productId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: current - 1 };
    });
  };

  // Item counts & Unique categories inside Hamper
  const selectedProductList = useMemo(() => {
    const list: { product: Product; quantity: number }[] = [];
    Object.entries(selectedItems).forEach(([id, qty]) => {
      const prod = products.find((p) => p.id === id);
      if (prod && qty > 0) {
        list.push({ product: prod, quantity: qty });
      }
    });
    return list;
  }, [selectedItems]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set<string>();
    if (selectedBase) cats.add(selectedBase.category);
    selectedProductList.forEach((item) => cats.add(item.product.category));
    if (selectedRibbon) cats.add("ribbons");
    if (selectedWrap) cats.add("bouquet-sheet");
    return Array.from(cats);
  }, [selectedBase, selectedProductList, selectedRibbon, selectedWrap]);

  // Total Price calculation
  const totalPrice = useMemo(() => {
    let total = selectedBase ? (selectedBase.salePrice || selectedBase.price) : 0;
    selectedProductList.forEach((item) => {
      total += (item.product.salePrice || item.product.price) * item.quantity;
    });
    if (selectedRibbon) total += selectedRibbon.salePrice || selectedRibbon.price;
    if (selectedWrap) total += selectedWrap.salePrice || selectedWrap.price;
    return total;
  }, [selectedBase, selectedProductList, selectedRibbon, selectedWrap]);

  const totalItemCount = useMemo(() => {
    let count = 1; // Base container
    selectedProductList.forEach((item) => {
      count += item.quantity;
    });
    if (selectedRibbon) count += 1;
    if (selectedWrap) count += 1;
    return count;
  }, [selectedProductList, selectedRibbon, selectedWrap]);

  // Add to Bag action
  const handleAddHamperToCart = () => {
    const hamperItemsList: { category: string; title: string; quantity: number }[] = [
      {
        category: selectedBase.category,
        title: selectedBase.title,
        quantity: 1,
      },
    ];

    selectedProductList.forEach((item) => {
      hamperItemsList.push({
        category: item.product.category,
        title: item.product.title,
        quantity: item.quantity,
      });
    });

    if (selectedRibbon) {
      hamperItemsList.push({
        category: "ribbons",
        title: selectedRibbon.title,
        quantity: 1,
      });
    }

    if (selectedWrap) {
      hamperItemsList.push({
        category: "bouquet-sheet",
        title: selectedWrap.title,
        quantity: 1,
      });
    }

    addCustomHamper({
      title: `Custom Curated Gift Hamper (${totalItemCount} Items)`,
      price: totalPrice,
      image: selectedBase.images[0] || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
      hamperItems: hamperItemsList,
      customMessage: giftNote.trim() ? giftNote.trim() : undefined,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#18221D] font-primary">
      {/* 1. Header Banner */}
      <section className="relative w-full py-12 sm:py-16 bg-[#214332] text-white overflow-hidden border-b border-emerald-950/20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DC9924]/20 border border-[#DC9924]/40 text-[#F5C46B] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-2xs font-subtext">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BESPOKE GIFT BOX ATELIER</span>
          </div>

          <h1 className="font-logo text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
            Build Your Custom Gift Hamper
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-editorial italic leading-relaxed">
            Curate an unforgettable gift box. Select your container, add multiple gifts across our 13 artisanal categories, and finish with luxury ribbons and a complimentary wax-sealed message card.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs sm:text-sm text-stone-200">
            <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#DC9924]" />
              Multi-Category Gifting
            </span>
            <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#DC9924]" />
              Complimentary Calligraphy Card
            </span>
            <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#DC9924]" />
              Pan-India Express Dispatch
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Builder Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive 3-Step Selection */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            
            {/* STEP 1: Choose Your Base Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3DC] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#E7E3DC] pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#214332] text-white flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <div>
                    <h2 className="font-logo text-xl sm:text-2xl font-semibold text-[#18221D]">
                      Choose Your Base Container
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 font-editorial italic">
                      Select a Hamper Box, Woven Basket, or Presentation Trolley
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#DC9924] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-stone-200">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {containerOptions.map((container) => {
                  const isSelected = selectedBase?.id === container.id;
                  const price = container.salePrice || container.price;
                  return (
                    <div
                      key={container.id}
                      onClick={() => setSelectedBase(container)}
                      className={`cursor-pointer rounded-2xl p-3 border-2 transition-all duration-300 relative flex flex-col justify-between group ${
                        isSelected
                          ? "border-[#214332] bg-[#EEF3F0]/60 shadow-md ring-2 ring-[#214332]/20"
                          : "border-[#E7E3DC] hover:border-stone-400 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10 bg-[#214332] text-white rounded-full p-1 shadow-sm">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-3">
                        <img
                          src={container.images[0]}
                          alt={container.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#DC9924]">
                          {container.category.replace("-", " ")}
                        </span>
                        <h3 className="font-editorial text-sm font-semibold text-[#18221D] line-clamp-1 leading-snug">
                          {container.title}
                        </h3>
                        <div className="text-sm font-bold text-[#214332]">
                          {formatPrice(price)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Add Multiple Items Across Categories */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3DC] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E7E3DC] pb-4 gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#214332] text-white flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <div>
                    <h2 className="font-logo text-xl sm:text-2xl font-semibold text-[#18221D]">
                      Add Gifts from Different Categories
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 font-editorial italic">
                      Mix and match plushies, jewellery, perfumes, stationery, frames &amp; more
                    </p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-[#214332] bg-[#EEF3F0] px-3 py-1 rounded-full border border-emerald-900/10">
                  {selectedProductList.length} items added ({uniqueCategories.length} categories)
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {giftCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategoryFilter(cat.slug)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategoryFilter === cat.slug
                        ? "bg-[#214332] text-white shadow-xs"
                        : "bg-[#FAF8F5] text-stone-700 hover:bg-stone-200 border border-[#E7E3DC]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Products Grid for Step 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {giftProducts.map((product) => {
                  const qty = selectedItems[product.id] || 0;
                  const price = product.salePrice || product.price;

                  return (
                    <div
                      key={product.id}
                      className={`rounded-2xl p-3 border transition-all duration-300 flex flex-col justify-between ${
                        qty > 0
                          ? "border-[#214332] bg-[#EEF3F0]/40 shadow-sm"
                          : "border-[#E7E3DC] bg-white hover:border-stone-300"
                      }`}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-2.5">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {product.category.replace("-", " ")}
                        </span>
                        {qty > 0 && (
                          <span className="absolute top-2 right-2 bg-[#214332] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            {qty} in box
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 flex-1">
                        <h4 className="font-editorial text-sm font-semibold text-[#18221D] line-clamp-1">
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-tight">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#E7E3DC]/60">
                        <span className="text-sm font-bold text-[#214332]">
                          {formatPrice(price)}
                        </span>

                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => handleAddItem(product.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#214332] hover:bg-[#162f23] text-white text-xs font-semibold shadow-2xs transition-all active:scale-95 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-white border border-[#214332] rounded-lg p-0.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(product.id)}
                              className="p-1 text-stone-700 hover:text-red-600 transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#214332]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddItem(product.id)}
                              className="p-1 text-stone-700 hover:text-[#214332] transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Ribbons, Wraps & Personal Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3DC] shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-[#E7E3DC] pb-4">
                <span className="w-8 h-8 rounded-full bg-[#214332] text-white flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h2 className="font-logo text-xl sm:text-2xl font-semibold text-[#18221D]">
                    Ribbons, Wrap &amp; Personalized Note
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 font-editorial italic">
                    Complimentary wax seal gift card &amp; luxury finishing touches
                  </p>
                </div>
              </div>

              {/* Ribbon Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#214332] block">
                  Select Presentation Ribbon
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setSelectedRibbon(null)}
                    className={`cursor-pointer rounded-xl p-3 border text-center transition-all ${
                      selectedRibbon === null
                        ? "border-[#214332] bg-[#EEF3F0] font-bold text-[#214332]"
                        : "border-[#E7E3DC] hover:border-stone-400 text-stone-700"
                    }`}
                  >
                    <span className="text-xs">No Ribbon</span>
                    <span className="block text-[11px] text-stone-500">₹0</span>
                  </div>

                  {ribbonOptions.map((ribbon) => {
                    const isSelected = selectedRibbon?.id === ribbon.id;
                    const price = ribbon.salePrice || ribbon.price;
                    return (
                      <div
                        key={ribbon.id}
                        onClick={() => setSelectedRibbon(ribbon)}
                        className={`cursor-pointer rounded-xl p-3 border transition-all flex items-center gap-3 ${
                          isSelected
                            ? "border-[#214332] bg-[#EEF3F0] shadow-xs"
                            : "border-[#E7E3DC] hover:border-stone-400 bg-white"
                        }`}
                      >
                        <img
                          src={ribbon.images[0]}
                          alt={ribbon.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-[#18221D] truncate">
                            {ribbon.title}
                          </h5>
                          <span className="text-xs font-bold text-[#214332]">
                            +{formatPrice(price)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bouquet Sheet Wrap Selection */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#214332] block">
                  Bouquet Sheet Wrap / Lining
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedWrap(null)}
                    className={`cursor-pointer rounded-xl p-3 border text-center transition-all ${
                      selectedWrap === null
                        ? "border-[#214332] bg-[#EEF3F0] font-bold text-[#214332]"
                        : "border-[#E7E3DC] hover:border-stone-400 text-stone-700"
                    }`}
                  >
                    <span className="text-xs">Standard Tissue Paper Cushioning (Free)</span>
                  </div>

                  {wrapOptions.map((wrap) => {
                    const isSelected = selectedWrap?.id === wrap.id;
                    const price = wrap.salePrice || wrap.price;
                    return (
                      <div
                        key={wrap.id}
                        onClick={() => setSelectedWrap(wrap)}
                        className={`cursor-pointer rounded-xl p-3 border transition-all flex items-center gap-3 ${
                          isSelected
                            ? "border-[#214332] bg-[#EEF3F0] shadow-xs"
                            : "border-[#E7E3DC] hover:border-stone-400 bg-white"
                        }`}
                      >
                        <img
                          src={wrap.images[0]}
                          alt={wrap.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-[#18221D] truncate">
                            {wrap.title}
                          </h5>
                          <span className="text-xs font-bold text-[#214332]">
                            +{formatPrice(price)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Handwritten Greeting Note */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#214332] block">
                  Complimentary Calligraphy Greeting Note (Optional)
                </label>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Write your custom message here (e.g. 'Dear Ananya, Happy 25th Birthday! Wishing you warmth, joy and love.')"
                  rows={3}
                  className="w-full rounded-2xl border border-[#E7E3DC] p-3.5 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#214332]/20 focus:border-[#214332] bg-[#FAF8F5]"
                />
                <p className="text-[11px] text-stone-500">
                  Our scribe will write this note with archival black ink on deckle-edge cotton paper and seal it with authentic wax.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Live Hamper Summary & Add to Cart Sticky Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E3DC] shadow-lg space-y-5">
              <div className="border-b border-[#E7E3DC] pb-4 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DC9924] block">
                  LIVE HAMPER PREVIEW
                </span>
                <h3 className="font-logo text-2xl font-semibold text-[#18221D]">
                  Hamper Box Summary
                </h3>
                <p className="text-xs text-stone-500">
                  {totalItemCount} items across {uniqueCategories.length} categories
                </p>
              </div>

              {/* Base Container Preview */}
              {selectedBase && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC]">
                  <img
                    src={selectedBase.images[0]}
                    alt={selectedBase.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-bold text-[#DC9924] block">
                      CONTAINER
                    </span>
                    <h5 className="text-xs font-semibold text-[#18221D] truncate">
                      {selectedBase.title}
                    </h5>
                    <span className="text-xs font-bold text-[#214332]">
                      {formatPrice(selectedBase.salePrice || selectedBase.price)}
                    </span>
                  </div>
                </div>
              )}

              {/* Items in Hamper */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {selectedProductList.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
                    No gifts added yet. Choose items in Step 2 to fill your Hamper Box!
                  </div>
                ) : (
                  selectedProductList.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 text-xs border border-stone-100"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="text-[9px] uppercase font-bold text-stone-500 block truncate">
                          {product.category.replace("-", " ")}
                        </span>
                        <div className="font-semibold text-stone-900 truncate">
                          {product.title}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#214332]">
                          {quantity} &times; {formatPrice(product.salePrice || product.price)}
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Extra Ribbon & Wrap */}
                {selectedRibbon && (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 text-xs border border-stone-100">
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-bold text-stone-500 block">
                        RIBBON WRAP
                      </span>
                      <div className="font-semibold text-stone-900 truncate">
                        {selectedRibbon.title}
                      </div>
                    </div>
                    <span className="font-bold text-[#214332]">
                      {formatPrice(selectedRibbon.salePrice || selectedRibbon.price)}
                    </span>
                  </div>
                )}

                {selectedWrap && (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 text-xs border border-stone-100">
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-bold text-stone-500 block">
                        BOUQUET WRAP
                      </span>
                      <div className="font-semibold text-stone-900 truncate">
                        {selectedWrap.title}
                      </div>
                    </div>
                    <span className="font-bold text-[#214332]">
                      {formatPrice(selectedWrap.salePrice || selectedWrap.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Gift Card Notice */}
              {giftNote.trim() && (
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-amber-200/80 text-[11px] text-stone-700">
                  <span className="font-bold text-stone-900 block mb-0.5">Custom Card Message:</span>
                  <p className="italic text-stone-600 line-clamp-2">&ldquo;{giftNote.trim()}&rdquo;</p>
                </div>
              )}

              {/* Price Calculation & Checkout */}
              <div className="pt-4 border-t border-[#E7E3DC] space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-stone-600 font-subtext">Total Hamper Price</span>
                  <span className="font-primary text-2xl font-bold text-[#214332]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddHamperToCart}
                  className="w-full py-4 rounded-full bg-[#214332] hover:bg-[#162f23] text-white text-xs sm:text-sm font-primary uppercase tracking-wider font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complete Hamper to Bag</span>
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  Includes complimentary pinewood padding, wax seal stamping &amp; safety packaging.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
