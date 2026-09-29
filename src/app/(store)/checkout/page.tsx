"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAdminData } from "@/context/AdminDataContext";
import { formatINR } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  CheckCircle2,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shipping, discount, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useAdminData();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.name || "Vipul Kumar",
    email: user?.email || "vipul.kumar@example.com",
    phone: user?.phone || "+91 98765 43210",
    street: user?.addresses[0]?.street || "Villa 14, Prestige Silver Oak, Whitefield",
    city: user?.addresses[0]?.city || "Bengaluru",
    state: user?.addresses[0]?.state || "Karnataka",
    pincode: user?.addresses[0]?.pincode || "560066",
    deliveryMethod: "standard", // standard | express
    paymentMethod: "Credit/Debit Card", // Credit/Debit Card | UPI | Cash on Delivery
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const deliveryCost = formData.deliveryMethod === "express" ? 2499 : shipping;
  const finalTotal = Math.max(0, subtotal - discount + deliveryCost);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Valid 10-digit mobile number required";
    }
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim() || formData.pincode.length < 6) {
      newErrors.pincode = "Valid 6-digit PIN code required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast("Please review the highlighted fields.", "error");
      return;
    }

    if (cart.length === 0) {
      toast("Your bag is empty. Add pieces before placing an order.", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = addOrder({
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.mainImage,
          selectedColor: item.selectedColor,
        })),
        subtotal,
        shipping: deliveryCost,
        discount,
        total: finalTotal,
        paymentMethod: formData.paymentMethod as any,
        paymentStatus: formData.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      });

      clearCart();
      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      toast("Order placed successfully! Confirmation email dispatched.");
    }, 1200);
  };

  // Order Confirmed Success Screen
  if (completedOrder) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#EAE3D9] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#E4F0EC] text-[#266E56] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#88624C]">
              Booking Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710]">
              Thank You for Your Patronage
            </h1>
            <p className="text-sm text-[#736E69]">
              Your order <span className="font-bold text-[#231710]">#{completedOrder.id}</span> has been received. Our White-Glove logistics team will coordinate your delivery.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#736E69]">Delivery Address:</span>
              <span className="font-semibold text-[#231710] text-right">
                {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city} - {completedOrder.shippingAddress.pincode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736E69]">Payment Method:</span>
              <span className="font-semibold text-[#231710]">{completedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736E69]">Total Amount:</span>
              <span className="font-bold text-[#231710] text-sm">{formatINR(completedOrder.total)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href="/orders"
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-sm font-semibold tracking-wide transition-colors"
            >
              View Order in My Account
            </Link>
            <Link
              href="/shop"
              className="flex-1 py-3.5 px-6 rounded-xl border border-[#D8CEBF] text-[#231710] hover:bg-[#FAF8F5] text-sm font-semibold tracking-wide transition-colors"
            >
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { label: "Shopping Bag", href: "/cart" },
            { label: "Secure Checkout" },
          ]}
        />

        <div className="py-6 border-b border-[#EAE3D9] mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
            Checkout & White-Glove Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-[#736E69] mt-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#266E56]" />
            <span>256-Bit SSL Encrypted Private Transaction</span>
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16">
          
          {/* Left 7 Columns: Form Sections */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Section 1: Customer Details */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#231710] pb-2 border-b border-[#F4EFEB]">
                1. Patron Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                  />
                  {errors.fullName && <p className="text-xs text-[#C2410C] mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                  />
                  {errors.email && <p className="text-xs text-[#C2410C] mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                    Mobile Phone (For delivery concierge coordination) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                  />
                  {errors.phone && <p className="text-xs text-[#C2410C] mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Destination */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#231710] pb-2 border-b border-[#F4EFEB]">
                2. Residence & Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                    Street Address, Apartment/Villa, Wing *
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                  />
                  {errors.street && <p className="text-xs text-[#C2410C] mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                    />
                    {errors.city && <p className="text-xs text-[#C2410C] mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                    />
                    {errors.state && <p className="text-xs text-[#C2410C] mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                    />
                    {errors.pincode && <p className="text-xs text-[#C2410C] mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Delivery Speed */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#231710] pb-2 border-b border-[#F4EFEB]">
                3. Delivery Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    formData.deliveryMethod === "standard"
                      ? "border-[#231710] bg-[#FAF8F5] shadow-xs"
                      : "border-[#D8CEBF] hover:border-[#88624C]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif text-base font-bold text-[#231710] block">
                        Standard White-Glove
                      </span>
                      <span className="text-xs text-[#736E69] mt-0.5 block">
                        Delivery in 5-7 business days
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={formData.deliveryMethod === "standard"}
                      onChange={() => setFormData({ ...formData, deliveryMethod: "standard" })}
                      className="accent-[#231710]"
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#266E56] pt-3">
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </label>

                <label
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    formData.deliveryMethod === "express"
                      ? "border-[#231710] bg-[#FAF8F5] shadow-xs"
                      : "border-[#D8CEBF] hover:border-[#88624C]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif text-base font-bold text-[#231710] block">
                        Priority Dedicated Freight
                      </span>
                      <span className="text-xs text-[#736E69] mt-0.5 block">
                        Expedited 2-3 business days
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === "express"}
                      onChange={() => setFormData({ ...formData, deliveryMethod: "express" })}
                      className="accent-[#231710]"
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#231710] pt-3">
                    ₹2,499
                  </span>
                </label>
              </div>
            </div>

            {/* Section 4: Payment Placeholder Options */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#231710] pb-2 border-b border-[#F4EFEB]">
                4. Payment Method (Demo Gateway)
              </h2>
              <div className="space-y-3">
                {[
                  {
                    id: "Credit/Debit Card",
                    icon: CreditCard,
                    title: "Credit or Debit Card",
                    desc: "Visa, Mastercard, RuPay, American Express",
                  },
                  {
                    id: "UPI",
                    icon: QrCode,
                    title: "UPI / QR Code",
                    desc: "Google Pay, PhonePe, Paytm, BHIM UPI",
                  },
                  {
                    id: "Cash on Delivery",
                    icon: Banknote,
                    title: "Cash on Delivery / Card on Placement",
                    desc: "Inspect piece in your room before authorizing transaction",
                  },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <label
                      key={m.id}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.paymentMethod === m.id
                          ? "border-[#231710] bg-[#FAF8F5] shadow-xs"
                          : "border-[#D8CEBF] hover:border-[#88624C]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#EFE4D6] flex items-center justify-center text-[#88624C]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-serif text-base font-semibold text-[#231710]">
                            {m.title}
                          </p>
                          <p className="text-xs text-[#736E69]">{m.desc}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={formData.paymentMethod === m.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                        className="accent-[#231710]"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-[#231710] pb-3 border-b border-[#F4EFEB]">
                Order Items ({cart.length})
              </h2>

              <div className="max-h-72 overflow-y-auto space-y-3 pr-1 divide-y divide-[#F4EFEB]">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#FAF8F5] shrink-0 border border-[#EAE3D9]">
                      <Image
                        src={item.product.mainImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-semibold text-[#231710] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#736E69]">
                        Qty: {item.quantity} • {item.selectedColor}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#231710]">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#F4EFEB] space-y-2.5 text-xs sm:text-sm text-[#413D3A]">
                <div className="flex justify-between">
                  <span className="text-[#736E69]">Subtotal</span>
                  <span className="font-semibold text-[#231710]">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736E69]">Delivery & Setup</span>
                  <span className="font-semibold text-[#231710]">
                    {deliveryCost === 0 ? <span className="text-[#266E56]">FREE</span> : formatINR(deliveryCost)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#266E56]">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#F4EFEB] flex justify-between items-baseline">
                  <span className="font-serif text-lg font-bold text-[#231710]">Total Payable</span>
                  <span className="font-serif text-2xl font-bold text-[#231710]">
                    {formatINR(finalTotal)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 px-6 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing White-Glove Booking...</span>
                ) : (
                  <>
                    <span>Place Order & Authorize</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="space-y-1 text-center text-xs text-[#736E69]">
                <p>100% Satisfaction Guarantee with Hassle-Free Returns</p>
                <p className="text-[11px] text-[#9C9690]">No real charges will be levied (Frontend Prototype Mode)</p>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
