"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { storeConfig } from "@/config/store.config";
import { useCartStore } from "@/store/useCartStore";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Sparkles,
} from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { formatPrice } from "@/lib/utils";
import { BrandLogo } from "@/components/storefront/BrandLogo";
import { Category } from "@/types/store";
import { categories as defaultCategories } from "@/data/mockData";

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem("bloomcraft_categories");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return defaultCategories;
  });

  const products = useProductStore((s) => s.products);
  const items = useCartStore((s) => s.items);
  const wishlist = useCartStore((s) => s.wishlist);
  const openCart = useCartStore((s) => s.openCart);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    const loadCategories = () => {
      fetch(`/api/categories?t=${Date.now()}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCategoryList(data);
            try {
              sessionStorage.setItem("bloomcraft_categories", JSON.stringify(data));
            } catch (e) {}
          }
        })
        .catch(() => {});
    };

    loadCategories();

    const handleUpdate = (e?: any) => {
      if (e?.detail && Array.isArray(e.detail) && e.detail.length > 0) {
        setCategoryList(e.detail);
      } else {
        loadCategories();
      }
    };

    window.addEventListener("bloomcraft:categories-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("focus", loadCategories);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("bloomcraft:categories-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("focus", loadCategories);
    };
  }, []);

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 4)
    : [];

  const isHomePage = pathname === "/" || pathname === "";
  const isTransparent = mounted && isHomePage && !isScrolled;
  // Dark navigation styling applies only if hero is dark; with Aleena's warm cream editorial hero, light styling applies throughout
  const isDarkNav = false;

  const handleAboutClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("about-us");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCollectionDesktopClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("shop-collection");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`w-full font-primary transition-all duration-300 sticky top-0 z-40 text-[#18221D] ${
          isScrolled
            ? "glass-navbar-scrolled"
            : "glass-navbar shadow-2xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-full text-[#1C1917] hover:bg-black/5 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center flex-shrink-0">
              <BrandLogo
                variant="full"
                showTagline={false}
                theme="light"
              />
            </div>

            {/* Desktop Navigation Links: ONLY Home, Collection, Shop, About Us, Contact Us */}
            <nav className="hidden lg:flex items-center justify-center flex-1 px-4 xl:px-8 gap-6 xl:gap-9 font-primary">
              {/* 1. Home */}
              <Link
                href="/"
                className={`text-xs xl:text-sm font-semibold tracking-[0.14em] uppercase transition-colors whitespace-nowrap py-1.5 ${
                  pathname === "/"
                    ? "text-[#214332] font-bold border-b-2 border-[#214332] pb-0.5"
                    : "text-[#1C1917] hover:text-[#214332]"
                }`}
              >
                Home
              </Link>

              {/* 2. Collection (Dropdown of all categories) */}
              <div className="relative group">
                <Link
                  href="/#shop-collection"
                  onClick={handleCollectionDesktopClick}
                  className={`flex items-center gap-1 text-xs xl:text-sm font-semibold tracking-[0.14em] uppercase transition-colors py-1.5 cursor-pointer whitespace-nowrap ${
                    pathname.startsWith("/products?category")
                      ? "text-[#214332] font-bold border-b-2 border-[#214332] pb-0.5"
                      : "text-[#1C1917] hover:text-[#214332]"
                  }`}
                >
                  <span>Collection</span>
                  <ChevronDown
                    className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200 text-[#786E5E]"
                  />
                </Link>

                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="w-64 max-h-[75vh] overflow-y-auto no-scrollbar bg-white/95 backdrop-blur-2xl border border-stone-200/60 rounded-2xl shadow-2xl p-3 grid grid-cols-1 gap-1 font-primary">
                    <Link
                      href="/products"
                      className="block px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-[#214332] bg-[#EEF3F0] hover:bg-[#E2ECE6] rounded-lg transition-colors"
                    >
                      ✦ View All Catalog
                    </Link>
                    <Link
                      href="/custom-hamper"
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold tracking-wide text-[#DC9924] hover:bg-amber-50/70 rounded-lg transition-colors"
                    >
                      <span>Build Custom Hamper</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                    </Link>
                    <div className="my-1 border-t border-[#E7E3DC]/60" />
                    {categoryList.map((cat) => (
                      <Link
                        key={cat.id || cat.slug}
                        href={`/products?category=${cat.slug}`}
                        className="block px-3 py-1.5 text-xs font-medium tracking-wide text-stone-800 hover:text-[#214332] hover:bg-stone-50/80 rounded-lg transition-colors"
                      >
                        {cat.name.replace(/\s*Collection/gi, "").trim()}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Shop */}
              <Link
                href="/products"
                className={`text-xs xl:text-sm font-semibold tracking-[0.14em] uppercase transition-colors whitespace-nowrap py-1.5 ${
                  pathname === "/products"
                    ? "text-[#214332] font-bold border-b-2 border-[#214332] pb-0.5"
                    : "text-[#1C1917] hover:text-[#214332]"
                }`}
              >
                Shop
              </Link>

              {/* 4. About Us */}
              <Link
                href="/#about-us"
                onClick={handleAboutClick}
                className="text-xs xl:text-sm font-semibold tracking-[0.14em] uppercase transition-colors whitespace-nowrap py-1.5 text-[#1C1917] hover:text-[#214332]"
              >
                About Us
              </Link>

              {/* 5. Contact Us */}
              <Link
                href="/contact"
                className={`text-xs xl:text-sm font-semibold tracking-[0.14em] uppercase transition-colors whitespace-nowrap py-1.5 ${
                  pathname === "/contact"
                    ? "text-[#214332] font-bold border-b-2 border-[#214332] pb-0.5"
                    : "text-[#1C1917] hover:text-[#214332]"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isDarkNav
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-[#EADBBE]/50 text-[#1C1917]"
                }`}
                aria-label="Search products"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* User Account */}
              <Link
                href="/account"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isDarkNav
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-[#EADBBE]/50 text-[#1C1917]"
                }`}
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Wishlist Link */}
              {storeConfig.features.enableWishlist && (
                <Link
                  href="/account?tab=wishlist"
                  className={`w-9 h-9 rounded-full transition-colors relative flex items-center justify-center ${
                    isDarkNav
                      ? "hover:bg-white/10 text-white"
                      : "hover:bg-[#EADBBE]/50 text-[#1C1917]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4" />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-500 text-stone-950 text-[9px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className={`w-9 h-9 rounded-full transition-colors relative flex items-center justify-center ${
                  isDarkNav
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-[#EADBBE]/50 text-[#1C1917]"
                }`}
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {mounted && itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in-75">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Crafto Arte Inspired Minimal Layout) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FAF7F2] shadow-2xl flex flex-col p-5 sm:p-6 z-10 border-r border-[#E7E3DC] animate-in slide-in-from-left duration-300 font-sans">
            {/* Top Bar: [X] Close | Brand Logo | [Search] [Bag] */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E3DC]">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 -ml-1.5 rounded-full text-[#1C1917] hover:bg-black/5 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center">
                <BrandLogo variant="full" showTagline={false} theme="light" />
              </div>

              <div className="flex items-center gap-1 -mr-1.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="p-1.5 rounded-full text-[#1C1917] hover:bg-black/5 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="p-1.5 rounded-full text-[#1C1917] hover:bg-black/5 transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {mounted && itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#214332] text-white text-[9px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center shadow-xs">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Menu Items: Only Home, Collections, About us, Contact */}
            <nav className="flex-1 py-4 space-y-1 overflow-y-auto no-scrollbar font-primary">
              {/* 1. Home */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-3 text-lg font-bold tracking-wide uppercase rounded-xl transition-colors ${
                  pathname === "/"
                    ? "text-[#214332] font-bold bg-[#214332]/5"
                    : "text-[#18221D] hover:text-[#214332] hover:bg-black/5"
                }`}
              >
                Home
              </Link>

              {/* 2. Collections (Accordion: Clicking reveals all categories inside menu bar itself) */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCollectionsOpen((prev) => !prev)}
                  className={`flex items-center justify-between w-full py-3 px-3 text-lg font-bold tracking-wide uppercase rounded-xl transition-colors text-left cursor-pointer ${
                    mobileCollectionsOpen
                      ? "text-[#214332] font-bold bg-[#214332]/5"
                      : "text-[#18221D] hover:text-[#214332] hover:bg-black/5"
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${
                      mobileCollectionsOpen ? "rotate-180 text-[#214332]" : ""
                    }`}
                  />
                </button>

                {mobileCollectionsOpen && (
                  <div className="pl-3 pr-1 py-1 space-y-0.5 my-1 border-l-2 border-[#214332]/30 ml-3 animate-in slide-in-from-top-2 duration-200 font-primary">
                    <Link
                      href="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#214332] bg-[#EEF3F0] rounded-lg hover:bg-[#E2ECE6] transition-colors"
                    >
                      ✦ Shop All Collections
                    </Link>
                    <Link
                      href="/custom-hamper"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 px-3 text-xs sm:text-sm font-semibold tracking-wide text-[#DC9924] hover:bg-amber-50/70 rounded-lg transition-colors"
                    >
                      <span>Build Custom Hamper</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#DC9924]" />
                    </Link>
                    <div className="my-1 border-t border-[#E7E3DC]/60" />
                    {categoryList.map((cat) => (
                      <Link
                        key={cat.id || cat.slug}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-3 text-xs sm:text-sm font-medium tracking-wide text-stone-700 hover:text-[#214332] hover:bg-black/5 rounded-lg transition-colors"
                      >
                        {cat.name.replace(/\s*Collection/gi, "").trim()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. About us */}
              <Link
                href="/#about-us"
                onClick={handleAboutClick}
                className="block py-3 px-3 text-lg font-bold tracking-wide uppercase text-[#18221D] hover:text-[#214332] hover:bg-black/5 rounded-xl transition-colors"
              >
                About us
              </Link>

              {/* 4. Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-3 text-lg font-bold tracking-wide uppercase rounded-xl transition-colors ${
                  pathname === "/contact"
                    ? "text-[#214332] font-bold bg-[#214332]/5"
                    : "text-[#18221D] hover:text-[#214332] hover:bg-black/5"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Bottom Section (Matching user reference screenshot) */}
            <div className="pt-4 border-t border-[#E7E3DC] mt-auto space-y-3 font-subtext">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 text-sm font-medium text-[#18221D] hover:text-[#214332] transition-colors py-1.5 px-3 rounded-xl hover:bg-black/5"
              >
                <User className="w-4 h-4 text-stone-600" />
                <span>Log in / My Account</span>
              </Link>
              <div className="flex items-center justify-between px-3 text-xs text-stone-500 pt-1">
                <span>India (INR ₹)</span>
                <a
                  href={`https://wa.me/${storeConfig.brand.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#214332] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>WhatsApp Concierge</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Quick Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white/92 backdrop-blur-2xl border border-stone-200/60 rounded-2xl w-full max-w-xl p-4 shadow-2xl space-y-4 animate-in fade-in-0 zoom-in-95 font-sans">
            <div className="flex items-center gap-3 border-b border-[#EADBBE] pb-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search hampers, journals, wax seals, stationery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground text-foreground"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Top Results ({searchResults.length})
                </p>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-[#EADBBE]/50">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 py-2.5 hover:bg-[#FAF7F2] px-2 rounded-xl transition-colors group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-lg border border-[#EADBBE]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-foreground truncate group-hover:text-primary">
                            {product.title}
                          </h4>
                          <p className="text-[11px] text-muted-foreground capitalize">
                            {product.category.replace("-", " ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-foreground">
                            {formatPrice(product.salePrice || product.price)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-4 text-center">
                    No gifts or stationery matching &ldquo;{searchQuery}&rdquo;.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
