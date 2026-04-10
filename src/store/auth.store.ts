// src/store/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from '@/types/auth';

interface AuthState {
  // State
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: UserResponse | null; // Sẽ được cập nhật sau khi gọi API lấy thông tin profile

  // Actions
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: UserResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null,

      // Gọi ngay sau khi Login thành công
      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      // Gọi sau khi lấy được thông tin User (ví dụ qua API /users/my-profile)
      setUser: (user) => set({ user }),

      // Xóa toàn bộ dữ liệu khi đăng xuất hoặc khi token hết hạn
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      // Tên key lưu trong localStorage của trình duyệt
      name: 'auth-storage', 
      
      // (Tùy chọn) Chỉ định những state nào bạn thực sự muốn lưu vào localStorage. 
      // Ở đây mình lưu tất cả, nhưng nếu bạn không muốn lưu thông tin user mà muốn fetch lại mỗi lần f5, 
      // bạn có thể dùng partialize.
    }
  )
);