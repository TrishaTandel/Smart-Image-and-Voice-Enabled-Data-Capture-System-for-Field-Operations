"use client";

import { useState } from "react";
import VoiceCapture from "./VoiceCapture";
import ImageCapture from "./ImageCapture";
import UploadStatus from "./UploadStatus";

export default function CapturePanel() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (formData: FormData) => {
    setLoading(true);

    await fetch("/api/capture", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
  };

  const handleVoice = (blob: Blob) => {
    const form = new FormData();
    form.append("audio", blob);
    handleUpload(form);
  };

  const handleImage = (file: File) => {
    const form = new FormData();
    form.append("image", file);
    handleUpload(form);
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-lg space-y-6 border">
      <h2 className="text-xl font-semibold">Field Capture Panel</h2>

      <VoiceCapture onRecorded={handleVoice} />
      <ImageCapture onCapture={handleImage} />

      <UploadStatus loading={loading} />
    </div>
  );
}
