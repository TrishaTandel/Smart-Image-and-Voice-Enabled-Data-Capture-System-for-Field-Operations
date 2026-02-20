"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function useTokenExpiry() {
  const expiry = useAuthStore((s) => s.expiry);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!expiry) return;

    const now = Date.now();

    if (now > expiry) {
      logout();
      return;
    }

    const timeout = expiry - now;

    const timer = setTimeout(() => {
      logout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [expiry, logout]);
}
