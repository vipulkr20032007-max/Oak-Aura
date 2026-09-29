"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("vipul.kumar@example.com");
  const [password, setPassword] = useState("Velora@2026");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    login(email, password);
    router.push("/profile");
  };

  const handleGoogleLogin = () => {
    login("vipul.kumar@google.com");
    toast("Signed in with Google (Prototype Auth)");
    router.push("/profile");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#EAE3D9] shadow-xl">
        
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#88624C]">
            Patron Access
          </span>
          <h1 className="font-serif text-3xl font-normal text-[#231710]">
            Sign In to Velora
          </h1>
          <p className="text-xs text-[#736E69]">
            Access your orders, saved curations, and private showroom invitations.
          </p>
        </div>

        {/* Quick Demo Credentials Pill */}
        <div className="p-3 bg-[#FAF8F5] border border-[#EAE3D9] rounded-xl text-xs text-[#736E69] space-y-1">
          <p className="font-semibold text-[#231710]">Demo Credentials Pre-filled:</p>
          <p>Customer: <span className="text-[#88624C]">vipul.kumar@example.com</span></p>
          <p>Admin: <span className="text-[#88624C]">admin@veloraliving.com</span> (grants admin rights)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-[#231710] block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#88624C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] focus:outline-none focus:border-[#88624C]"
                placeholder="name@example.com"
              />
            </div>
            {errors.email && <p className="text-xs text-[#C2410C] mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#231710]">
                Password
              </label>
              <button
                type="button"
                onClick={() => toast("Password reset link sent to demo email.", "info")}
                className="text-xs text-[#88624C] hover:underline"
              >
                Forgot password?
              </button>
            </div>
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
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#231710] focus:ring-[#231710] accent-[#231710]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-[#736E69]">
              Remember this device
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-sm font-semibold tracking-wide transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[#EAE3D9]" />
          <span className="shrink-0 px-3 text-xs text-[#9C9690] uppercase font-semibold">Or</span>
          <div className="flex-grow border-t border-[#EAE3D9]" />
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3 px-4 border border-[#D8CEBF] rounded-xl text-xs font-semibold text-[#231710] hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-[#736E69]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-[#231710] underline">
            Create an Atelier account
          </Link>
        </p>

      </div>
    </div>
  );
}
