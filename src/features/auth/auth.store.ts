import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserResponse } from '@/features/user/user.types';

interface AuthState {
  // State
  isAuthenticated: boolean;

  // Actions
  setAuth: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      // Gọi sau khi Login thành công (API trả về authenticated: true)
      setAuth: (isAuthenticated) => set({ isAuthenticated }),

      // Gọi sau khi lấy được thông tin User (ví dụ qua API /users/me)

      logout: () =>
        set({
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);