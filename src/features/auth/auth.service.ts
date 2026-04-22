import {axiosInstance} from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import {
  UserCreationRequest,
  AuthenticationRequest,
  AuthenticationResponse,
  IntrospectResponse,
} from '@/types/auth';

import { UserResponse } from '@/types/user';

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
  logout: async (): Promise<void> => {await axiosInstance.post<ApiResponse<void>>('/auth/logout');},

  // Kiểm tra trạng thái đăng nhập / token
  introspect: async (): Promise<IntrospectResponse> => {
    const response = await axiosInstance.post<ApiResponse<IntrospectResponse>>('/auth/introspect');
    return response.data.data;
  },

  // Refresh token
  refresh: async (): Promise<AuthenticationResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthenticationResponse>>('/auth/refresh');
    return response.data.data;
  },
};