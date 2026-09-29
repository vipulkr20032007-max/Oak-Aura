"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Address } from "@/types";
import { defaultCustomerUser, defaultAdminUser } from "@/data/mockUsers";
import { useToast } from "@/components/ui/Toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  toggleRole: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Start with default logged-in customer for seamless demo experience
  const [user, setUser] = useState<User | null>(defaultCustomerUser);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("velora_auth_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Use fallback
    }
  }, []);

  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("velora_auth_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("velora_auth_user");
    }
  };

  const login = (email: string): boolean => {
    if (email.toLowerCase().includes("admin")) {
      saveUser(defaultAdminUser);
      toast("Welcome back, Administrator!");
      return true;
    }
    const customerUser: User = {
      ...defaultCustomerUser,
      email: email || defaultCustomerUser.email,
    };
    saveUser(customerUser);
    toast(`Welcome back, ${customerUser.name}!`);
    return true;
  };

  const register = (name: string, email: string, phone: string): boolean => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: "customer",
      addresses: [],
    };
    saveUser(newUser);
    toast(`Account created! Welcome to Velora Living, ${name}`);
    return true;
  };

  const logout = () => {
    saveUser(null);
    toast("You have been signed out.", "info");
  };

  const toggleRole = () => {
    if (user?.role === "admin") {
      saveUser(defaultCustomerUser);
      toast("Switched to Customer View", "info");
    } else {
      saveUser(defaultAdminUser);
      toast("Switched to Admin Portal", "info");
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    saveUser(updated);
    toast("Profile details updated.");
  };

  const addAddress = (newAddress: Address) => {
    if (!user) return;
    const addresses = [...(user.addresses || []), newAddress];
    saveUser({ ...user, addresses });
    toast("New shipping address saved.");
  };

  const removeAddress = (index: number) => {
    if (!user) return;
    const addresses = user.addresses.filter((_, i) => i !== index);
    saveUser({ ...user, addresses });
    toast("Address removed.", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        toggleRole,
        updateProfile,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
