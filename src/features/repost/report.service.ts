// @/features/report/report.service.ts
import { axiosInstance } from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse, PageResponse } from '@/types/api';
import { 
  CreateReportRequest, 
  ReportResponse, 
  MyReportResponse 
} from "./report.types";

export const reportService = {
  // 1. Tạo một báo cáo/tố cáo mới
  createReport: async (data: CreateReportRequest): Promise<ReportResponse> => {
    const response = await axiosInstance.post<ApiResponse<ReportResponse>>(
      API_ENDPOINTS.REPORTS.BASE, 
      data
    );
    return response.data.data; 
  },

  getMyReports: async (page: number = 0, size: number = 20): Promise<PageResponse<MyReportResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<MyReportResponse>>>(
      API_ENDPOINTS.REPORTS.ME, 
      {
        params: { page, size }
      }
    );
    return response.data.data;
  }
};