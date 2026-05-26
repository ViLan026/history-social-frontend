// src/providers/AppInitializer.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import { axiosInstance } from "@/lib/axios";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Chỉ tự động gọi refresh nếu Zustand đang bảo là `false` (chưa đăng nhập hoặc hết hạn 5 phút)
      if (!isAuthenticated) {
        try {
          console.log("Phát hiện isAuthenticated = false, tiến hành gọi thử /auth/refresh ngầm...");
          
          // Gửi request rỗng lên endpoint refresh. 
          // Cấu hình withCredentials: true ở axiosInstance sẽ tự đính kèm Refresh Token từ Cookie.
          await axiosInstance.post("/auth/refresh", {});
          
          // Nếu Backend trả về 200/201 OK -> Token hợp lệ -> Cập nhật trạng thái đăng nhập
          setAuth(true);
          console.log("Silent Refresh thành công! Đã khôi phục trạng thái isAuthenticated = true.");
        } catch (error) {
          // Nếu lỗi (401/403) tức là không có refresh token hoặc hết hạn hoàn toàn -> Xóa sạch về Guest
          logout();
          console.log("Không thể gia hạn ngầm (Hết hạn hoàn toàn hoặc chưa từng đăng nhập). Chuyển sang quyền Khách.");
        }
      }
      setIsChecking(false);
    };

    initializeAuth();
  }, [isAuthenticated, setAuth, logout]);

  // Vì trang chủ là PUBLIC (không cần bắt người dùng nhìn màn hình loading trắng xóa)
  // Ta cho render children ngay lập tức. Các API private bên trong sẽ tự động ăn theo sau khi check xong.
  return <>{children}</>;
}