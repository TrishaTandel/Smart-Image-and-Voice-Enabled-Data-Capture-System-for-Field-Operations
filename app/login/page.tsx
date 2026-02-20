"use client";
import { useState } from "react";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const setToken = useAuthStore((s) => s.setToken);
  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async () => {
    
    try {
    const res = await api.post("/auth/login", { email, password });

    console.log("API RESPONSE:", res.data);

    const token = res.data.access_token || res.data.token;

    if (!token) throw new Error("Token not found");

    Cookies.set("token", token, { expires: 1 });

    setToken(token);

    router.push("/dashboard");

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    alert("Login failed");
  }
    

  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 border rounded space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
