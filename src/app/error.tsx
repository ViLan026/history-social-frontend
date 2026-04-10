"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">
        Đã xảy ra lỗi
      </h2>

      <p className="text-red-300 text-sm">
        {error.message || "Unknown error"}
      </p>

      <button
        onClick={() => {
          try {
            reset();
          } catch (err) {
            console.error("Reset error:", err);
          }
        }}
        className="px-6 py-3 rounded-full bg-white text-black"
      >
        Thử lại
      </button>
    </div>
  );
}