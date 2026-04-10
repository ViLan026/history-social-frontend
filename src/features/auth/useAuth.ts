import { useMutation } from '@tanstack/react-query';
import { authService } from './auth.service';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore(); // Lưu ý: Mình sẽ cần update store một chút nhé

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Vì backend trả về accessToken và refreshToken
      // Chúng ta sẽ lưu token vào Zustand store trước
      setTokens(data.accessToken, data.refreshToken);
      
      // Chuyển hướng về trang chủ
      router.push('/');
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      // Đăng ký xong thì chuyển qua trang login bắt đăng nhập
      router.push('/login');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout, refreshToken } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout({ refreshToken: refreshToken || '' }),
    onSuccess: () => {
      logout(); // Xoá data trong store
      router.push('/login');
    },
  });
};