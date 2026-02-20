"use client";
import { useState, useRef } from "react";
import { api } from "@/services/api";
import toast from "react-hot-toast";


export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorder = useRef<any>(null);
  const chunks = useRef<any[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (e:any) => {
      chunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
  try {
    setLoading(true);

    const blob = new Blob(chunks.current, { type: "audio/webm" });

    const formData = new FormData();
    formData.append("file", blob);

    await api.post("/capture/upload-voice", formData);

    toast.success("Voice uploaded successfully");
    chunks.current = [];

  } catch (err) {
    toast.error("Upload failed");
  } finally {
    setLoading(false);
  }
};


    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4 border rounded">
      <button
        onClick={recording ? stopRecording : startRecording}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
