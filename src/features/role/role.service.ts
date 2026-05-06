import {axiosInstance} from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse } from '@/types/api';
import { RoleResponse, RoleCreationRequest, RoleUpdateRequest } from '@/features/user/user.types';

export const roleService = {
  getAllRoles: async (): Promise<RoleResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<RoleResponse[]>>(API_ENDPOINTS.ROLES.BASE);
    return response.data.data;
  },

  getRoleById: async (id: string): Promise<RoleResponse> => {
    const response = await axiosInstance.get<ApiResponse<RoleResponse>>(API_ENDPOINTS.ROLES.GET_BY_ID(id));
    return response.data.data;
  },

  createRole: async (data: RoleCreationRequest): Promise<RoleResponse> => {
    const response = await axiosInstance.post<ApiResponse<RoleResponse>>(API_ENDPOINTS.ROLES.BASE, data);
    return response.data.data;
  },

  updateRole: async (id: string, data: RoleUpdateRequest): Promise<RoleResponse> => {
    const response = await axiosInstance.put<ApiResponse<RoleResponse>>(API_ENDPOINTS.ROLES.UPDATE(id), data);
    return response.data.data;
  },
};