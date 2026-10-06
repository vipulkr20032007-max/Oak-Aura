"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin, Globe, Share2, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast("Please enter a valid email address.", "error");
      return;
    }
    toast("Thank you for subscribing to Velora Living Gazette.");
    setEmail("");
  };

  return (
    <footer className="bg-[#231710] text-[#FAF8F5] border-t border-[#332218] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#332218]">
          
          {/* Col 1: Brand & Craftsmanship */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/home" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#88624C] bg-[#FFFFFF] flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Velora Living Logo"
                  fill
                  className="object-cover scale-110"
                  sizes="40px"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-widest text-[#FAF8F5] uppercase block">
                  VELORA LIVING
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#D8BA9B] uppercase font-semibold">
                  Black Oak Atelier • Est. 2026
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#D8CEBF] max-w-sm leading-relaxed pt-2">
              &quot;Furniture that makes space feel like home.&quot; Rooted in Scandinavian restraint and timeless Japanese woodworking, we build heirloom furniture using ethically sourced solid plantation teak, American walnut, and white oak.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#D8BA9B]">
              <a href="#" className="p-2 rounded-full bg-[#332218] hover:bg-[#88624C] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-[#332218] hover:bg-[#88624C] transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#332218] hover:bg-[#88624C] transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: The Collections */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-[#FAF8F5] uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D8CEBF]">
              <li>
                <Link href="/shop?category=Sofas" className="hover:text-[#FFFFFF] transition-colors">
                  Living & Sofas
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Chairs" className="hover:text-[#FFFFFF] transition-colors">
                  Lounge Chairs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Tables" className="hover:text-[#FFFFFF] transition-colors">
                  Solid Oak Tables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Beds" className="hover:text-[#FFFFFF] transition-colors">
                  Platform Beds
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Dining" className="hover:text-[#FFFFFF] transition-colors">
                  Dining Suites
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Storage" className="hover:text-[#FFFFFF] transition-colors">
                  Fluted Credenzas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Care */}
          <div>
            <h4 className="font-serif text-base font-semibold tracking-wider text-[#FAF8F5] uppercase mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D8CEBF]">
              <li>
                <Link href="/about" className="hover:text-[#FFFFFF] transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#FFFFFF] transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFFFFF] transition-colors">
                  Book Showroom Visit
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#FFFFFF] transition-colors">
                  Client Concierge
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#FFFFFF] transition-colors">
                  Order Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Concierge */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold tracking-wider text-[#FAF8F5] uppercase mb-2">
              Atelier Gazette
            </h4>
            <p className="text-xs text-[#D8CEBF] leading-relaxed">
              Receive private preview invitations for limited seasonal wood runs and architectural interior showcases.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2.5 px-3.5 pr-10 text-xs bg-[#332218] border border-[#4A3326] rounded-lg text-[#FAF8F5] placeholder:text-[#9C9690] focus:outline-none focus:border-[#BE9A78]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 text-[#D8BA9B] hover:text-[#FFFFFF] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="pt-2 space-y-1.5 text-xs text-[#9C9690]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8BA9B] shrink-0" />
                <span>Indiranagar Showroom, Bengaluru 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8BA9B] shrink-0" />
                <span>+91 (080) 4122 8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D8BA9B] shrink-0" />
                <span>concierge@veloraliving.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C9690]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#266E56]" />
            <span>FSC® 100% Certified Sustainable Timber • 10-Year Structural Warranty</span>
          </div>
          <p>© {new Date().getFullYear()} VELORA LIVING (Project 12611937). Handcrafted with pride.</p>
          <div className="flex gap-4">
            <span className="text-[#D8BA9B]">UPI</span>
            <span className="text-[#D8BA9B]">Visa</span>
            <span className="text-[#D8BA9B]">Mastercard</span>
            <span className="text-[#D8BA9B]">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
