"use client";

import { useCurrentUser } from "@/features/user/useUser";
import { useAuthStore } from "@/features/auth/auth.store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // 1. Ép kích hoạt API lấy thông tin User hiện tại
  const { isLoading } = useCurrentUser();

  // 2. Cách viết chuẩn để check Hydration không lo bị lỗi SSR
  // Chúng ta lắng nghe hàm bẩm sinh useAuthStore.persist.hasHydrated qua một hàm check an toàn
  const isHydrated = useAuthStore(() => {
    if (typeof window === "undefined") return false; // Nếu ở Server, mặc định chưa hydrate
    return useAuthStore.persist?.hasHydrated() ?? false;
  });

  // 3. Trong lúc Zustand đang khôi phục dữ liệu HOẶC React Query đang đợi check token (getMe)
  if (!isHydrated || isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground font-medium">
            Đang đồng bộ trạng thái...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}