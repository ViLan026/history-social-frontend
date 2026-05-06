import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUserStore } from '../user/user.store';

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

      logout: () =>{
        useUserStore.getState().clearUser(); // clear user 
        set({ isAuthenticated: false });
      },

    }),
    {
      name: 'auth-storage', 
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);