import VoiceRecorder from "@/features/voice/VoiceRecorder";
import ImageCapture from "@/features/image/ImageCapture";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import useAuthGuard from "@/hooks/useAuthGuard";
import LogoutButton from "@/components/auth/LogoutButton";
import CapturePanel from "@/features/capture/CapturePanel";




export default function Dashboard() {
    const { checking, user } = useAuthGuard();

  if (checking) {
    return <p className="p-10 text-center">Checking authentication...</p>;
  }
    
    useAuthGuard();

  return  (
    
    <div className="p-10 space-y-6">
      <h2 className="text-2xl font-bold">Field Dashboard</h2>
      <h1 className="text-2xl font-bold">
        Welcome {user?.email}
      </h1>

      <VoiceRecorder />
      <ImageCapture />
       <ProtectedRoute>
         <Navbar />
      <div className="p-10 space-y-6">
        <h2 className="text-2xl font-bold">Field Dashboard</h2>
      </div>
      <div className="p-6">
      Dashboard Protected Content
    </div>
    </ProtectedRoute>
    <div className="flex justify-end">
  <LogoutButton />
</div>
    <CapturePanel />


    
    </div>
    
    
  );
}
