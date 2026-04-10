import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
const token = useAuthStore.getState().accessToken; 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;