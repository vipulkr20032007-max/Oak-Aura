"use client";

import React from "react";
import { Sparkles, Layers, ShieldCheck, ArrowDown } from "lucide-react";

interface ScrollOverlaysProps {
  progress: number; // 0.0 to 1.0
  currentFrame: number; // 1 to 240
}

export function ScrollOverlays({ progress, currentFrame }: ScrollOverlaysProps) {
  // Helper to compute opacity and translate based on progress window with smooth fade in/out
  const getPhaseStyle = (start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    let translateY = 20;

    if (progress >= start && progress <= end) {
      if (progress < peakStart) {
        // Fade in
        const t = (progress - start) / (peakStart - start);
        opacity = t;
        translateY = 20 * (1 - t);
      } else if (progress <= peakEnd) {
        // Fully visible
        opacity = 1;
        translateY = 0;
      } else {
        // Fade out
        const t = (progress - peakEnd) / (end - peakEnd);
        opacity = 1 - t;
        translateY = -20 * t;
      }
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.3 ? ("auto" as const) : ("none" as const),
      transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
    };
  };

  // Phase 1: Intro (0% - 18%)
  const phase1Style = getPhaseStyle(0.0, 0.03, 0.12, 0.19);
  // Phase 2: Headboard (22% - 42%)
  const phase2Style = getPhaseStyle(0.21, 0.26, 0.38, 0.43);
  // Phase 3: Gold Accents & Bedding (45% - 66%)
  const phase3Style = getPhaseStyle(0.45, 0.50, 0.62, 0.67);
  // Phase 4: Bespoke Base (69% - 87%)
  const phase4Style = getPhaseStyle(0.69, 0.74, 0.84, 0.88);
  // Phase 5: Final Reveal (89% - 100%)
  const phase5Style = getPhaseStyle(0.89, 0.93, 1.0, 1.0);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 md:p-16">
      
      {/* PHASE 1: Hero Welcome (0% - 18%) */}
      <div
        style={phase1Style}
        className="absolute top-28 sm:top-36 left-6 sm:left-12 md:left-20 max-w-xl text-left pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5]/10 backdrop-blur-md border border-[#FAF8F5]/15 text-[#D8BA9B] text-xs uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#BE9A78]" />
          <span>The Atelier Series • 2026</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF8F5] leading-[1.05] drop-shadow-md">
          THE OBSIDIAN <br />
          <span className="italic font-light text-[#D8BA9B]">NOIR</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#D8CEBF] max-w-md leading-relaxed font-sans font-light drop-shadow">
          Sculptural brutalist geometry meets cocooning Parisian luxury. Hand-crafted in smoked black oak, channel-tufted velvet, and brushed 24K gold accents.
        </p>

        <div className="mt-8 flex items-center gap-4 text-xs tracking-wider uppercase text-[#BE9A78]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BE9A78] animate-ping" />
            Interactive 360° Orbit
          </span>
          <span className="text-[#664736]">•</span>
          <span className="flex items-center gap-1.5 text-[#D8CEBF]">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            Scroll to reveal architecture
          </span>
        </div>
      </div>

      {/* PHASE 2: Headboard (22% - 42%) */}
      <div
        style={phase2Style}
        className="absolute top-28 sm:top-36 right-6 sm:right-12 md:right-20 max-w-lg text-right pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000000]/60 backdrop-blur-md border border-[#D8BA9B]/30 text-[#D8BA9B] text-xs uppercase tracking-[0.25em] mb-4">
          <Layers className="w-3.5 h-3.5 text-[#BE9A78]" />
          <span>01 / Architectural Silhouette</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F5] leading-tight">
          Oversized Fluted <br />
          <span className="italic font-light text-[#D8BA9B]">Velvet Headboard</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#D8CEBF] leading-relaxed font-light drop-shadow">
          Commanding vertical channel-tufting in deep matte black velvet. Sculptural backdrop engineered for acoustic warmth, plush head support, and monumental bedroom presence.
        </p>

        <div className="mt-5 flex items-center justify-end flex-wrap gap-2">
          {["140cm Monumental Height", "Acoustic Softening", "Triple-Density Memory Foam"].map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[#231710]/80 text-[#EFE4D6] border border-[#88624C]/40 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* PHASE 3: Gold Inlays & Textiles (45% - 66%) */}
      <div
        style={phase3Style}
        className="absolute bottom-28 sm:bottom-32 left-6 sm:left-12 md:left-20 max-w-lg text-left pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000000]/60 backdrop-blur-md border border-[#D8BA9B]/30 text-[#D8BA9B] text-xs uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#BE9A78]" />
          <span>02 & 03 / Bespoke Trims & Silk</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F5] leading-tight">
          Hand-Brushed <br />
          <span className="italic font-light text-[#D8BA9B]">Gold Embroidery</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#D8CEBF] leading-relaxed font-light drop-shadow">
          Layered with high-thread Egyptian cotton and obsidian silk. Sophisticated gold embroidery and perimeter metallic trims that catch the warm glow of ambient evening lighting.
        </p>

        <div className="mt-5 flex items-center flex-wrap gap-2">
          {["24K Champagne Gold Trims", "800-TC Egyptian Sateen", "Obsidian Silk Throw"].map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[#231710]/80 text-[#EFE4D6] border border-[#88624C]/40 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* PHASE 4: Bespoke Base (69% - 87%) */}
      <div
        style={phase4Style}
        className="absolute top-28 sm:top-36 right-6 sm:right-12 md:right-20 max-w-lg text-right pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000000]/60 backdrop-blur-md border border-[#D8BA9B]/30 text-[#D8BA9B] text-xs uppercase tracking-[0.25em] mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#BE9A78]" />
          <span>04 / Foundation Engineering</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F5] leading-tight">
          Bespoke Tailored <br />
          <span className="italic font-light text-[#D8BA9B]">Plinth Base</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#D8CEBF] leading-relaxed font-light drop-shadow">
          A low-profile heavily cushioned architectural base featuring traditional mortise-and-tenon joinery, concealed steel reinforcement, and integrated ventilation channels.
        </p>

        <div className="mt-5 flex items-center justify-end flex-wrap gap-2">
          {["Solid Smoked Oak Plinth", "Silent Slat Foundation", "15-Year Structural Frame"].map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[#231710]/80 text-[#EFE4D6] border border-[#88624C]/40 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* PHASE 5: Masterpiece Complete (89% - 100%) */}
      <div
        style={phase5Style}
        className="absolute inset-x-0 bottom-24 sm:bottom-28 mx-auto max-w-xl text-center pointer-events-none px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000000]/70 backdrop-blur-md border border-[#D8BA9B]/40 text-[#D8BA9B] text-xs uppercase tracking-[0.25em] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#BE9A78]" />
          <span>360° Architecture Complete</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F5] leading-tight">
          Ready to Step Inside?
        </h2>

        <p className="mt-2 text-sm text-[#D8CEBF] max-w-md mx-auto font-light drop-shadow">
          Scroll down to enter the shopping atelier and explore handcrafted collections for your home.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs tracking-widest text-[#D8BA9B] uppercase font-semibold">
          <span>Continue scrolling for shop portal</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#D8BA9B]" />
        </div>
      </div>

      {/* Floating Bottom Center Frame Pill Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#090807]/80 backdrop-blur-md border border-[#D8BA9B]/20 text-[11px] text-[#FAF8F5]/80 font-mono tracking-wider shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#D8BA9B] animate-pulse" />
        <span className="text-[#D8BA9B] font-semibold">FRAME {String(currentFrame).padStart(3, "0")} / 240</span>
        <span className="text-[#736E69]">•</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>

    </div>
  );
}
