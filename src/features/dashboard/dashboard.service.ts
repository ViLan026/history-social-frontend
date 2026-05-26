import { axiosInstance } from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse } from '@/types/api';
import {
  CountByStatusResponse,
  CountByTypeResponse,
  DashboardOverviewResponse,
  EngagementStatResponse,
  LatestPendingReportResponse,
  ReactionStatResponse,
  TimeSeriesStatResponse,
  TopReportedPostResponse,
  TopTagResponse,
} from './dashboard.types';

export const dashboardService = {
  getOverview: async (): Promise<DashboardOverviewResponse> => {
    const response = await axiosInstance.get<ApiResponse<DashboardOverviewResponse>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.OVERVIEW,
    );
    return response.data.data;
  },

  getPostStatusStats: async (): Promise<CountByStatusResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<CountByStatusResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.POST_STATUS_STATS,
    );
    return response.data.data;
  },

  getReportStatusStats: async (): Promise<CountByStatusResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<CountByStatusResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.REPORT_STATUS_STATS,
    );
    return response.data.data;
  },

  getReportReasonStats: async (): Promise<CountByTypeResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<CountByTypeResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.REPORT_REASON_STATS,
    );
    return response.data.data;
  },

  getNewUsers: async (days = 7): Promise<TimeSeriesStatResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<TimeSeriesStatResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.NEW_USERS,
      { params: { days } },
    );
    return response.data.data;
  },

  getNewPosts: async (days = 7): Promise<TimeSeriesStatResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<TimeSeriesStatResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.NEW_POSTS,
      { params: { days } },
    );
    return response.data.data;
  },

  getEngagementStats: async (days = 7): Promise<EngagementStatResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<EngagementStatResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.ENGAGEMENT_STATS,
      { params: { days } },
    );
    return response.data.data;
  },

  getTopReportedPosts: async (limit = 10): Promise<TopReportedPostResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<TopReportedPostResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.TOP_REPORTED_POSTS,
      { params: { limit } },
    );
    return response.data.data;
  },

  getLatestPendingReports: async (limit = 10): Promise<LatestPendingReportResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<LatestPendingReportResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.LATEST_PENDING_REPORTS,
      { params: { limit } },
    );
    return response.data.data;
  },

  getTopTags: async (limit = 10): Promise<TopTagResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<TopTagResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.TOP_TAGS,
      { params: { limit } },
    );
    return response.data.data;
  },

  getReactionStats: async (): Promise<ReactionStatResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<ReactionStatResponse[]>>(
      API_ENDPOINTS.ADMIN_DASHBOARD.REACTION_STATS,
    );
    return response.data.data;
  },
};