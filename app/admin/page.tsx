"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import useRoleGuard from "@/hooks/useRoleGuard";
import { useAuthStore } from "@/store/authStore";
const user = useAuthStore((s)=>s.user);

{user?.role === "admin" && (
  <button>Admin Panel</button>
)}


export default function AdminPage() {
  const { checking } = useAuthGuard();
  useRoleGuard(["admin"]);

  if (checking) return <p>Checking auth...</p>;

  return <div>Admin Dashboard</div>;
}
