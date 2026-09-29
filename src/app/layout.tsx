import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { AdminDataProvider } from "@/context/AdminDataContext";
import { ToastProvider } from "@/components/ui/Toast";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELORA LIVING | Luxury Handcrafted Furniture",
  description: "Discover thoughtfully crafted furniture that brings warmth, comfort, and timeless character to every home. Handcrafted in solid teak, walnut, and oak.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#191716] antialiased selection:bg-[#EFE4D6] selection:text-[#231710]">
        <ToastProvider>
          <AuthProvider>
            <AdminDataProvider>
              <CartProvider>
                <WishlistProvider>
                  {children}
                </WishlistProvider>
              </CartProvider>
            </AdminDataProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
