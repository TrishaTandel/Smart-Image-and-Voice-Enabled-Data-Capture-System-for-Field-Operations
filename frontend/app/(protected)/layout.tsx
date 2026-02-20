"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function ProtectedLayout({ children }) {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) return <p className="p-10 text-center">Checking auth...</p>;

  return children;
}
