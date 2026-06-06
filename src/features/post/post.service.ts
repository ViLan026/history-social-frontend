import { axiosInstance } from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { 
  PostCreationRequest, 
  PostUpdateRequest, 
  PostResponse, 
  FeedPostResponse
} from '@/features/post/post.types';
import { ApiResponse, PageResponse, PaginationParams } from '@/types/api';

export const postService = {
  // 1. Tạo bài viết
createPost: async (
  request: PostCreationRequest,
  files?: File[]
): Promise<PostResponse> => {
  const formData = new FormData();

  formData.append(
    "post",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    })
  );

  files?.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post<ApiResponse<PostResponse>>(
    API_ENDPOINTS.POSTS.BASE,
    formData
  );

  return response.data.data;
},
  // 2. Xem chi tiết bài viết
  getPostById: async (id: string): Promise<FeedPostResponse> => {
    const response = await axiosInstance.get<ApiResponse<FeedPostResponse>>(
      API_ENDPOINTS.POSTS.GET_BY_ID(id)
    );
    return response.data.data;
  },

  // 3. Khách vãng lai xem trang chủ (Chưa đăng nhập)
  getPublicHomePosts: async (params?: PaginationParams): Promise<PageResponse<FeedPostResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<FeedPostResponse>>>(
      API_ENDPOINTS.POSTS.HOME, 
      { params }
    );
    return response.data.data;
  },

  // 4. Người dùng xem trang chủ (Đã đăng nhập)
  getPublishedPosts: async (params?: PaginationParams): Promise<PageResponse<FeedPostResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<FeedPostResponse>>>(
      API_ENDPOINTS.POSTS.BASE, 
      { params }
    );
    return response.data.data;
  },

  // 5. Xem bài viết theo tác giả
  getPostsByAuthor: async (authorId: string, params?: PaginationParams): Promise<PageResponse<FeedPostResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<FeedPostResponse>>>(
      API_ENDPOINTS.POSTS.GET_BY_AUTHOR(authorId), 
      { params }
    );
    return response.data.data;
  },

  // 6. Tìm kiếm bài viết (Keyword là bắt buộc)
  searchPosts: async (keyword: string, params?: PaginationParams): Promise<PageResponse<FeedPostResponse>> => {
    const response = await axiosInstance.get<ApiResponse<PageResponse<FeedPostResponse>>>(
      API_ENDPOINTS.POSTS.SEARCH, 
      { params: { keyword, ...params } }
    );
    return response.data.data;
  },

  // 7. Cập nhật bài viết
  updatePost: async (id: string, request: PostUpdateRequest, files?: File[]): Promise<PostResponse> => {
    const formData = new FormData();
    const postBlob = new Blob([JSON.stringify(request)], { type: 'application/json' });
    formData.append('post', postBlob);

    if (files && files.length > 0) {
      files.forEach((file) => formData.append('files', file));
    }

    const response = await axiosInstance.put<ApiResponse<PostResponse>>(
      API_ENDPOINTS.POSTS.UPDATE(id), 
      formData
    );
    return response.data.data;
  },
};