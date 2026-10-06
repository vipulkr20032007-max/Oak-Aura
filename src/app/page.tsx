"use client";

import React, { useRef } from "react";
import { ScrollCanvas } from "@/components/scroll-experience/ScrollCanvas";
import { ShoppingGatewaySection } from "@/components/scroll-experience/ShoppingGatewaySection";

export default function FirstWebpage() {
  const handleScrollToShop = () => {
    const portal = document.getElementById("shopping-portal-section");
    if (portal) {
      portal.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#090807] text-[#FAF8F5] selection:bg-[#BE9A78] selection:text-[#231710]">
      {/* 360° Scroll Animation Canvas Experience */}
      <ScrollCanvas onScrollToShop={handleScrollToShop} />

      {/* Grand Bottom Section: Gateway to Main Website & Shopping */}
      <ShoppingGatewaySection />
    </main>
  );
}
