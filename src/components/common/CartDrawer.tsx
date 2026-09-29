"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 50000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountRemainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#191716]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EAE3D9] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#332218]" />
              <h2 className="font-serif text-2xl font-medium tracking-tight text-[#231710]">
                Your Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 hover:bg-[#F4EFEB] rounded-full text-[#736E69] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress indicator */}
          <div className="p-4 bg-[#F4EFEB] border-b border-[#EAE3D9] text-xs">
            {amountRemainingForFreeShipping === 0 ? (
              <p className="font-medium text-[#266E56] text-center">
                ✨ Congratulations! You unlocked complimentary white-glove delivery.
              </p>
            ) : (
              <div>
                <p className="text-[#413D3A] text-center mb-2">
                  Add <span className="font-semibold text-[#231710]">{formatINR(amountRemainingForFreeShipping)}</span> more for free freight delivery.
                </p>
                <div className="w-full bg-[#EAE3D9] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#266E56] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFE4D6] flex items-center justify-center text-[#88624C] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#231710]">
                  Your bag is currently empty
                </h3>
                <p className="text-sm text-[#736E69] mt-1 mb-6 max-w-xs">
                  Discover heirloom handcrafted dining tables, lounge chairs, and organic bouclé sofas.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-2.5 bg-[#231710] text-[#FAF8F5] text-sm font-medium rounded-lg hover:bg-[#332218] transition-colors"
                >
                  <Link href="/shop">Explore Collection</Link>
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#FFFFFF] rounded-xl border border-[#EAE3D9] shadow-xs"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F4EFEB] shrink-0">
                    <Image
                      src={item.product.mainImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-serif text-base font-medium text-[#231710] hover:text-[#88624C] transition-colors truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9C9690] hover:text-[#C2410C] p-1 transition-colors"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#736E69]">
                        {item.selectedColor} • {item.product.material}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D8CEBF] rounded-md bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#EAE3D9] text-[#413D3A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#231710]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#EAE3D9] text-[#413D3A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#231710]">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EAE3D9] bg-[#FFFFFF] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#736E69]">Estimated Subtotal</span>
                <span className="font-semibold text-lg text-[#231710]">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="text-xs text-[#9C9690]">
                Taxes and delivery calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-3 px-4 rounded-lg border border-[#332218] text-[#332218] text-center text-sm font-semibold hover:bg-[#F4EFEB] transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-3 px-4 rounded-lg bg-[#231710] text-[#FAF8F5] text-center text-sm font-semibold hover:bg-[#332218] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
