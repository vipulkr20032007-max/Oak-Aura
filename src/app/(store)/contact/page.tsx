"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useToast } from "@/components/ui/Toast";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Custom Furniture Inquiry");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Your name is required";
    if (!email.trim() || !email.includes("@")) newErrors.email = "Valid email address is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!message.trim() || message.length < 15) newErrors.message = "Message must be at least 15 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast("Please complete all required fields.", "error");
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    toast("Thank you. An Atelier concierge will contact you within 24 hours.");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Atelier Concierge & Contact" }]} />

        <div className="py-6 border-b border-[#EAE3D9] mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#88624C] block mb-1">
            Private Inquiries & Showrooms
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#231710] tracking-tight">
            Connect With Our Atelier
          </h1>
          <p className="text-sm sm:text-base text-[#736E69] mt-2 max-w-2xl">
            Whether inquiring about bespoke timber dimensions, white-glove logistics, or booking an in-person viewing, our concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Left 7 Columns: Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#EAE3D9] shadow-xs space-y-6">
            
            <h2 className="font-serif text-2xl font-bold text-[#231710] pb-2 border-b border-[#F4EFEB]">
              Send a Private Inquiry
            </h2>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E4F0EC] text-[#266E56] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#231710]">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-[#736E69] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#231710]">{name}</strong>. Our residential design consultant has received your message and will reach out via <span className="text-[#231710]">{email}</span>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-[#231710] text-[#FAF8F5] text-xs font-semibold hover:bg-[#332218] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Radhika Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                    />
                    {errors.name && <p className="text-xs text-[#C2410C] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                    />
                    {errors.email && <p className="text-xs text-[#C2410C] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                    />
                    {errors.phone && <p className="text-xs text-[#C2410C] mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1">
                      Nature of Inquiry
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                    >
                      <option value="Custom Furniture Inquiry">Custom Dimensions / Bespoke Commission</option>
                      <option value="Showroom Appointment">Showroom Private Appointment</option>
                      <option value="Architect & Trade Partner">Architect & Interior Trade Partnership</option>
                      <option value="Existing Order Assistance">Existing Order & Logistics Tracking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#231710] block mb-1">
                    Your Message / Specific Space Requirements *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your room, target dimensions, preferred timber finish, or the pieces you are interested in..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                  />
                  {errors.message && <p className="text-xs text-[#C2410C] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-sm font-semibold tracking-wide transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}

          </div>

          {/* Right 5 Columns: Flagship Details & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#EAE3D9] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#231710] pb-2 border-b border-[#F4EFEB]">
                Atelier Locations & Direct Lines
              </h3>

              <div className="space-y-5 text-xs sm:text-sm text-[#413D3A]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#88624C] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#231710] block text-sm">Flagship Showroom (Bengaluru)</strong>
                    <p className="text-[#736E69] leading-relaxed mt-0.5">
                      100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#88624C] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#231710] block text-sm">Design Studio (Mumbai)</strong>
                    <p className="text-[#736E69] leading-relaxed mt-0.5">
                      Pali Hill Road, Bandra West, Mumbai, Maharashtra 400050
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#88624C] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#231710] block text-sm">Concierge Line</strong>
                    <p className="text-[#736E69] mt-0.5">
                      +91 (080) 4122 8900 / +91 98000 11223
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#88624C] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#231710] block text-sm">Client Services</strong>
                    <p className="text-[#736E69] mt-0.5">
                      concierge@veloraliving.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#88624C] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#231710] block text-sm">Visiting Hours</strong>
                    <p className="text-[#736E69] mt-0.5">
                      Monday to Saturday: 10:30 AM – 8:00 PM<br />
                      Sunday: By Private Prior Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Showroom Map Placeholder */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D9] text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#88624C] block">
                Valet Parking & Private Viewing Suites Available
              </span>
              <p className="text-xs text-[#736E69]">
                Showroom visits include complimentary design consults and bespoke timber sampling.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
