import {axiosInstance} from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse, PageResponse, PaginationParams } from '@/types/api';
import { CommentRequest, CommentResponse } from '@/types/comment';

export const commentService = {
  // Tạo bình luận mới
  createComment: async (request: CommentRequest): Promise<CommentResponse> => {
    // Controller của bạn trả về thẳng ApiResponse từ commentService, nên mình vẫn map .data.data như chuẩn chung
    const response = await axiosInstance.post<ApiResponse<CommentResponse>>(
      API_ENDPOINTS.COMMENTS.BASE,
      request
    );
    return response.data.data;
  },

  // Lấy danh sách bình luận theo bài viết (Phân trang)
  getCommentsByPostId: async (
    postId: string, 
    params?: PaginationParams
  ): Promise<PageResponse<CommentResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<CommentResponse>>>(
      API_ENDPOINTS.COMMENTS.GET_BY_POST(postId),
      { params }
    );
    return response.data.data;
  },

  // Xóa bình luận
  deleteComment: async (commentId: string): Promise<void> => {
    const response = await axiosInstance.delete<ApiResponse<void>>(
      API_ENDPOINTS.COMMENTS.DELETE(commentId)
    );
    return response.data.data;
  },
};