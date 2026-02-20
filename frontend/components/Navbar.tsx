"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">
      <h1 className="font-bold">Smart Field System</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
