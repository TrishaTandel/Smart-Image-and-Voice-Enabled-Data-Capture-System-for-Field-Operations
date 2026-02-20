"use client";
import { useAuthInit } from "@/hooks/useAuthInit";

export default function ClientProvider({ children }: any) {
  useAuthInit();
  return children;
}
