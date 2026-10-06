"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { RatingStars } from "@/components/common/RatingStars";
import { useAdminData } from "@/context/AdminDataContext";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import { Star, CheckCircle2, MessageSquare, PenTool } from "lucide-react";

export default function ReviewsPage() {
  const { reviews, products, addReview } = useAdminData();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const approvedReviews = reviews.filter((r) => r.status === "Approved");

  // Calculate overall rating & star distribution
  const totalReviewsCount = approvedReviews.length;
  const avgRating =
    totalReviewsCount > 0
      ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1)
      : "5.0";

  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  approvedReviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    counts[star] = (counts[star] || 0) + 1;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) newErrors.customerName = "Your name is required";
    if (!comment.trim() || comment.length < 15) newErrors.comment = "Review must be at least 15 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast("Please complete all review fields.", "error");
      return;
    }

    const selectedProduct = products.find((p) => p.id === productId);

    addReview({
      productId,
      productName: selectedProduct?.name || "Handcrafted Piece",
      customerName,
      rating,
      comment,
      verifiedPurchase: true,
    });

    setCustomerName("");
    setComment("");
    setRating(5);
    setIsFormOpen(false);
    setErrors({});
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Patron Testimonials & Reviews" }]} />

        <div className="py-6 border-b border-[#EAE3D9] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#88624C] block mb-1">
              Verified Patron Testimonials
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#231710] tracking-tight">
              Client Experiences & Ratings
            </h1>
            <p className="text-sm text-[#736E69] mt-2">
              Unfiltered reflections from homeowners, architects, and interior designers across India.
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-6 py-3.5 rounded-xl bg-[#231710] text-[#FAF8F5] hover:bg-[#332218] text-xs sm:text-sm font-semibold tracking-wide transition-colors flex items-center gap-2 self-start md:self-auto shadow-md"
          >
            <PenTool className="w-4 h-4" />
            <span>Write a Client Review</span>
          </button>
        </div>

        {/* Rating Overview Scorecard & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Average Rating Block */}
          <div className="lg:col-span-4 bg-[#FFFFFF] p-8 rounded-3xl border border-[#EAE3D9] text-center flex flex-col justify-center items-center shadow-xs">
            <span className="font-serif text-6xl font-bold text-[#231710] leading-none mb-2">
              {avgRating}
            </span>
            <RatingStars rating={Number(avgRating)} showCount={false} size="lg" />
            <p className="text-xs text-[#736E69] mt-3">
              Based on {totalReviewsCount} verified commissions
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-bold text-[#266E56] bg-[#E4F0EC] px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Authentic Verified Buyers</span>
            </span>
          </div>

          {/* Rating Distribution Bars */}
          <div className="lg:col-span-8 bg-[#FFFFFF] p-8 rounded-3xl border border-[#EAE3D9] shadow-xs space-y-3 flex flex-col justify-center">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = counts[star] || 0;
              const percent = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
              return (
                <div key={star} className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 w-16 text-[#736E69]">
                    <span className="font-bold text-[#231710]">{star}</span>
                    <Star className="w-3.5 h-3.5 fill-[#BE9A78] text-[#BE9A78]" />
                  </div>
                  <div className="flex-1 bg-[#F4EFEB] rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#88624C] h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-[#9C9690] font-medium">
                    {count} ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Optional Write Review Drawer / Form */}
        {isFormOpen && (
          <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#BE9A78] shadow-lg mb-12 animate-in fade-in space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#231710] pb-2 border-b border-[#F4EFEB]">
              Share Your Furniture Experience
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#231710] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Radhika Verma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                  />
                  {errors.customerName && <p className="text-xs text-[#C2410C] mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#231710] block mb-1">
                    Furniture Piece Reviewed *
                  </label>
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Star Rating Picker */}
              <div>
                <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                  Rating (Select 1 to 5 Stars) *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? "fill-[#BE9A78] text-[#BE9A78]"
                            : "text-[#D8CEBF]"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#88624C] ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#231710] block mb-1">
                  Your Review / Craftsmanship Feedback *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the grain, comfort, delivery experience, or how the piece complements your residence..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                />
                {errors.comment && <p className="text-xs text-[#C2410C] mt-1">{errors.comment}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-xs font-semibold tracking-wide transition-colors"
                >
                  Submit & Publish Review
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 rounded-xl border border-[#D8CEBF] text-[#736E69] text-xs font-semibold hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Customer Reviews Feed */}
        <div className="space-y-6 pb-16">
          <h2 className="font-serif text-2xl font-bold text-[#231710]">
            All Reviews ({approvedReviews.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedReviews.map((r) => (
              <div
                key={r.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D9] shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-lg font-bold text-[#231710]">
                          {r.customerName}
                        </span>
                        {r.verifiedPurchase && (
                          <span title="Verified Buyer">
                            <CheckCircle2 className="w-4 h-4 text-[#266E56]" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#88624C] block mt-0.5">
                        Acquired: <strong>{r.productName}</strong>
                      </span>
                    </div>
                    <RatingStars rating={r.rating} showCount={false} size="sm" />
                  </div>

                  <p className="text-sm text-[#413D3A] leading-relaxed italic">
                    &quot;{r.comment}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4EFEB] flex items-center justify-between text-xs text-[#9C9690]">
                  <span>{formatDate(r.date)}</span>
                  <span className="text-[#266E56] font-semibold">Verified Installation</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
