"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Search,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAdmin, toggleRole, logout } = useAuth();

  // Scroll effect for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#231710] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#332218]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="hidden sm:block text-[#D8BA9B] tracking-wider uppercase text-[11px] font-medium">
            Handcrafted Solid Wood • White-Glove Installation Nationwide
          </p>
          <p className="text-center sm:text-right w-full sm:w-auto text-[11px] text-[#EFE4D6]">
            Special Festive Invitation: Use code{" "}
            <span className="font-bold text-[#FFFFFF] underline decoration-[#BE9A78]">
              VELORA10
            </span>{" "}
            for 10% off
          </p>
          {/* Quick Admin Switcher Button */}
          <button
            onClick={toggleRole}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider transition-all bg-[#332218] hover:bg-[#88624C] text-[#FAF8F5] border border-[#4A3326]"
            title="Toggle between customer and admin views for easy demo"
          >
            <ShieldCheck className="w-3 h-3 text-[#266E56]" />
            <span>Mode: {isAdmin ? "Admin" : "Customer"}</span>
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EAE3D9]"
            : "bg-[#FAF8F5] border-b border-[#EAE3D9]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#231710] hover:bg-[#F4EFEB] rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Brand Logo & Wordmark */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#D8CEBF] bg-[#FFFFFF] flex items-center justify-center shadow-xs">
                  <Image
                    src="/logo.png"
                    alt="Velora Living Black Oak Logo"
                    fill
                    className="object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                    sizes="44px"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#231710] uppercase">
                    VELORA LIVING
                  </span>
                  <span className="text-[9px] tracking-[0.25em] text-[#88624C] uppercase font-semibold">
                    Black Oak Atelier
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm tracking-wide font-medium transition-colors relative py-1 ${
                      isActive
                        ? "text-[#231710] font-semibold"
                        : "text-[#413D3A] hover:text-[#231710]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#88624C] rounded-full animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons: Search, Wishlist, Account, Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#413D3A] hover:text-[#231710] hover:bg-[#F4EFEB] rounded-full transition-colors"
                aria-label="Search furniture catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link with counter */}
              <Link
                href="/wishlist"
                className="relative p-2 text-[#413D3A] hover:text-[#231710] hover:bg-[#F4EFEB] rounded-full transition-colors"
                aria-label={`Wishlist with ${totalWishlist} items`}
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#88624C] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-2 text-[#413D3A] hover:text-[#231710] hover:bg-[#F4EFEB] rounded-full transition-colors"
                  aria-label="User account menu"
                >
                  <UserIcon className="w-5 h-5" />
                  <ChevronDown className="w-3.5 h-3.5 hidden sm:block text-[#9C9690]" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#FFFFFF] border border-[#EAE3D9] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-[#F4EFEB]">
                          <p className="text-xs text-[#9C9690]">Signed in as</p>
                          <p className="text-sm font-semibold text-[#231710] truncate">
                            {user.name}
                          </p>
                          <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EFE4D6] text-[#88624C]">
                            {user.role}
                          </span>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-[#413D3A] hover:bg-[#FAF8F5] hover:text-[#231710]"
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-[#413D3A] hover:bg-[#FAF8F5] hover:text-[#231710]"
                        >
                          My Orders
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm font-semibold text-[#266E56] hover:bg-[#E4F0EC]"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <div className="border-t border-[#F4EFEB] my-1" />
                        <button
                          onClick={toggleRole}
                          className="w-full text-left px-4 py-2 text-xs text-[#88624C] hover:bg-[#FAF8F5] font-medium"
                        >
                          Switch Role ({user.role === "admin" ? "Customer" : "Admin"})
                        </button>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-[#C2410C] hover:bg-[#F4EFEB] flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm font-semibold text-[#231710] hover:bg-[#FAF8F5]"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          className="block px-4 py-2 text-sm text-[#413D3A] hover:bg-[#FAF8F5]"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Shopping Bag / Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2.5 bg-[#231710] text-[#FAF8F5] hover:bg-[#332218] rounded-full transition-all duration-300 shadow-sm flex items-center justify-center"
                aria-label={`Open shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#BE9A78] text-[#231710] text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF8F5] animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE3D9] bg-[#FAF8F5] px-6 py-6 animate-in slide-in-from-top duration-300 shadow-xl">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-serif font-medium text-[#231710] py-1 border-b border-[#EAE3D9]/60"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/orders"
                  className="text-sm font-medium text-[#413D3A] py-1"
                >
                  Track My Orders
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-[#413D3A] py-1"
                >
                  My Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm font-bold text-[#266E56] py-1"
                  >
                    Go to Admin Portal →
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-[#191716]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#FFFFFF] border border-[#EAE3D9] rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-5 h-5 text-[#88624C]" />
                <input
                  type="text"
                  placeholder="Search dining tables, bouclé sofas, walnut lounge chairs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base sm:text-lg bg-transparent text-[#231710] placeholder:text-[#9C9690] focus:outline-none"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      setIsSearchOpen(false);
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-[#F4EFEB] rounded-full text-[#736E69]"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-4">
              <p className="text-xs uppercase tracking-wider text-[#9C9690] font-semibold mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Verona Sofa",
                  "Oslo Lounge Chair",
                  "Solid Teak Dining",
                  "Oak Coffee Table",
                  "Aria Platform Bed",
                  "Valencia Sideboard",
                ].map((term) => (
                  <Link
                    key={term}
                    href={`/shop?search=${encodeURIComponent(term)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="px-3 py-1.5 rounded-full text-xs bg-[#FAF8F5] border border-[#EAE3D9] hover:border-[#88624C] hover:text-[#231710] text-[#413D3A] transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer instance */}
      <CartDrawer />
    </>
  );
}
