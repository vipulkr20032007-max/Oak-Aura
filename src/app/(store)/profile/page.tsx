"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useAuth } from "@/context/AuthContext";
import { useAdminData } from "@/context/AdminDataContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR, formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  ShieldCheck,
  Edit2,
  Check,
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout, updateProfile, addAddress, removeAddress } = useAuth();
  const { orders } = useAdminData();
  const { totalWishlist } = useWishlist();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "addresses" | "settings">("overview");

  // Edit profile state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isEditing, setIsEditing] = useState(false);

  // New Address modal state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const userOrders = orders.filter((o) => !user?.email || o.customerEmail === user.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    setIsEditing(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPincode) {
      toast("Please fill all required address fields.", "error");
      return;
    }
    addAddress({
      fullName: user?.name || "Patron",
      phone: user?.phone || "+91 98765 43210",
      street: newStreet,
      city: newCity,
      state: newState || "Karnataka",
      pincode: newPincode,
    });
    setNewStreet("");
    setNewCity("");
    setNewState("");
    setNewPincode("");
    setShowAddAddress(false);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Patron Account" }]} />

        <div className="py-6 border-b border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
              Patron Profile & Atelier Services
            </h1>
            <p className="text-sm text-[#736E69] mt-1">
              Manage your personal residences, furniture orders, and private bespoke consults.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#EFE4D6] text-[#88624C] border border-[#BE9A78]">
              {user?.role === "admin" ? "Curator Admin" : "Private Member"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
          
          {/* Left Column: Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-1">
              {[
                { id: "overview", label: "Overview", icon: UserIcon },
                { id: "profile", label: "Personal Details", icon: Edit2 },
                { id: "addresses", label: "Saved Residences", icon: MapPin },
                { id: "settings", label: "Preferences & Security", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-left ${
                      isActive
                        ? "bg-[#231710] text-[#FAF8F5] font-semibold shadow-xs"
                        : "text-[#413D3A] hover:bg-[#FAF8F5] hover:text-[#231710]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <Link
                href="/orders"
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-[#413D3A] hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-[#88624C]" />
                  <span>My Orders</span>
                </div>
                <span className="text-xs font-bold text-[#88624C] bg-[#EFE4D6] px-2 py-0.5 rounded-full">
                  {userOrders.length}
                </span>
              </Link>

              <Link
                href="/wishlist"
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-[#413D3A] hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[#88624C]" />
                  <span>Wishlist</span>
                </div>
                <span className="text-xs font-bold text-[#88624C] bg-[#EFE4D6] px-2 py-0.5 rounded-full">
                  {totalWishlist}
                </span>
              </Link>

              <div className="pt-2 border-t border-[#F4EFEB]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-[#C2410C] hover:bg-[#F4EFEB] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Content Tab */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                
                {/* Patron Header Banner */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#231710] text-[#FAF8F5] border border-[#332218] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#D8BA9B] block mb-1">
                      Welcome Home
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#FFFFFF]">
                      {user?.name}
                    </h2>
                    <p className="text-xs text-[#D8CEBF] mt-1">
                      {user?.email} • {user?.phone}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center px-4 py-2 rounded-xl bg-[#332218] border border-[#4A3326]">
                      <span className="font-serif text-2xl font-bold text-[#FFFFFF] block">
                        {userOrders.length}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-[#D8BA9B]">Orders</span>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-[#332218] border border-[#4A3326]">
                      <span className="font-serif text-2xl font-bold text-[#FFFFFF] block">
                        {totalWishlist}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-[#D8BA9B]">Wishlist</span>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F4EFEB]">
                    <h3 className="font-serif text-xl font-bold text-[#231710]">
                      Recent Commissions & Orders
                    </h3>
                    <Link
                      href="/orders"
                      className="text-xs font-semibold text-[#88624C] hover:underline"
                    >
                      View All ({userOrders.length}) →
                    </Link>
                  </div>

                  {userOrders.length === 0 ? (
                    <p className="text-sm text-[#736E69] py-4 italic">
                      No past orders. When you acquire a piece, it will appear here.
                    </p>
                  ) : (
                    <div className="divide-y divide-[#F4EFEB]">
                      {userOrders.slice(0, 2).map((order) => (
                        <div key={order.id} className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <span className="font-mono text-xs font-bold text-[#231710] block">
                              #{order.id}
                            </span>
                            <span className="text-xs text-[#736E69]">
                              {formatDate(order.date)} • {order.items.length} {order.items.length === 1 ? "item" : "items"}
                            </span>
                            <p className="text-xs text-[#413D3A] font-medium mt-1">
                              {order.items.map((i) => i.name).join(", ")}
                            </p>
                          </div>
                          <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2">
                            <span className="font-semibold text-sm text-[#231710]">
                              {formatINR(order.total)}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E4F0EC] text-[#266E56]">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#F4EFEB]">
                  <h3 className="font-serif text-xl font-bold text-[#231710]">
                    Personal Information
                  </h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs font-semibold text-[#88624C] hover:text-[#231710] flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] disabled:opacity-75 focus:outline-none focus:border-[#88624C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] disabled:opacity-75 focus:outline-none focus:border-[#88624C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#231710] block mb-1">
                      Primary Contact Number
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CEBF] rounded-xl text-sm text-[#231710] disabled:opacity-75 focus:outline-none focus:border-[#88624C]"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#231710] text-[#FAF8F5] text-xs font-semibold hover:bg-[#332218] transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 rounded-xl border border-[#D8CEBF] text-[#736E69] text-xs font-semibold hover:bg-[#FAF8F5] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#F4EFEB]">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#231710]">
                      Saved Residences & Sites
                    </h3>
                    <p className="text-xs text-[#736E69]">
                      White-glove delivery destination profiles
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="px-4 py-2 rounded-xl bg-[#231710] text-[#FAF8F5] text-xs font-semibold hover:bg-[#332218] transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Residence</span>
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleAddAddress} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] space-y-4 animate-in fade-in">
                    <h4 className="font-serif text-base font-bold text-[#231710]">
                      New Destination Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-[#231710] block mb-1">
                          Street / Apartment / Wing *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Penthouse 18, Windmills of Your Mind"
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-[#FFFFFF] border border-[#D8CEBF] rounded-lg text-[#231710]"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-[#231710] block mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            placeholder="Bengaluru"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs bg-[#FFFFFF] border border-[#D8CEBF] rounded-lg text-[#231710]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#231710] block mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            placeholder="Karnataka"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs bg-[#FFFFFF] border border-[#D8CEBF] rounded-lg text-[#231710]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#231710] block mb-1">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            placeholder="560066"
                            value={newPincode}
                            onChange={(e) => setNewPincode(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs bg-[#FFFFFF] border border-[#D8CEBF] rounded-lg text-[#231710]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#231710] text-[#FAF8F5] text-xs font-semibold rounded-lg hover:bg-[#332218]"
                      >
                        Save Residence
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-4 py-2 border border-[#D8CEBF] text-[#736E69] text-xs rounded-lg hover:bg-[#FFFFFF]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user?.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-base font-bold text-[#231710]">
                              {addr.fullName}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EFE4D6] text-[#88624C]">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#413D3A] leading-relaxed">
                            {addr.street}
                          </p>
                          <p className="text-xs text-[#736E69]">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-xs text-[#9C9690] pt-1">
                            Phone: {addr.phone}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#EAE3D9] flex justify-end">
                          <button
                            onClick={() => removeAddress(idx)}
                            className="text-xs text-[#9C9690] hover:text-[#C2410C] flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#736E69] italic">No saved residences yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#231710] pb-3 border-b border-[#F4EFEB]">
                  Atelier Preferences
                </h3>
                <div className="space-y-4 max-w-lg text-xs sm:text-sm text-[#413D3A]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#231710] accent-[#231710]" />
                    <span>Receive notification when seasonal timber lots are released</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#231710] accent-[#231710]" />
                    <span>Send SMS tracking updates on freight movement</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#231710] accent-[#231710]" />
                    <span>Invite me to private salon dinners at the Indiranagar atelier</span>
                  </label>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
