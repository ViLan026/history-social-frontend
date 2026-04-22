import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reactionService } from './reaction.service';
import { ReactionRequest, GetReactionDetailsParams } from '@/types/reaction';

// Quản lý Query Keys tập trung
export const REACTION_QUERY_KEYS = {
  all: ['reactions'] as const,
  stats: (postId: string) => [...REACTION_QUERY_KEYS.all, 'stats', postId] as const,
  details: (postId: string, params?: GetReactionDetailsParams) => 
    [...REACTION_QUERY_KEYS.all, 'details', postId, params] as const,
};

// 1. Hook lấy thống kê reaction (tổng số và từng loại)
export const useReactionStats = (postId: string) => {
  return useQuery({
    queryKey: REACTION_QUERY_KEYS.stats(postId),
    queryFn: () => reactionService.getReactionStats(postId),
    enabled: !!postId,
  });
};

// 2. Hook lấy danh sách người dùng đã thả reaction
export const useReactionDetails = (postId: string, params?: GetReactionDetailsParams) => {
  return useQuery({
    queryKey: REACTION_QUERY_KEYS.details(postId, params),
    queryFn: () => reactionService.getReactionDetails(postId, params),
    enabled: !!postId,
  });
};

// 3. Hook bật/tắt/đổi reaction
export const useToggleReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ReactionRequest) => reactionService.toggleReaction(request),
    onSuccess: (_, variables) => {
      // Invalidate để refetch lại số lượng thống kê và danh sách chi tiết của bài viết đó
      queryClient.invalidateQueries({
        queryKey: REACTION_QUERY_KEYS.stats(variables.postId)
      });
      // Invalidate danh sách người dùng đã thả react
      queryClient.invalidateQueries({
        queryKey: ['reactions', 'details', variables.postId] 
      });
    },
  });
};