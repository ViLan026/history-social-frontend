import axiosInstance from '@/lib/axios';
import { ApiResponse, PageResponse } from '@/types/api';
import {
  UserResponse,
  UserSummaryResponse,
  UserUpdateRequest,
  ChangePasswordRequest,
  UserCreationRequest,
  GetUsersParams
} from '@/types/user';

export const userService = {
  // Lấy danh sách users (có phân trang và tìm kiếm)
  getAllUsers: async (params: GetUsersParams): Promise<PageResponse<UserSummaryResponse>> => {
    const response = await axiosInstance.get<PageResponse<UserSummaryResponse>>('/users', { params });
    return response.data; // Chú ý: Backend của bạn trả về thẳng PageResponse chứ không bọc trong ApiResponse
  },

  // Lấy chi tiết user
  getUserById: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.get<ApiResponse<UserResponse>>(`/users/${id}`);
    return response.data.data;
  },

  // Tạo user mới (từ Admin)
  createUser: async (data: UserCreationRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post<ApiResponse<UserResponse>>('/users', data);
    return response.data.data;
  },

  // Cập nhật profile
  updateUser: async (id: string, data: UserUpdateRequest): Promise<UserResponse> => {
    const response = await axiosInstance.put<ApiResponse<UserResponse>>(`/users/${id}`, data);
    return response.data.data;
  },

  // Đổi mật khẩu
  changePassword: async (id: string, data: ChangePasswordRequest): Promise<void> => {
    const response = await axiosInstance.patch<ApiResponse<void>>(`/users/${id}/password`, data);
    return response.data.data;
  },

  // Khóa user
  lockUser: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.patch<ApiResponse<UserResponse>>(`/users/${id}/lock`);
    return response.data.data;
  },

  // Mở khóa user
  unlockUser: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.patch<ApiResponse<UserResponse>>(`/users/${id}/unlock`);
    return response.data.data;
  },
};