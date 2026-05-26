import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { followService } from './follow.service';
import { GetFollowsParams } from './follow.types';

export const FOLLOW_QUERY_KEYS = {
  all: ['follows'] as const,
  suggestions: (limit: number) => [...FOLLOW_QUERY_KEYS.all, 'suggestions', limit] as const,
  followers: (userId: string, params: GetFollowsParams) => [...FOLLOW_QUERY_KEYS.all, 'followers', userId, params] as const,
  following: (userId: string, params: GetFollowsParams) => [...FOLLOW_QUERY_KEYS.all, 'following', userId, params] as const,
};

// Hook lấy danh sách gợi ý
export const useFollowSuggestions = (limit: number,isAuthenticated: boolean = true) => {
  return useQuery({
    queryKey: FOLLOW_QUERY_KEYS.suggestions(limit),
    queryFn: () => followService.getFollowSuggestions(limit),
    enabled: isAuthenticated && limit > 0, 
  });
};

// Hook lấy danh sách Followers công khai
export const useFollowers = (userId: string, params: GetFollowsParams) => {
  return useQuery({
    queryKey: FOLLOW_QUERY_KEYS.followers(userId, params),
    queryFn: () => followService.getFollowers(userId, params),
    enabled: !!userId,
  });
};

// Hook lấy danh sách những người đang Following
export const useFollowingList = (userId: string, params: GetFollowsParams) => {
  return useQuery({
    queryKey: FOLLOW_QUERY_KEYS.following(userId, params),
    queryFn: () => followService.getFollowing(userId, params),
    enabled: !!userId,
  });
};

// Hook thực thi hành động Follow
export const useFollowUserAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => followService.followUser(userId),
    onSuccess: () => {
      // Làm mới toàn bộ cache liên quan đến quan hệ follow
      queryClient.invalidateQueries({ queryKey: FOLLOW_QUERY_KEYS.all });
    },
  });
};

// Hook thực thi hành động Unfollow
export const useUnfollowUserAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => followService.unfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOLLOW_QUERY_KEYS.all });
    },
  });
};