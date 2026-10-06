"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Compass,
  ChevronRight,
  Star,
  Layers,
} from "lucide-react";

export function ShoppingGatewaySection() {
  const featuredHighlights = [
    {
      title: "The Obsidian Noir Bed",
      category: "Master Bedroom",
      price: "₹1,39,999",
      image: "/frames/ezgif-frame-240.jpg",
      href: "/shop/the-obsidian-noir-bed",
      badge: "Signature Piece",
    },
    {
      title: "Verona 3-Seater Sofa",
      category: "Living Room",
      price: "₹74,999",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      href: "/shop/verona-3-seater-sofa",
      badge: "Best Seller",
    },
    {
      title: "Oslo Lounge Chair",
      category: "Accent Seating",
      price: "₹28,500",
      image: "https://images.unsplash.com/photo-1580481077195-c3a821a5060f?auto=format&fit=crop&w=800&q=80",
      href: "/shop/oslo-lounge-chair",
      badge: "Solid Walnut",
    },
    {
      title: "Haven Coffee Table",
      category: "Sculptural Tables",
      price: "₹24,999",
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80",
      href: "/shop/haven-coffee-table",
      badge: "White Oak",
    },
  ];

  const brandGuarantees = [
    {
      icon: <Truck className="w-6 h-6 text-[#BE9A78]" />,
      title: "Complimentary White Glove Delivery",
      desc: "Delivered into your room of choice, professionally unpacked, and assembled with zero debris left behind.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#BE9A78]" />,
      title: "10-Year Heirloom Warranty",
      desc: "Every solid teak, walnut, and smoked oak joint is guaranteed against structural defect for a decade.",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#BE9A78]" />,
      title: "30-Day In-Home Trial",
      desc: "Live with your piece in your own natural light. If it does not resonate with your sanctuary, we will pick it up.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#BE9A78]" />,
      title: "Bespoke Customization Atelier",
      desc: "Custom dimensions, fabric grade selections, and timber finishes available upon architect request.",
    },
  ];

  return (
    <section
      id="shopping-portal-section"
      className="relative bg-[#0F0D0C] text-[#FAF8F5] pt-28 pb-20 px-4 sm:px-6 lg:px-8 border-t border-[#332218] overflow-hidden"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#88624C]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* SECTION HEADER & PRIMARY CALL TO ACTION */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#332218]/80 border border-[#88624C]/40 text-[#D8BA9B] text-xs font-semibold tracking-[0.25em] uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#BE9A78]" />
            <span>Step Into Velora Living</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF8F5] leading-tight">
            Elevate Your Sanctuary. <br />
            <span className="italic font-light text-[#D8BA9B]">Begin Shopping Now.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8CEBF] font-light leading-relaxed max-w-2xl mx-auto">
            You&apos;ve experienced the 360° architectural craftsmanship of The Obsidian Noir. 
            Now explore our full curated store featuring solid wood dining, sculptural sofas, and artisanal bedroom suites.
          </p>

          {/* THE PROMINENT SHOPPING BUTTON */}
          <div className="pt-6 pb-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              id="move-to-main-website-btn"
              href="/home"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 sm:px-14 py-5 sm:py-6 rounded-full bg-gradient-to-r from-[#D8BA9B] via-[#EFE4D6] to-[#BE9A78] text-[#231710] font-serif text-xl sm:text-2xl font-bold tracking-wide shadow-[0_0_50px_rgba(216,186,155,0.4)] hover:shadow-[0_0_80px_rgba(216,186,155,0.7)] hover:scale-105 active:scale-98 transition-all duration-300"
            >
              <ShoppingBag className="w-6 h-6 text-[#231710]" />
              <span>Move to Main Website for Shopping</span>
              <ArrowRight className="w-6 h-6 text-[#231710] group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          {/* Quick Sub-actions */}
          <div className="flex items-center justify-center flex-wrap gap-4 pt-2 text-xs uppercase tracking-widest text-[#D8BA9B]">
            <Link
              href="/shop"
              className="hover:text-[#FFFFFF] underline underline-offset-4 transition-colors"
            >
              Browse All Products (28+)
            </Link>
            <span className="text-[#4A3326]">•</span>
            <Link
              href="/categories"
              className="hover:text-[#FFFFFF] underline underline-offset-4 transition-colors"
            >
              Explore 8 Categories
            </Link>
            <span className="text-[#4A3326]">•</span>
            <Link
              href="/shop/the-obsidian-noir-bed"
              className="hover:text-[#FFFFFF] underline underline-offset-4 transition-colors text-[#FAF8F5] font-semibold"
            >
              Order The Obsidian Bed →
            </Link>
          </div>
        </div>

        {/* FEATURED SIGNATURE CREATIONS CAROUSEL/GRID */}
        <div className="mt-20 pt-10 border-t border-[#332218]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#BE9A78] font-semibold">
                Curated Highlights
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F5] mt-1">
                Featured From Our Catalog
              </h3>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 text-sm text-[#D8BA9B] hover:text-[#FFFFFF] transition-colors"
            >
              <span>View Full Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHighlights.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group relative bg-[#191716] rounded-2xl overflow-hidden border border-[#332218] hover:border-[#88624C] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#231710]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#090807]/80 text-[#D8BA9B] backdrop-blur-sm border border-[#D8BA9B]/20">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#88624C] block font-medium">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg font-semibold text-[#FAF8F5] group-hover:text-[#D8BA9B] transition-colors mt-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#332218] flex items-center justify-between">
                    <span className="text-base font-bold text-[#D8BA9B]">
                      {item.price}
                    </span>
                    <span className="text-xs text-[#FAF8F5] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Shop <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* BRAND PROMISES & QUALITY PILLARS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#332218]">
          {brandGuarantees.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#191716]/60 border border-[#332218] flex flex-col space-y-3"
            >
              <div className="p-3 rounded-xl bg-[#231710] w-fit border border-[#4A3326]">
                {p.icon}
              </div>
              <h4 className="font-serif text-lg font-bold text-[#FAF8F5]">
                {p.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#D8CEBF] leading-relaxed font-light">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM BRAND FOOTNOTE & DIRECT RETURN LINK */}
        <div className="mt-20 pt-8 border-t border-[#332218] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#88624C]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-base font-bold text-[#FAF8F5] tracking-widest uppercase">
              VELORA LIVING
            </span>
            <span>•</span>
            <span>Handcrafted Solid Wood & Architectural Upholstery</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-[#D8BA9B] hover:text-[#FFFFFF] underline transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay 360° Scroll Animation</span>
            </button>
            <Link
              href="/home"
              className="px-4 py-2 rounded-full bg-[#332218] hover:bg-[#88624C] text-[#FAF8F5] font-semibold transition-colors"
            >
              Enter Store →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
