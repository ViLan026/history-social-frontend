export default function Loading() {
  try {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">
          Đang tải...
        </div>
      </div>
    );
  } catch (error) {
    console.error("Loading error:", error);
    return null;
  }
}