"use client";
import { api } from "@/services/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ImageCapture() {
  const [loading, setLoading] = useState(false);

  const upload = async (e:any) => {
    try {
      setLoading(true);

      const file = e.target.files[0];
      const form = new FormData();
      form.append("image", file);

      await api.post("/capture/upload-image", form);

      toast.success("Image uploaded");

    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" accept="image/*" onChange={upload}/>
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
