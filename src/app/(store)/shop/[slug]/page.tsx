"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { RatingStars } from "@/components/common/RatingStars";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAdminData } from "@/context/AdminDataContext";
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Plus,
  Minus,
  Check,
  Share2,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, reviews } = useAdminData();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "materials" | "dimensions" | "shipping">("overview");
  const [isAdded, setIsAdded] = useState(false);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === "Approved");

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast("Product link copied to clipboard!");
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
            { label: product.name },
          ]}
        />

        {/* Product Showcase: Left Gallery + Right Purchase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4 pb-16 border-b border-[#EAE3D9]">
          
          {/* Left Column: Multi-Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Preview */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#FFFFFF] border border-[#EAE3D9] shadow-sm">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[#231710] border border-[#EAE3D9]">
                  {product.material}
                </span>
                {product.isBestSeller && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#231710] text-[#FAF8F5]">
                    Best Seller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img
                        ? "border-[#231710] scale-102 shadow-sm"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Specs, and Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#88624C]">
                  {product.category} • SKU: {product.sku}
                </span>
                <button
                  onClick={handleShare}
                  className="p-2 text-[#736E69] hover:text-[#231710] hover:bg-[#F4EFEB] rounded-full transition-colors"
                  title="Share piece"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
                <span className="text-xs text-[#9C9690]">•</span>
                <span className="text-xs font-semibold text-[#266E56]">
                  {product.stock > 0 ? `In Stock (${product.stock} units available)` : "Made to order"}
                </span>
              </div>

              <div className="pt-2">
                <PriceDisplay price={product.price} oldPrice={product.oldPrice} size="xl" />
                <p className="text-xs text-[#736E69] mt-1">
                  Inclusive of all taxes. Free white-glove installation nationwide.
                </p>
              </div>

              <p className="text-sm text-[#413D3A] leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Color Swatch Picker */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#231710] block">
                    Finish / Fabric: <span className="text-[#88624C]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs transition-all ${
                          selectedColor === c.name
                            ? "border-[#231710] bg-[#FFFFFF] text-[#231710] font-semibold shadow-xs"
                            : "border-[#D8CEBF] bg-[#FAF8F5] text-[#736E69] hover:border-[#88624C]"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-[#D8CEBF]"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions Summary Box */}
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D9] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[#9C9690] block">Width</span>
                  <span className="font-semibold text-[#231710] text-sm">{product.dimensions.widthCm} cm</span>
                </div>
                <div className="border-x border-[#F4EFEB]">
                  <span className="text-[#9C9690] block">Depth</span>
                  <span className="font-semibold text-[#231710] text-sm">{product.dimensions.depthCm} cm</span>
                </div>
                <div>
                  <span className="text-[#9C9690] block">Height</span>
                  <span className="font-semibold text-[#231710] text-sm">{product.dimensions.heightCm} cm</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Quantity, Add to Cart, Buy Now, Wishlist */}
            <div className="space-y-3 pt-4 border-t border-[#EAE3D9]">
              <div className="flex items-center gap-3">
                
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#D8CEBF] rounded-xl bg-[#FFFFFF] px-3 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-[#413D3A] hover:text-[#231710]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#231710]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-[#413D3A] hover:text-[#231710]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                    isAdded
                      ? "bg-[#266E56] text-[#FAF8F5]"
                      : "bg-[#231710] text-[#FAF8F5] hover:bg-[#332218]"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-xl border transition-colors shadow-xs ${
                    isLiked
                      ? "bg-[#88624C] text-[#FAF8F5] border-[#88624C]"
                      : "bg-[#FFFFFF] text-[#413D3A] border-[#D8CEBF] hover:bg-[#F4EFEB]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-[#BE9A78] hover:bg-[#A27B5C] text-[#231710] text-sm font-bold tracking-wide transition-colors shadow-xs"
              >
                Instant Checkout with Express Delivery
              </button>

              {/* Value Propositions */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-[#736E69]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#266E56]" />
                  <span>{product.warrantyYears || 10}-Year Frame Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#88624C]" />
                  <span>White-Glove Placement</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed In-Depth Specifications & Materials */}
        <div className="py-12 border-b border-[#EAE3D9]">
          <div className="flex gap-6 border-b border-[#EAE3D9] overflow-x-auto pb-3">
            {[
              { id: "overview", label: "Description & Design" },
              { id: "materials", label: "Craftsmanship & Timber" },
              { id: "dimensions", label: "Dimensions & Care" },
              { id: "shipping", label: "Delivery & Warranty" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-sm font-semibold tracking-wide transition-colors whitespace-nowrap pb-2 relative ${
                  activeTab === tab.id
                    ? "text-[#231710]"
                    : "text-[#736E69] hover:text-[#231710]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#231710] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8 max-w-4xl text-sm text-[#413D3A] leading-relaxed space-y-4">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <p>
                  The <span className="font-semibold text-[#231710]">{product.name}</span> represents Velora Living&apos;s commitment to timeless Scandinavian simplicity fused with classical Japanese wood joinery. Handcrafted from sustainably harvested {product.material}, each piece highlights distinctive continuous grain patterns.
                </p>
                <p>
                  Every curved contour is hand-sanded with progressively fine natural abrasives before receiving two coats of plant-based hardwax oil. This preserves the tactile texture of raw wood while providing natural protection against water spots and daily wear.
                </p>
              </div>
            )}

            {activeTab === "materials" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#EAE3D9]">
                    <span className="text-xs uppercase font-bold text-[#88624C] block mb-1">Primary Material</span>
                    <p className="font-semibold text-[#231710]">{product.material}</p>
                    <p className="text-xs text-[#736E69] mt-1">Kiln-dried plantation hardwood with natural organic finish.</p>
                  </div>
                  {product.secondaryMaterial && (
                    <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#EAE3D9]">
                      <span className="text-xs uppercase font-bold text-[#88624C] block mb-1">Secondary Material</span>
                      <p className="font-semibold text-[#231710]">{product.secondaryMaterial}</p>
                      <p className="text-xs text-[#736E69] mt-1">Hand-picked accents, textured bouclé, or burnished brass fittings.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "dimensions" && (
              <div className="space-y-4">
                <ul className="space-y-2 list-disc pl-5">
                  <li>Width: {product.dimensions.widthCm} cm ({Math.round(product.dimensions.widthCm / 2.54)} inches)</li>
                  <li>Depth: {product.dimensions.depthCm} cm ({Math.round(product.dimensions.depthCm / 2.54)} inches)</li>
                  <li>Height: {product.dimensions.heightCm} cm ({Math.round(product.dimensions.heightCm / 2.54)} inches)</li>
                  {product.dimensions.weightKg && <li>Weight: {product.dimensions.weightKg} kg</li>}
                </ul>
                <p className="text-xs text-[#736E69] pt-2">
                  Care: Dust regularly with a dry lint-free microfiber cloth. Avoid placing in direct prolonged sunlight or near active heating vents.
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-3">
                <p>
                  ✨ <span className="font-semibold text-[#231710]">White-Glove Delivery:</span> Complimentary for orders over ₹50,000. Our specialized team coordinates directly with your building concierge and installs the piece in your desired room.
                </p>
                <p>
                  🛡️ <span className="font-semibold text-[#231710]">10-Year Guarantee:</span> Covers structural joints, timber integrity, and internal frames against manufacturing faults.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section for this piece */}
        <div className="py-12 border-b border-[#EAE3D9]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#231710]">
                Customer Reviews ({productReviews.length})
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-xs font-semibold text-[#88624C] hover:text-[#231710] underline"
            >
              Write a Review
            </Link>
          </div>

          {productReviews.length === 0 ? (
            <p className="text-sm text-[#736E69] italic">
              Be the first to share your thoughts on this handcrafted piece.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.map((r) => (
                <div key={r.id} className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D9] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base font-semibold text-[#231710]">
                      {r.customerName}
                    </span>
                    <RatingStars rating={r.rating} showCount={false} size="sm" />
                  </div>
                  <p className="text-xs text-[#413D3A] leading-relaxed">
                    &quot;{r.comment}&quot;
                  </p>
                  <span className="text-[11px] text-[#9C9690] block">
                    Verified Purchase • {r.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="py-16">
            <h2 className="font-serif text-3xl font-normal text-[#231710] mb-8">
              Complementary Pieces in {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
