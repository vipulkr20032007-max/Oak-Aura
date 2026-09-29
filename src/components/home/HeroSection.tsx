"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-16 lg:py-20 border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE4D6] border border-[#BE9A78]/50 text-[#88624C] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#BE9A78]" />
              <span>Autumn Timber Collection 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#231710] leading-[1.12]">
              Timeless Furniture. <br className="hidden sm:inline" />
              <span className="italic font-light text-[#88624C]">
                Designed for Living.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#736E69] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover thoughtfully crafted furniture that brings warmth, comfort, and character to every space. Hand-turned in solid teak, American walnut, and white oak.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#231710] text-[#FAF8F5] hover:bg-[#332218] text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FFFFFF] border border-[#D8CEBF] text-[#231710] hover:bg-[#F4EFEB] text-sm font-semibold tracking-wide transition-all shadow-xs text-center"
              >
                Explore Categories
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#EAE3D9] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-[#231710]">100%</p>
                <p className="text-xs text-[#736E69] mt-0.5">Solid Plantation Wood</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#231710]">10-Yr</p>
                <p className="text-xs text-[#736E69] mt-0.5">Frame Warranty</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#231710]">Free</p>
                <p className="text-xs text-[#736E69] mt-0.5">White-Glove Setup</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Media Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Media Card with Video / Image Container */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFFFF] bg-[#EAE3D9]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#231710]/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating pill badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#EAE3D9] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#88624C] block">
                      Featured Interior
                    </span>
                    <span className="font-serif text-base font-semibold text-[#231710]">
                      The Verona Lounge Suite
                    </span>
                  </div>
                  <Link
                    href="/shop/verona-3-seater-sofa"
                    className="p-2 rounded-full bg-[#231710] text-[#FAF8F5] hover:bg-[#88624C] transition-colors"
                    aria-label="View Verona Sofa"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Decorative Accent Pill on Top Right */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#FFFFFF] border border-[#EAE3D9] p-3 rounded-2xl shadow-lg items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E4F0EC] flex items-center justify-center text-[#266E56]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#231710]">Master Artisan Made</p>
                  <p className="text-[11px] text-[#736E69]">Hand-Finished with Natural Wax</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
