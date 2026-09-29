"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useAdminData } from "@/context/AdminDataContext";
import { useAuth } from "@/context/AuthContext";
import { formatINR, formatDate } from "@/lib/utils";
import { Package, Truck, Calendar, MapPin, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

export default function MyOrdersPage() {
  const { orders } = useAdminData();
  const { user } = useAuth();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const userOrders = orders.filter((o) => !user?.email || o.customerEmail === user.email);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-[#E4F0EC] text-[#266E56] border-[#266E56]/30";
      case "Shipped":
        return "bg-[#EDE9FE] text-[#6D28D9] border-[#6D28D9]/30";
      case "Processing":
        return "bg-[#E0F2FE] text-[#0369A1] border-[#0369A1]/30";
      case "Confirmed":
        return "bg-[#EFE4D6] text-[#88624C] border-[#BE9A78]/30";
      case "Cancelled":
        return "bg-[#FEE2E2] text-[#B91C1C] border-[#B91C1C]/30";
      default: // Pending
        return "bg-[#FEF3C7] text-[#B45309] border-[#B45309]/30";
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { label: "My Account", href: "/profile" },
            { label: "Order History" },
          ]}
        />

        <div className="py-6 border-b border-[#EAE3D9] mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
            Commission & Order History
          </h1>
          <p className="text-sm text-[#736E69] mt-1">
            Track white-glove logistics, dispatch status, and download tax invoices for your pieces.
          </p>
        </div>

        {userOrders.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#EFE4D6] flex items-center justify-center text-[#88624C] mx-auto mb-6">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-[#231710] mb-2">
              No orders found
            </h2>
            <p className="text-sm text-[#736E69] mb-8 leading-relaxed">
              When you commission or purchase a handcrafted piece from Velora Living, live tracking and order history will be available here.
            </p>
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl bg-[#231710] text-[#FAF8F5] hover:bg-[#332218] text-sm font-semibold tracking-wide shadow-md transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6 pb-16">
            {userOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              return (
                <div
                  key={order.id}
                  className="bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] shadow-xs overflow-hidden transition-all"
                >
                  {/* Order Card Header */}
                  <div className="p-6 bg-[#FAF8F5]/50 border-b border-[#EAE3D9] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-[#9C9690] block">Order Reference</span>
                        <span className="font-mono font-bold text-[#231710] text-sm">
                          #{order.id}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#9C9690] block">Date Placed</span>
                        <span className="font-semibold text-[#231710]">
                          {formatDate(order.date)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#9C9690] block">Total Amount</span>
                        <span className="font-bold text-[#231710] text-sm">
                          {formatINR(order.total)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#9C9690] block">Delivery Status</span>
                        <span
                          className={`inline-block mt-0.5 text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="px-4 py-2 text-xs font-semibold text-[#88624C] hover:text-[#231710] flex items-center gap-1.5 transition-colors"
                      >
                        <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary Product Thumbnails Row */}
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#EAE3D9] shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <p className="font-serif text-sm font-semibold text-[#231710]">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#736E69]">
                              Qty: {item.quantity} • {formatINR(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.trackingNumber && (
                      <div className="text-xs text-[#736E69] flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#EAE3D9]">
                        <Truck className="w-4 h-4 text-[#88624C]" />
                        <span>Waybill: <strong className="text-[#231710]">{order.trackingNumber}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="p-6 bg-[#FAF8F5] border-t border-[#EAE3D9] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#413D3A] animate-in fade-in">
                      <div className="space-y-2">
                        <span className="font-serif text-sm font-bold text-[#231710] block">
                          Destination Address
                        </span>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#88624C] shrink-0 mt-0.5" />
                          <p className="leading-relaxed">
                            {order.shippingAddress.fullName}<br />
                            {order.shippingAddress.street}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                            Phone: {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-serif text-sm font-bold text-[#231710] block">
                          Payment & Billing Details
                        </span>
                        <p>
                          Payment Method: <strong className="text-[#231710]">{order.paymentMethod}</strong>
                        </p>
                        <p>
                          Payment Status: <strong className="text-[#266E56]">{order.paymentStatus}</strong>
                        </p>
                        <p>
                          Delivery Protocol: Standard White-Glove (Certified Carpenters)
                        </p>
                        <div className="pt-2">
                          <Link
                            href="/shop"
                            className="inline-flex items-center gap-1 text-[#88624C] hover:underline font-semibold"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Commission Complementary Pieces</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
