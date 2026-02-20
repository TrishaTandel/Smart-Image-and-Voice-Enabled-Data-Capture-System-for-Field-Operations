"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { refreshAccessToken } from "@/lib/refreshToken";

export default function useRefreshToken() {
  const expiry = useAuthStore((s) => s.expiry);
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (!expiry) return;

    const refreshTime = expiry - Date.now() - 60000; // 1 min before expiry

    if (refreshTime <= 0) return;

    const timer = setTimeout(async () => {
      try {
        const data = await refreshAccessToken();
        setAuth(data.token, data.user, data.expiry);
      } catch {
        console.log("Refresh failed");
      }
    }, refreshTime);

    return () => clearTimeout(timer);
  }, [expiry, setAuth]);
}
