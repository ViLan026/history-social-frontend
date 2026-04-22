import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService } from './comment.service';
import { CommentRequest } from '@/types/comment';
import { PaginationParams } from '@/types/api';

// Định nghĩa Query Keys để quản lý cache
export const COMMENT_QUERY_KEYS = {
  all: ['comments'] as const,
  lists: () => [...COMMENT_QUERY_KEYS.all, 'list'] as const,
  // Cấu trúc key có chứa postId để tách biệt cache của các bài viết khác nhau
  list: (postId: string, params?: PaginationParams) => 
    [...COMMENT_QUERY_KEYS.lists(), postId, params] as const,
};

//  Hook lấy danh sách comment của một bài viết
export const useCommentsByPost = (postId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEYS.list(postId, params),
    queryFn: () => commentService.getCommentsByPostId(postId, params),
    enabled: !!postId, // Chỉ gọi API khi có postId
  });
};

//  Hook tạo comment mới
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CommentRequest) => commentService.createComment(request),
    onSuccess: (data, variables) => {
      // Làm mới danh sách comment của CHÍNH BÀI VIẾT ĐÓ để hiện comment mới lên ngay lập tức
      queryClient.invalidateQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId]
      });
    },
  });
};

//  Hook xóa comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Cần truyền cả commentId (để gọi API) và postId (để invalidate đúng cache)
    mutationFn: ({ commentId }: { commentId: string; postId: string }) => 
      commentService.deleteComment(commentId),
    onSuccess: (_, variables) => {
      // Làm mới danh sách comment của bài viết sau khi xóa
      queryClient.invalidateQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId]
      });
    },
  });
};