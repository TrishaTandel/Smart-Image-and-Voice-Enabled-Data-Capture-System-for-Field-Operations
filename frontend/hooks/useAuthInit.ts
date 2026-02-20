import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useAuthInit = () => {
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);
};
