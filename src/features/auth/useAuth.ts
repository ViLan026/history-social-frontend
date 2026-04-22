import { useMutation } from '@tanstack/react-query';
import { authService } from './auth.service';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log("Dữ liệu login trả về:", data); // Kiểm tra xem data.authenticated có thực sự là true không
      
      if (data.authenticated) {
        setAuth(true); // Cập nhật store
        console.log("Đã setAuth(true), chuẩn bị redirect...");
        
        
        router.push('/'); // Dùng push hoặc replace
        // window.location.href = '/';
        // router.refresh();
      } else {
        console.error("Backend trả về thành công nhưng authenticated = false");
      }
    },
    onError: (error) => {
      console.error("Lỗi đăng nhập:", error);
    }
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      router.push('/login');
    },
  });
};


export const useLogout = () => {
  const router = useRouter();
  // Lấy hàm logout từ store ra ĐỂ SỬ DỤNG
  const logoutStore = useAuthStore((state) => state.logout); 

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutStore(); // Gọi hàm xóa state trong store
      router.replace('/login');
      router.refresh();
    },
  });
};