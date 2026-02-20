"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function useAuthGuard() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, [token, router]);

  return { checking, user };
}
