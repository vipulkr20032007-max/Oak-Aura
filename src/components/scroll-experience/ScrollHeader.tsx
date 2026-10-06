"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX, Play, Pause, ArrowRight, Compass } from "lucide-react";
import { ambientSound } from "./ScrollAudio";

interface ScrollHeaderProps {
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  progress: number;
}

export function ScrollHeader({
  isAutoplay,
  onToggleAutoplay,
  progress,
}: ScrollHeaderProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleToggleAudio = () => {
    if (ambientSound) {
      const active = ambientSound.toggle();
      setIsAudioActive(active);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between pointer-events-none">
      
      {/* Brand Identity */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#D8BA9B]/40 bg-[#090807]/90 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:border-[#D8BA9B] transition-colors">
            <Image
              src="/logo.png"
              alt="Velora Living Logo"
              fill
              className="object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
              sizes="44px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-[#FAF8F5] uppercase leading-none drop-shadow">
              VELORA LIVING
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#D8BA9B] uppercase font-semibold mt-1 drop-shadow">
              360° Architectural Reveal
            </span>
          </div>
        </Link>
      </div>

      {/* Floating Center Badge (Desktop) */}
      <div className="hidden md:flex items-center gap-2 pointer-events-auto px-4 py-1.5 rounded-full bg-[#090807]/70 backdrop-blur-md border border-[#D8BA9B]/20 shadow-md">
        <Compass className="w-3.5 h-3.5 text-[#D8BA9B] animate-spin" style={{ animationDuration: "12s" }} />
        <span className="text-xs uppercase tracking-widest text-[#EFE4D6]">
          The Obsidian Noir Edition
        </span>
      </div>

      {/* Controls: Audio Toggle, Autoplay Toggle & Skip to Store */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        
        {/* Ambient Audio Toggle */}
        <button
          onClick={handleToggleAudio}
          className={`p-2.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
            isAudioActive
              ? "bg-[#D8BA9B] text-[#231710] border-[#D8BA9B] shadow-[0_0_20px_rgba(216,186,155,0.4)]"
              : "bg-[#090807]/70 text-[#EFE4D6] border-[#D8BA9B]/20 hover:border-[#D8BA9B]/60"
          }`}
          title={isAudioActive ? "Mute ambient atmosphere" : "Play ambient gallery audio"}
          aria-label="Toggle ambient gallery audio"
        >
          {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* 360 Auto-Orbit Toggle */}
        <button
          onClick={onToggleAutoplay}
          className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-md text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
            isAutoplay
              ? "bg-[#D8BA9B] text-[#231710] border-[#D8BA9B] shadow-[0_0_20px_rgba(216,186,155,0.4)]"
              : "bg-[#090807]/70 text-[#EFE4D6] border-[#D8BA9B]/20 hover:border-[#D8BA9B]/60"
          }`}
          title={isAutoplay ? "Pause 360 rotation" : "Auto-orbit 360 preview"}
        >
          {isAutoplay ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Orbit</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Auto 360°</span>
            </>
          )}
        </button>

        {/* Direct Link to Store */}
        <Link
          id="skip-to-shop-btn"
          href="/home"
          className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D8BA9B] to-[#BE9A78] text-[#231710] text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg hover:shadow-[0_0_30px_rgba(216,186,155,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span>Enter Store</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>

      {/* Thin Gold Progress Bar at the absolute top of the screen */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#88624C] via-[#D8BA9B] to-[#FAF8F5] transition-all duration-100 ease-out shadow-[0_0_10px_#D8BA9B]"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

    </header>
  );
}
