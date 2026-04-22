import {axiosInstance} from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse, PageResponse } from '@/types/api';
import { 
  ReactionRequest, 
  ReactionStatsResponse, 
  ReactionDetailResponse,
  ReactionType,
  GetReactionDetailsParams
} from '@/types/reaction';

export const reactionService = {
  // Bật, tắt, thay đổi reaction
  toggleReaction: async (request: ReactionRequest): Promise<ReactionType | null> => {
    const response = await axiosInstance.post<ApiResponse<ReactionType | null>>(
      API_ENDPOINTS.REACTIONS.BASE,
      request
    );
    return response.data.data;
  },

  // Lấy tổng số lượng và thống kê reaction của bài viết
  getReactionStats: async (postId: string): Promise<ReactionStatsResponse> => {
    const response = await axiosInstance.get<ApiResponse<ReactionStatsResponse>>(
      API_ENDPOINTS.REACTIONS.GET_STATS(postId)
    );
    return response.data.data;
  },

  // Lấy danh sách chi tiết người dùng đã reaction (Có phân trang và lọc theo type)
  getReactionDetails: async (
    postId: string, 
    params?: GetReactionDetailsParams
  ): Promise<PageResponse<ReactionDetailResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<ReactionDetailResponse>>>(
      API_ENDPOINTS.REACTIONS.GET_DETAILS(postId),
      { params }
    );
    return response.data.data;
  },
};