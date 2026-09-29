import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { mockReviews } from "@/data/mockReviews";
import { RatingStars } from "@/components/common/RatingStars";

export function TestimonialsSection() {
  const reviewsToShow = mockReviews.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#88624C] block mb-2">
              Customer Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
              Words From Our Patrons
            </h2>
          </div>
          <Link
            href="/reviews"
            className="mt-4 md:mt-0 text-sm font-semibold text-[#88624C] hover:text-[#231710] flex items-center gap-1 group transition-colors"
          >
            <span>Read All Verified Reviews</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsToShow.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-[#EAE3D9] mb-4" />
              <p className="text-sm text-[#413D3A] leading-relaxed italic mb-6">
                &quot;{rev.comment}&quot;
              </p>
              <div className="pt-4 border-t border-[#F4EFEB] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-base font-semibold text-[#231710]">
                      {rev.customerName}
                    </span>
                    {rev.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#266E56]" title="Verified Buyer" />
                    )}
                  </div>
                  <span className="text-xs text-[#88624C] block mt-0.5">
                    {rev.productName}
                  </span>
                </div>
                <RatingStars rating={rev.rating} showCount={false} size="sm" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
