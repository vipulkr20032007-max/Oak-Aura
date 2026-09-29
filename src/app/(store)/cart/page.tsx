"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    discount,
    discountCode,
    applyDiscountCode,
    total,
    totalItems,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyDiscountCode(inputCoupon);
    setInputCoupon("");
  };

  const freeShippingThreshold = 50000;
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

        <div className="py-6 border-b border-[#EAE3D9] flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
              Your Shopping Bag
            </h1>
            <p className="text-sm text-[#736E69] mt-1">
              {totalItems} {totalItems === 1 ? "piece" : "pieces"} selected for your residence
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#9C9690] hover:text-[#C2410C] underline font-medium"
            >
              Clear Bag
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#EFE4D6] flex items-center justify-center text-[#88624C] mx-auto mb-6">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-[#231710] mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-sm text-[#736E69] mb-8 leading-relaxed">
              Explore our handcrafted collections of bouclé sofas, solid oak dining tables, and artisanal lounge chairs.
            </p>
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl bg-[#231710] text-[#FAF8F5] hover:bg-[#332218] text-sm font-semibold tracking-wide shadow-md transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 pb-16">
            
            {/* Left 8 Cols: Line Items */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free delivery notification */}
              <div className="p-4 bg-[#FFFFFF] border border-[#EAE3D9] rounded-2xl shadow-xs">
                {amountNeeded === 0 ? (
                  <p className="text-xs sm:text-sm font-semibold text-[#266E56] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Complimentary White-Glove Placement unlocked for this order!</span>
                  </p>
                ) : (
                  <div>
                    <p className="text-xs sm:text-sm text-[#413D3A] mb-2">
                      Add <span className="font-bold text-[#231710]">{formatINR(amountNeeded)}</span> more to qualify for complimentary freight delivery.
                    </p>
                    <div className="w-full bg-[#F4EFEB] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#266E56] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="bg-[#FFFFFF] border border-[#EAE3D9] rounded-2xl shadow-xs divide-y divide-[#F4EFEB] overflow-hidden">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-[#EAE3D9]">
                        <Image
                          src={item.product.mainImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] uppercase font-bold tracking-wider text-[#88624C]">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-serif text-lg font-medium text-[#231710] hover:text-[#88624C] transition-colors block line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-[#736E69]">
                          Finish: <span className="font-medium text-[#231710]">{item.selectedColor}</span> • {item.product.material}
                        </p>
                        <p className="text-xs font-semibold text-[#231710] sm:hidden pt-1">
                          {formatINR(item.product.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F4EFEB]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D8CEBF] rounded-lg bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#413D3A] hover:bg-[#EAE3D9] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#231710]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#413D3A] hover:bg-[#EAE3D9] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for this row */}
                      <div className="text-right min-w-[90px]">
                        <span className="font-semibold text-base text-[#231710] block">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-[#9C9690] hidden sm:block">
                            ({formatINR(item.product.price)} ea)
                          </span>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-[#9C9690] hover:text-[#C2410C] rounded-lg hover:bg-[#F4EFEB] transition-colors"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/shop"
                  className="text-xs sm:text-sm font-semibold text-[#88624C] hover:text-[#231710] flex items-center gap-1.5"
                >
                  <span>← Continue Exploring Collection</span>
                </Link>
              </div>
            </div>

            {/* Right 4 Cols: Order Summary Receipt */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-5">
                <h2 className="font-serif text-xl font-bold text-[#231710] pb-3 border-b border-[#F4EFEB]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-[#413D3A]">
                  <div className="flex justify-between">
                    <span className="text-[#736E69]">Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-[#231710]">{formatINR(subtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#736E69]">Freight & Placement</span>
                    <span className="font-semibold text-[#231710]">
                      {shipping === 0 ? (
                        <span className="text-[#266E56] font-bold">FREE</span>
                      ) : (
                        formatINR(shipping)
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-[#266E56]">
                      <span>Promotion Discount ({discountCode})</span>
                      <span className="font-semibold">-{formatINR(discount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#F4EFEB] flex justify-between items-baseline">
                    <span className="font-serif text-lg font-bold text-[#231710]">Total (INR)</span>
                    <span className="font-serif text-2xl font-bold text-[#231710]">
                      {formatINR(total)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9C9690]">
                    GST of 18% included where applicable.
                  </p>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#88624C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. VELORA10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBF] rounded-lg uppercase tracking-wider text-[#231710] focus:outline-none focus:border-[#88624C]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FAF8F5] border border-[#D8CEBF] hover:bg-[#231710] hover:text-[#FAF8F5] text-xs font-semibold rounded-lg text-[#231710] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#736E69]">
                  <ShieldCheck className="w-4 h-4 text-[#266E56]" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
