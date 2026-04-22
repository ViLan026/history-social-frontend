import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from '@/types/user';

interface AuthState {
  // State
  isAuthenticated: boolean;
  user: UserResponse | null;


  // Actions
  setAuth: (isAuthenticated: boolean) => void;
  setUser: (user: UserResponse | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      // Gọi sau khi Login thành công (API trả về authenticated: true)
      setAuth: (isAuthenticated) => set({ isAuthenticated }),

      // Gọi sau khi lấy được thông tin User (ví dụ qua API /users/me)
      setUser: (user) => set({ user }),

      // Xóa state khi đăng xuất. 
      // Frontend gọi hàm này để dọn UI, nhưng vẫn phải gọi API /auth/logout để backend clear Cookie
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: 'auth-storage', 
      // Vẫn dùng persist để khi người dùng F5, giao diện không bị giật (nháy từ chưa đăng nhập sang đã đăng nhập).
      // Nếu cookie hết hạn mà auth-storage vẫn còn 'isAuthenticated: true', 
      // bạn cần xử lý ở Interceptor của Axios để tự động gọi hàm logout() khi nhận lỗi 401.
    }
  )
);