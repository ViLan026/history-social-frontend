// src/features/post/post.service.ts

import {axiosInstance} from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { 
  PostCreationRequest, 
  PostUpdateRequest, 
  PostResponse, 
  PostSummaryResponse 
} from '@/features/post/post.types';
import { ApiResponse, PageResponse, PaginationParams } from '@/types/api';

export const postService = {
  // Tạo bài viết mới (Hỗ trợ upload file đính kèm)
  createPost: async (request: PostCreationRequest, files?: File[]): Promise<PostResponse> => {
    const formData = new FormData();
    
    // Tạo Blob dạng JSON để Spring Boot @RequestPart hiểu đây là đối tượng JSON (DTO)
    const postBlob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });
    formData.append('post', postBlob);

    // Append danh sách files nếu có
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    const response = await axiosInstance.post(API_ENDPOINTS.POSTS.BASE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Lấy chi tiết bài viết theo ID
  getPostById: async (id: string): Promise<PostResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.GET_BY_ID(id));
    return response.data.data;
  },

  // Lấy danh sách bài viết đã xuất bản (Phân trang)
  getPublishedPosts: async (params?: PaginationParams): Promise<PageResponse<PostSummaryResponse>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.BASE, { params });
    return response.data.data;
  },

  // Lấy danh sách bài viết theo tác giả
  getPostsByAuthor: async (authorId: string, params?: PaginationParams): Promise<PageResponse<PostSummaryResponse>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.GET_BY_AUTHOR(authorId), { params });
    return response.data.data;
  },

  // Tìm kiếm bài viết theo từ khóa
  searchPosts: async (keyword: string, params?: PaginationParams): Promise<PageResponse<PostSummaryResponse>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.SEARCH, {
      params: { keyword, ...params },
    });
    return response.data.data;
  },

  // Cập nhật bài viết
  updatePost: async (id: string, request: PostUpdateRequest, files?: File[]): Promise<PostResponse> => {
    const formData = new FormData();
    
    const postBlob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });
    formData.append('post', postBlob);

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    const response = await axiosInstance.put(API_ENDPOINTS.POSTS.GET_BY_ID(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};