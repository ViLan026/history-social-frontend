import { useState } from 'react';
import { postService } from './post.service';
import { PostCreationRequest, PostUpdateRequest } from '@/types/post';

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (data: PostCreationRequest, files?: File[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await postService.createPost(data, files);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo bài viết');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (id: string, data: PostUpdateRequest, files?: File[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await postService.updatePost(id, data, files);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật bài viết');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    updatePost,
    isLoading,
    error,
  };
};