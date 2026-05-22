import { axiosInstance } from '@/lib/axios';
import { ApiResponse, PageResponse } from '@/types/api';
import { FollowResponse, GetFollowsParams } from './follow.types';
import { API_ENDPOINTS } from '@/constants/api-endpoints';


export const followService = {
  followUser: async (userId: string): Promise<void> => {
    await axiosInstance.post<ApiResponse<void>>(API_ENDPOINTS.FOLLOW.FOLLOW_USER(userId));
  },

  unfollowUser: async (userId: string): Promise<void> => {
    await axiosInstance.delete<ApiResponse<void>>(API_ENDPOINTS.FOLLOW.UNFOLLOW_USER(userId));
  },

  getFollowers: async (userId: string, params: GetFollowsParams): Promise<PageResponse<FollowResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<FollowResponse>>>(
      API_ENDPOINTS.FOLLOW.GET_FOLLOWERS(userId),
      { params }
    );
    return response.data.data; 
  },

  getFollowing: async (userId: string, params: GetFollowsParams): Promise<PageResponse<FollowResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<FollowResponse>>>(
      API_ENDPOINTS.FOLLOW.GET_FOLLOWING(userId),
      { params }
    );
    return response.data.data;
  },

  getFollowSuggestions: async (limit: number = 10): Promise<FollowResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<FollowResponse[]>>(
      API_ENDPOINTS.FOLLOW.GET_SUGGESTIONS,
      { params: { limit } }
    );
    return response.data.data; // Trả về List<FollowResponse> trực tiếp
  }
};