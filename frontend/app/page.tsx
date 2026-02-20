import VoiceRecorder from "@/features/voice/VoiceRecorder";
import ImageCapture from "@/features/image/ImageCapture";
export default function Home() {
  return (
    <main className="max-w-xl mx-auto mt-10 space-y-5">
      <h1 className="text-3xl font-bold">
        Smart Field Data Capture System
      </h1>
      <VoiceRecorder />
      <ImageCapture />
    </main>
  );
}
