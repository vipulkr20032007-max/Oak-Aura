// Product Service Layer
// NOTE FOR FUTURE BACKEND: When you connect Supabase/PostgreSQL, replace the local mock returns with supabase queries!

import { Product, ProductCategory } from "@/types";
import { mockProducts } from "@/data/mockProducts";
import { mockCategories } from "@/data/mockCategories";

export const productService = {
  async getProducts(): Promise<Product[]> {
    // In future: const { data } = await supabase.from('products').select('*'); return data;
    return mockProducts;
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return mockProducts.find((p) => p.slug === slug);
  },

  async getProductById(id: string): Promise<Product | undefined> {
    return mockProducts.find((p) => p.id === id);
  },

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return mockProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  },

  async getRelatedProducts(category: ProductCategory, currentId: string, limit: number = 4): Promise<Product[]> {
    return mockProducts
      .filter((p) => p.category === category && p.id !== currentId)
      .slice(0, limit);
  },

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    return mockProducts.filter((p) => p.isFeatured || p.isBestSeller).slice(0, limit);
  },

  async getCategories() {
    return mockCategories;
  },
};
