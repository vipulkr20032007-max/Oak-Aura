import { User } from "@/types";

export const defaultCustomerUser: User = {
  id: "usr-001",
  name: "Vipul Kumar",
  email: "vipul.kumar@example.com",
  phone: "+91 98765 43210",
  role: "customer",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  addresses: [
    {
      fullName: "Vipul Kumar",
      phone: "+91 98765 43210",
      street: "Villa 14, Prestige Silver Oak, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      isDefault: true,
    },
    {
      fullName: "Vipul Kumar (Office)",
      phone: "+91 98765 43210",
      street: "Tower 3, Level 7, RMZ Ecoworld, Outer Ring Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      isDefault: false,
    }
  ],
};

export const defaultAdminUser: User = {
  id: "adm-001",
  name: "Velora Admin (Curator)",
  email: "admin@veloraliving.com",
  phone: "+91 98000 11223",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
  addresses: [],
};
