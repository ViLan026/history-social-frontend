// src/lib/axios.ts
import axios from 'axios';
// import { useAuthStore } from '@/stores/useAuthStore'; // Chỉnh lại store chỉ lưu thông tin user

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Trình duyệt tự lo việc nhét access_token vào request.

// --- RESPONSE INTERCEPTOR ---
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response, // Trả về data nếu request thành công
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (access_token hết hạn hoặc không hợp lệ)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Khi queue chạy lại, trình duyệt tự động dùng access_token cookie mới
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi API refresh. 
        // Trình duyệt sẽ tự động gửi refresh_token cookie lên.
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true } 
        );

        // NẾU THÀNH CÔNG: Backend của bạn (theo code trên) đã tự động set lại 
        // 2 cookie access_token và refresh_token mới xuống trình duyệt rồi!
        
        processQueue(null);

        // Chạy lại request ban đầu (trình duyệt sẽ tự động lấy cookie mới gửi đi)
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn -> Yêu cầu đăng nhập lại
        processQueue(refreshError);
        
        // Gọi API logout để clear cookie ở server (nếu cần)
        // Cập nhật Zustand: set isAuthenticated = false
        
        if (typeof window !== 'undefined') {
           window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);