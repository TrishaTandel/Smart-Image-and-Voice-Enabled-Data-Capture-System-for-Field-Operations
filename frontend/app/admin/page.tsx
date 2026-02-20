"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import useRoleGuard from "@/hooks/useRoleGuard";
import { useAuthStore } from "@/store/authStore";


export default function AdminPage() {
  const { checking } = useAuthGuard();
  useRoleGuard(["admin"]);

  if (checking) return <p>Checking auth...</p>;
  
  const user = useAuthStore((s)=>s.user);

{user?.role === "admin" && (
  <button>Admin Panel</button>
)}

  return <div>Admin Dashboard</div>;
}
