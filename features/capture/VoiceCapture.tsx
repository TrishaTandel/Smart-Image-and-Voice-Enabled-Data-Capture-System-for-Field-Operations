"use client";

import { useState, useRef } from "react";

export default function VoiceCapture({ onRecorded }: { onRecorded: (blob: Blob) => void }) {
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      onRecorded(blob);
    };

    recorder.start();
    mediaRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded text-white ${
          recording ? "bg-red-500" : "bg-green-600"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
