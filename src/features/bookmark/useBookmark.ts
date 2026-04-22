import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkService } from './bookmark.service';
import { PaginationParams } from '@/types/api';

// Định nghĩa Query Keys để tái sử dụng và tránh sai sót
export const BOOKMARK_QUERY_KEYS = {
  all: ['bookmarks'] as const,
  lists: () => [...BOOKMARK_QUERY_KEYS.all, 'list'] as const,
  list: (params?: PaginationParams) => [...BOOKMARK_QUERY_KEYS.lists(), params] as const,
  status: (postId: string) => [...BOOKMARK_QUERY_KEYS.all, 'status', postId] as const,
  count: () => [...BOOKMARK_QUERY_KEYS.all, 'count'] as const,
};

//  Hook lấy danh sách bài viết đã lưu
export const useBookmarkedPosts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: BOOKMARK_QUERY_KEYS.list(params),
    queryFn: () => bookmarkService.getBookmarkedPosts(params),
  });
};

//  Hook kiểm tra trạng thái lưu của một bài viết cụ thể
export const useBookmarkStatus = (postId: string) => {
  return useQuery({
    queryKey: BOOKMARK_QUERY_KEYS.status(postId),
    queryFn: () => bookmarkService.checkBookmarkStatus(postId),
    enabled: !!postId, // Chỉ gọi API khi postId tồn tại
  });
};

//  Hook lấy tổng số lượng bài viết đã lưu
export const useBookmarkCount = () => {
  return useQuery({
    queryKey: BOOKMARK_QUERY_KEYS.count(),
    queryFn: () => bookmarkService.getBookmarkCount(),
  });
};

//  Hook để toggle (bật/tắt) bookmark
export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => bookmarkService.toggleBookmark(postId),
    onSuccess: (data, postId) => {
      // Làm mới lại các query liên quan để UI tự động cập nhật
      queryClient.invalidateQueries({ queryKey: BOOKMARK_QUERY_KEYS.status(postId) });
      queryClient.invalidateQueries({ queryKey: BOOKMARK_QUERY_KEYS.count() });
      queryClient.invalidateQueries({ queryKey: BOOKMARK_QUERY_KEYS.lists() });
    },
  });
};