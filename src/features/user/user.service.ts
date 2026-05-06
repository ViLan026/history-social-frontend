import {axiosInstance} from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse, PageResponse } from '@/types/api';
import {
  UserResponse,
  UserSummaryResponse,
  UserUpdateRequest,
  ChangePasswordRequest,
  GetUsersParams
} from '@/features/user/user.types';

export const userService = {
  // Lấy danh sách users (Controller trả về thẳng PageResponse, KHÔNG bọc trong ApiResponse)
  getAllUsers: async (params: GetUsersParams): Promise<PageResponse<UserSummaryResponse>> => {
    const response = await axiosInstance.get<PageResponse<UserSummaryResponse>>(
      API_ENDPOINTS.USERS.BASE, 
      { params }
    );
    return response.data; 
  },

  getUserById: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.get<ApiResponse<UserResponse>>(
      API_ENDPOINTS.USERS.GET_BY_ID(id)
    );
    return response.data.data;
  },
  getMe: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.get<ApiResponse<UserResponse>>(
      API_ENDPOINTS.USERS.GET_BY_ID(id)
    );
    return response.data.data;
  },

  updateUser: async (id: string, data: UserUpdateRequest): Promise<UserResponse> => {
    const response = await axiosInstance.put<ApiResponse<UserResponse>>(
      API_ENDPOINTS.USERS.ME,
      data
    );
    return response.data.data;
  },

  changePassword: async (id: string, data: ChangePasswordRequest): Promise<void> => {
    const response = await axiosInstance.patch<ApiResponse<void>>(
      API_ENDPOINTS.USERS.CHANGE_PASSWORD(id), 
      data
    );
    return response.data.data;
  },

  lockUser: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.patch<ApiResponse<UserResponse>>(
      API_ENDPOINTS.USERS.LOCK(id)
    );
    return response.data.data;
  },

  unlockUser: async (id: string): Promise<UserResponse> => {
    const response = await axiosInstance.patch<ApiResponse<UserResponse>>(
      API_ENDPOINTS.USERS.UNLOCK(id)
    );
    return response.data.data;
  },
};