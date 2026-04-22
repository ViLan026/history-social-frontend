import {axiosInstance} from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse, PageResponse, PaginationParams } from '@/types/api';
import {
  BookmarkCountResponse,
  BookmarkResponse,
  BookmarkStatusResponse,
  BookmarkToggleResponse,
} from '@/types/bookmark';

export const bookmarkService = {
  // Bật/tắt lưu bài viết (Toggle bookmark)
  toggleBookmark: async (postId: string): Promise<BookmarkToggleResponse> => {
    const response = await axiosInstance.post<ApiResponse<BookmarkToggleResponse>>(
      API_ENDPOINTS.BOOKMARKS.TOGGLE(postId)
    );
    return response.data.data;
  },

  // Lấy danh sách bài viết đã lưu (Có phân trang)
  getBookmarkedPosts: async (params?: PaginationParams): Promise<PageResponse<BookmarkResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<BookmarkResponse>>>(
      API_ENDPOINTS.BOOKMARKS.BASE,
      { params }
    );
    return response.data.data;
  },

  // Kiểm tra trạng thái lưu của một bài viết
  checkBookmarkStatus: async (postId: string): Promise<BookmarkStatusResponse> => {
    const response = await axiosInstance.get<ApiResponse<BookmarkStatusResponse>>(
      API_ENDPOINTS.BOOKMARKS.CHECK(postId)
    );
    return response.data.data;
  },

  // Đếm tổng số bài viết đã lưu của user
  getBookmarkCount: async (): Promise<BookmarkCountResponse> => {
    const response = await axiosInstance.get<ApiResponse<BookmarkCountResponse>>(
      API_ENDPOINTS.BOOKMARKS.COUNT
    );
    return response.data.data;
  },
};