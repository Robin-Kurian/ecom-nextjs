"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser, isAuthenticated, logout } from "@/services/auth";
import { User } from "@/types";

export const UserContext = createContext<{ user: User | null; setUser: (u: User | null) => void }>({ user: null, setUser: () => {} });

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchUser().then(setUser).catch(() => setUser(null));
    }
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    window.location.href = "/";
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
} 