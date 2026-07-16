"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import { refreshAccessToken } from "@/lib/axios";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    const initializeAuth = async () => {
      if (isAuthenticated) return;

      try {
        console.log("Đang thử khôi phục phiên đăng nhập...");

        await refreshAccessToken();
        setAuth(true);

        console.log("Khôi phục phiên đăng nhập thành công.");
      } catch {
        logout();

        console.log("Không có phiên đăng nhập hợp lệ.");
      }
    };

    void initializeAuth();
  }, [isAuthenticated, setAuth, logout]);

  return <>{children}</>;
}