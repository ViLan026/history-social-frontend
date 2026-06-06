// @/features/report/report.service.ts
import { axiosInstance } from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse, PageResponse } from '@/types/api';
import { 
  CreateReportRequest, 
  ReportResponse, 
  MyReportResponse, 
  ModerationReportResponse,
  ReviewReportRequest,
  ReportTargetType
} from "./report.types";

export const reportService = {
  // Tạo một báo cáo/tố cáo mới
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
  },
  
  // admin 
  // Lấy danh sách các báo cáo đang chờ xử lý
    getPendingReports: async (
        page: number = 0,
        size: number = 20,
        targetType?: ReportTargetType
    ): Promise<PageResponse<ModerationReportResponse>> => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<ModerationReportResponse>>>(
            API_ENDPOINTS.ADMIN_REPORTS.PENDING,
            { params: {page,  size, targetType} }
        );

        return response.data.data;
    },

    // Admin xử lý/duyệt một báo cáo (RESOLVED hoặc DISMISSED)
    reviewReport: async (id: string, request: ReviewReportRequest): Promise<ReportResponse> => {
        const response = await axiosInstance.patch<ApiResponse<ReportResponse>>(
            API_ENDPOINTS.ADMIN_REPORTS.REVIEW(id),
            request
        );
        return response.data.data;
    }


};