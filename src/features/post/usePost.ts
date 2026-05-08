import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PaginationParams } from '@/types/api';
import { PostCreationRequest, PostUpdateRequest } from '@/features/post/post.types';
import { postService } from './post.service';
import { toast } from 'sonner';

// Infinite Scroll Feed
export const useInfiniteFeed = () => {
  return useInfiniteQuery({
    queryKey: postKeys.infiniteFeed(),
    queryFn: ({ pageParam = 0 }) =>
      postService.getFeed({ page: pageParam, size: 15, sort: 'createdAt,desc' }),
    
    initialPageParam: 0,
    getNextPageParam: (lastPage) => 
      lastPage.last ? undefined : lastPage.currentPage + 1,
    
    staleTime: 1000 * 60 * 3,   // 3 phút
    gcTime: 1000 * 60 * 10,
  });
};

// Query Keys
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...postKeys.lists(), params] as const,
  infiniteFeed: () => [...postKeys.all, 'infinite-feed'] as const,
  detail: (id: string) => [...postKeys.all, 'detail', id] as const,
  byAuthor: (authorId: string, params?: PaginationParams) => 
    [...postKeys.all, 'author', authorId, params] as const,
  search: (keyword: string, params?: PaginationParams) =>
    [...postKeys.all, 'search', keyword, params] as const,
};

// Lấy danh sách post
export const usePosts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postService.getPublishedPosts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};

export const useFeed = (params?: PaginationParams) => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postService.getFeed(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};

// Lấy chi tiết post
export const usePost = (id: string, enabled = true) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postService.getPostById(id),
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 5,
  });
};

// Theo author
export const usePostsByAuthor = (authorId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: postKeys.byAuthor(authorId, params),
    queryFn: () => postService.getPostsByAuthor(authorId, params),
    enabled: !!authorId,
    staleTime: 1000 * 60 * 5,
  });
};

// Search
export const useSearchPosts = (
  keyword: string,
  params?: PaginationParams
) => {
  return useQuery({
    queryKey: postKeys.search(keyword, params),
    queryFn: () => postService.searchPosts(keyword, params),
    enabled: !!keyword,
  });
};



//  Hook to create a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data, files }: { data: PostCreationRequest; files?: File[] }) => 
      postService.createPost(data, files),
    
    onSuccess: () => {
      // Invalidate and refetch posts list after successful creation
      queryClient.invalidateQueries({ queryKey: postKeys.infiniteFeed() });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      toast.success('Đăng bài viết thành công!');
    },
    
    onError: (error) => {
      console.error('Failed to create post:', error);
      toast.error(error?.message || 'Không thể đăng bài viết');
    },
  });
};

//  Hook to update a post (placeholder - implement based on your backend)
// Update
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      files,
    }: {
      id: string;
      data: PostUpdateRequest;
      files?: File[];
    }) => postService.updatePost(id, data, files),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: postKeys.lists(),
      });
    },
  });
};

//  Hook to delete a post (placeholder - implement based on your backend)
// export const useDeletePost = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (id: string) => {
//       // Implement delete service call
//       throw new Error('Delete post not implemented');
//     },
    
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: postKeys.lists() });
//     },
//   });
// };