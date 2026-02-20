"use client";

import { useEffect } from "react";
import { loadSession } from "@/utils/loadSession";
import { useAuthStore } from "@/store/authStore";
import useTokenExpiry from "@/hooks/useTokenExpiry";
import useRefreshToken from "@/hooks/useRefreshToken";
import Cookies from "js-cookie";


export default function AuthInitializer() {
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  

  useEffect(() => {
    const { token, user } = loadSession();

    if (token) setToken(token);
    if (user) setUser(user);
  }, []);
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (token) setToken(token);
  }, []);

   useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
    }
  }, [setToken]);
  
  
  useTokenExpiry();
  useRefreshToken();


  return null;
}
