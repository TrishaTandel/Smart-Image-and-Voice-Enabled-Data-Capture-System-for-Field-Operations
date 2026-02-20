export default function UploadStatus({ loading }: { loading: boolean }) {
  if (!loading) return null;

  return (
    <div className="text-sm text-gray-600 animate-pulse">
      Processing data...
    </div>
  );
}
