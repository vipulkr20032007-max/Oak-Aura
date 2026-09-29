import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TreePine, Award, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Atelier Heritage & Craft" }]} />

        {/* Hero Banner */}
        <div className="py-12 sm:py-16 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#88624C] block">
            Our Heritage & Purpose
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#231710] tracking-tight">
            Furniture that makes space feel like home.
          </h1>
          <p className="text-base sm:text-lg text-[#736E69] leading-relaxed pt-2">
            Velora Living was founded with a singular conviction: furniture should not be disposable seasonal trends. It should be built to endure lifetimes, gather stories, and age with graceful patina.
          </p>
        </div>

        {/* Large Imagery Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12 border-y border-[#EAE3D9]">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-[#EAE3D9]">
            <Image
              src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal wood joinery workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#88624C]">
              01. The Philosophy of Slowness
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710]">
              Sculpted by Hand, Not Mass Assembly Lines
            </h2>
            <p className="text-sm text-[#413D3A] leading-relaxed">
              Every curve of our Oslo Lounge Chair or Milan Dining Table begins in sustainable timber yards, where master carpenters hand-select each plank for grain continuity and structural resilience.
            </p>
            <p className="text-sm text-[#413D3A] leading-relaxed">
              We reject industrial veneers glued over brittle particle board. By working strictly in solid teak, American walnut, and quarter-sawn white oak, we honor wood as a living material.
            </p>
            <div className="pt-2">
              <span className="font-serif text-lg font-bold text-[#231710] italic">
                &quot;True luxury whispers through the smooth joint of two pieces of timber meeting perfectly.&quot;
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Sustainable Craft */}
        <div className="py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#88624C] block mb-2">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710]">
              The Four Pillars of Velora Living
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TreePine,
                title: "Responsible Forestry",
                desc: "We exclusively purchase FSC-certified timber from government-monitored plantations in Kerala and certified North American reserves.",
              },
              {
                icon: Award,
                title: "Generational Joinery",
                desc: "Traditional mortise, tenon, and dovetail joints distribute structural tension without reliance on synthetic brackets.",
              },
              {
                icon: ShieldCheck,
                title: "Non-Toxic Finishing",
                desc: "Our wood breathes under organic beeswax and cold-pressed linseed oils with zero harmful volatile organic compounds (VOCs).",
              },
              {
                icon: HeartHandshake,
                title: "Artisan Empowerment",
                desc: "We support multigenerational woodcarvers and weavers, providing dignified living wages and safe atelier environments.",
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D9] shadow-xs space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EFE4D6] text-[#88624C] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#231710]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736E69] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Showroom CTA Banner */}
        <div className="rounded-3xl bg-[#231710] text-[#FAF8F5] p-8 sm:p-14 border border-[#332218] flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-[#D8BA9B]">
              Experience First-Hand
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#FFFFFF]">
              Visit Our Indiranagar Flagship Atelier
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CEBF] leading-relaxed">
              Touch the raw wood grains, test cushion densities, and review finish swatches with our bespoke design team over espresso.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-[#BE9A78] hover:bg-[#A27B5C] text-[#231710] font-bold text-sm tracking-wide transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <span>Book Private Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
