"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { label: "Empty", score: 0, color: "bg-[#EAE3D9]" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak", score: 25, color: "bg-[#C2410C]" };
    if (score === 2) return { label: "Fair", score: 50, color: "bg-[#EA580C]" };
    if (score === 3) return { label: "Good", score: 75, color: "bg-[#BE9A78]" };
    return { label: "Strong & Secure", score: 100, color: "bg-[#266E56]" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim() || !email.includes("@")) newErrors.email = "Valid email address is required";
    if (!phone.trim() || phone.length < 10) newErrors.phone = "Valid 10-digit phone number is required";
    if (!password || password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms) newErrors.agreeTerms = "You must agree to the Terms & Privacy Policy";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast("Please review the highlighted errors", "error");
      return;
    }

    register(fullName, email, phone, password);
    router.push("/profile");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#EAE3D9] shadow-xl">
        
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#88624C]">
            New Patron Membership
          </span>
          <h1 className="font-serif text-3xl font-normal text-[#231710]">
            Create Atelier Account
          </h1>
          <p className="text-xs text-[#736E69]">
            Receive private bespoke previews, track furniture commissions, and manage delivery addresses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#231710] block mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#88624C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Aarav Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
              />
            </div>
            {errors.fullName && <p className="text-xs text-[#C2410C] mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-[#231710] block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#88624C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@residence.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
              />
            </div>
            {errors.email && <p className="text-xs text-[#C2410C] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-[#231710] block mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#88624C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
              />
            </div>
            {errors.phone && <p className="text-xs text-[#C2410C] mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-[#231710] block mb-1">
              Password (min 8 characters) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#88624C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
              />
            </div>
            {errors.password && <p className="text-xs text-[#C2410C] mt-1">{errors.password}</p>}

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="w-full bg-[#EAE3D9] rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#736E69] text-right font-medium">
                  Strength: {strength.label}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-[#231710] block mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#88624C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
              />
            </div>
            {errors.confirmPassword && <p className="text-xs text-[#C2410C] mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#231710] focus:ring-[#231710] accent-[#231710]"
              />
              <span className="text-xs text-[#736E69] leading-relaxed">
                I agree to the Velora Living Atelier Terms of Service and Privacy Policy for handcrafted furniture commissions.
              </span>
            </label>
            {errors.agreeTerms && <p className="text-xs text-[#C2410C] mt-1">{errors.agreeTerms}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-sm font-semibold tracking-wide transition-colors shadow-md flex items-center justify-center gap-2 pt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-[#736E69]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#231710] underline">
            Sign In here
          </Link>
        </p>

      </div>
    </div>
  );
}
