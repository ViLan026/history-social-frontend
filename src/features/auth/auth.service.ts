import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import {
  UserCreationRequest,
  UserResponse,
  AuthenticationRequest,
  AuthenticationResponse,
  LogoutRequest,
  IntrospectRequest,
  IntrospectResponse,
  RefreshRequest,
} from '@/types/auth';

export const authService = {
  // Đăng ký
  register: async (data: UserCreationRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post<ApiResponse<UserResponse>>('/auth/register', data);
    return response.data.data;
  },

  // Đăng nhập
  login: async (data: AuthenticationRequest): Promise<AuthenticationResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthenticationResponse>>('/auth/login', data);
    return response.data.data;
  },

  // Đăng xuất
  logout: async (data: LogoutRequest): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/logout', data);
    return response.data.data; // data có thể là null theo backend của bạn
  },

  // Kiểm tra token hợp lệ
  introspect: async (data: IntrospectRequest): Promise<IntrospectResponse> => {
    const response = await axiosInstance.post<ApiResponse<IntrospectResponse>>('/auth/introspect', data);
    return response.data.data;
  },

  // Refresh token
  refresh: async (data: RefreshRequest): Promise<AuthenticationResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthenticationResponse>>('/auth/refresh', data);
    return response.data.data;
  },
};