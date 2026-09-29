import React from "react";
import { TreePine, ShieldCheck, Truck, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: TreePine,
      title: "100% Solid Plantation Wood",
      description: "We work exclusively with certified plantation teak, American walnut, and white oak. Never veneer-over-particle-board.",
    },
    {
      icon: Sparkles,
      title: "Traditional Joinery",
      description: "Mortise-and-tenon and dovetail joinery eliminate squeaks, allowing the natural wood to breathe gracefully through seasons.",
    },
    {
      icon: ShieldCheck,
      title: "10-Year Structural Warranty",
      description: "Every joint and frame is engineered to endure generations of gatherings, backed by comprehensive warranty coverage.",
    },
    {
      icon: Truck,
      title: "White-Glove Installation",
      description: "Trained carpenters deliver, unbox, place, and inspect your pieces inside your room of choice across 40+ Indian cities.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#88624C] block mb-2">
            The Atelier Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
            Why Discerning Homes Choose Velora
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EFE4D6] text-[#88624C] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#231710] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736E69] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
