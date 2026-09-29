import React from "react";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";

export function PromotionalBanner() {
  return (
    <section className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#231710] text-[#FAF8F5] p-8 sm:p-12 lg:p-16 border border-[#332218] shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#332218] border border-[#4A3326] text-[#D8BA9B] text-xs font-semibold uppercase tracking-widest">
              <Tag className="w-3.5 h-3.5 text-[#BE9A78]" />
              <span>Complimentary Living Room Consultation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FFFFFF]">
              Bring Natural Warmth to Every Corner.
            </h2>
            <p className="text-sm sm:text-base text-[#D8CEBF] leading-relaxed">
              Book a bespoke interior consultation with our in-house furniture architects. We assist with custom dimensions, fabric swatches, and timber tone harmonizing for your residence.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[#BE9A78] hover:bg-[#A27B5C] text-[#231710] font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Book Atelier Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-6 py-3.5 rounded-xl bg-transparent border border-[#4A3326] hover:bg-[#332218] text-[#FAF8F5] font-semibold text-xs sm:text-sm tracking-wide transition-colors"
              >
                Read Atelier Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
