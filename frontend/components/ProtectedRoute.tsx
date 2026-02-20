"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function ProtectedRoute({ children }: any) {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token]);

  if (!token) return null;

  const { checking } = useAuthGuard();

  if (checking) return <p>Loading...</p>;

  return children;
}
