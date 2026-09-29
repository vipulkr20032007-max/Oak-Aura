"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "./CartContext";

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product) => void;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("velora_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("velora_wishlist", JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist, isInitialized]);

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast(`Removed "${product.name}" from your wishlist`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      toast(`Saved "${product.name}" to your wishlist`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const item = wishlist.find((i) => i.id === productId);
    setWishlist((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      toast(`Removed "${item.name}" from wishlist`, "info");
    }
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCart,
        totalWishlist: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
