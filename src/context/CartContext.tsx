"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  discount: number;
  discountCode: string;
  applyDiscountCode: (code: string) => boolean;
  total: number;
  totalItems: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { toast } = useToast();

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("velora_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // Fallback
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("velora_cart", JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, quantity: number = 1, selectedColor?: string) => {
    setCart((prev) => {
      const colorToUse = selectedColor || product.colors[0]?.name || "Default";
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === colorToUse
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${colorToUse}-${Date.now()}`,
          product,
          quantity,
          selectedColor: colorToUse,
        };
        return [...prev, newItem];
      }
    });

    toast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      toast(`Removed "${item.product.name}" from cart`, "info");
    }
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyDiscountCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "VELORA10") {
      setDiscountCode("VELORA10");
      setDiscountPercent(10);
      toast("Coupon VELORA10 applied! 10% off your order.");
      return true;
    } else if (cleanCode === "BLACKOAK") {
      setDiscountCode("BLACKOAK");
      setDiscountPercent(15);
      toast("Heritage Code BLACKOAK applied! 15% off.");
      return true;
    } else {
      toast("Invalid coupon code. Try VELORA10 or BLACKOAK", "error");
      return false;
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Free shipping over ₹50,000; otherwise ₹1,499 flat freight
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 1499;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discount + shipping);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
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
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
