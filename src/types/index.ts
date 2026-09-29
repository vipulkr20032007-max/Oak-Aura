// Type definitions for Velora Living

export type ProductCategory =
  | "Sofas"
  | "Chairs"
  | "Tables"
  | "Beds"
  | "Dining"
  | "Storage"
  | "Lighting"
  | "Decor";

export type WoodType =
  | "Solid Teak"
  | "American Walnut"
  | "White Oak"
  | "Natural Ash"
  | "Sheesham"
  | "Acoustic Cane & Oak";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDimensions {
  widthCm: number;
  depthCm: number;
  heightCm: number;
  weightKg?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  price: number; // in INR
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  material: WoodType;
  secondaryMaterial?: string;
  colors: ProductColor[];
  dimensions: ProductDimensions;
  stock: number;
  sku: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  warrantyYears?: number;
  assemblyRequired?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: ProductCategory;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string; // e.g. "ORD-2026-8941"
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: "Credit/Debit Card" | "UPI" | "Cash on Delivery";
  paymentStatus: "Paid" | "Pending";
  status: OrderStatus;
  trackingNumber?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  status: "Approved" | "Pending" | "Hidden";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  avatar?: string;
  addresses: Address[];
}
