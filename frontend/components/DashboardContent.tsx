"use client";

import VoiceRecorder from "@/features/voice/VoiceRecorder";
import ImageCapture from "@/features/image/ImageCapture";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/auth/LogoutButton";
import CapturePanel from "@/features/capture/CapturePanel";
import { useAuthStore } from "@/store/authStore";

export default function DashboardContent() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="p-10 space-y-6">
      <Navbar />

      <h2 className="text-2xl font-bold">Field Dashboard</h2>

      <h1 className="text-xl font-semibold">
        Welcome {user?.email}
      </h1>

      <VoiceRecorder />
      <ImageCapture />
      <CapturePanel />

      <div className="flex justify-end">
        <LogoutButton />
      </div>
    </div>
  );
}
