"use client";

import { useRef } from "react";

export default function ImageCapture({ onCapture }: { onCapture: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => {
          if (e.target.files?.[0]) onCapture(e.target.files[0]);
        }}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Capture Image
      </button>
    </div>
  );
}
