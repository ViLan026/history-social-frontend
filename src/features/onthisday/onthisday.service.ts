// history-social-frontend\src\features\onthisday\onthisday.service.ts
import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { ApiResponse, PageResponse, PaginationParams } from "@/types/api";
import { OnThisDay, OnThisDayRequest } from "./onthisday.types";

export const onThisDayService = {
  getTodayEvents: async (): Promise<OnThisDay[]> => {
    const response = await axiosInstance.get<ApiResponse<OnThisDay[]>>(
      API_ENDPOINTS.ON_THIS_DAY.TODAY
    );

    return response.data.data ?? [];
  },

  // admin 
  //  Lấy danh sách phân trang
  getAllAdminEvents: async (params?: PaginationParams): Promise<PageResponse<OnThisDay>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<OnThisDay>>>(
      API_ENDPOINTS.ADMIN_ON_THIS_DAY.ADMIN_GET_ALL,
      { params } // Truyền các tham số page, size, sort lên URL query
    );
    return response.data.data;
  },

  // Admin - Tạo mới sự kiện
  createEvent: async (data: OnThisDayRequest): Promise<OnThisDay> => {
    const response = await axiosInstance.post<ApiResponse<OnThisDay>>(
      API_ENDPOINTS.ADMIN_ON_THIS_DAY.ADMIN_CREATE,
      data
    );
    return response.data.data;
  },

  //  Cập nhật sự kiện
  updateEvent: async ({ id, data }: { id: string; data: OnThisDayRequest }): Promise<OnThisDay> => {
    const response = await axiosInstance.put<ApiResponse<OnThisDay>>(
      API_ENDPOINTS.ADMIN_ON_THIS_DAY.ADMIN_UPDATE(id),
      data
    );
    return response.data.data;
  },

  // - Xóa sự kiện
  deleteEvent: async (id: string): Promise<void> => {
    await axiosInstance.delete<ApiResponse<void>>(
      API_ENDPOINTS.ADMIN_ON_THIS_DAY.ADMIN_DELETE(id)
    );
  },



};