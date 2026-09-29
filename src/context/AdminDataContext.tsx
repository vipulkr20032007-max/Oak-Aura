"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Order, OrderStatus, Category, Review } from "@/types";
import { mockProducts } from "@/data/mockProducts";
import { mockCategories } from "@/data/mockCategories";
import { mockOrders } from "@/data/mockOrders";
import { mockReviews } from "@/data/mockReviews";
import { useToast } from "@/components/ui/Toast";

interface AdminDataContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  reviews: Review[];
  // Product actions
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // Category actions
  addCategory: (category: Omit<Category, "id" | "productCount">) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  // Order actions
  addOrder: (orderData: Omit<Order, "id" | "date" | "status">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  // Review actions
  addReview: (reviewData: Omit<Review, "id" | "date" | "status">) => void;
  updateReviewStatus: (reviewId: string, status: "Approved" | "Hidden") => void;
  deleteReview: (reviewId: string) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { toast } = useToast();

  // Load from localStorage if present
  useEffect(() => {
    try {
      const p = localStorage.getItem("velora_products");
      const c = localStorage.getItem("velora_categories");
      const o = localStorage.getItem("velora_orders");
      const r = localStorage.getItem("velora_reviews");

      if (p) setProducts(JSON.parse(p));
      if (c) setCategories(JSON.parse(c));
      if (o) setOrders(JSON.parse(o));
      if (r) setReviews(JSON.parse(r));
    } catch {
      // Fallback
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("velora_products", JSON.stringify(products));
      localStorage.setItem("velora_categories", JSON.stringify(categories));
      localStorage.setItem("velora_orders", JSON.stringify(orders));
      localStorage.setItem("velora_reviews", JSON.stringify(reviews));
    } catch {
      // Ignore
    }
  }, [products, categories, orders, reviews, isInitialized]);

  // Product CRUD
  const addProduct = (data: Omit<Product, "id">): Product => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    toast(`Product "${newProduct.name}" added to catalogue.`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    toast("Product updated successfully.");
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (target) {
      toast(`Deleted "${target.name}".`, "info");
    }
  };

  // Category CRUD
  const addCategory = (data: Omit<Category, "id" | "productCount">) => {
    const newCategory: Category = {
      ...data,
      id: `cat-${Date.now()}`,
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
    toast(`Category "${newCategory.name}" created.`);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    toast("Category updated successfully.");
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast("Category deleted.", "info");
  };

  // Order CRUD
  const addOrder = (orderData: Omit<Order, "id" | "date" | "status">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Confirmed",
      trackingNumber: `VEL-IND-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast(`Order #${orderId} marked as ${status}.`);
  };

  // Review CRUD
  const addReview = (reviewData: Omit<Review, "id" | "date" | "status">) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Approved",
    };
    setReviews((prev) => [newReview, ...prev]);
    toast("Thank you! Your review has been published.");
  };

  const updateReviewStatus = (reviewId: string, status: "Approved" | "Hidden") => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
    toast(`Review marked as ${status}.`);
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    toast("Review removed.", "info");
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        categories,
        orders,
        reviews,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
        addReview,
        updateReviewStatus,
        deleteReview,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
