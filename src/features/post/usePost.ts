import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PaginationParams } from '@/types/api';
import { PostCreationRequest, PostStatus, PostUpdateRequest } from '@/features/post/post.types';
import { postService } from './post.service';
import { toast } from 'sonner';

// Query Keys
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...postKeys.lists(), params] as const,
  infiniteFeed: () => [...postKeys.all, 'need-auth'] as const,
  infiniteFeedHome: () => [...postKeys.all, 'public-home'] as const,
  detail: (id: string) => [...postKeys.all, 'detail', id] as const,
  byAuthor: (authorId: string, params?: PaginationParams) => 
    [...postKeys.all, 'author', authorId, params] as const,
  search: (keyword: string, params?: PaginationParams) =>
    [...postKeys.all, 'search', keyword, params] as const,
  adminPosts: (params?: PaginationParams & { status?: PostStatus }) =>
    [...postKeys.all, "admin", "list", params] as const,

  adminPostDetail: (id: string) =>
    [...postKeys.all, "admin", "detail", id] as const,
    
};




// Infinite Scroll Feed
export const useInfiniteFeed = (isEnabled: boolean) => {
  return useInfiniteQuery({
    queryKey: postKeys.infiniteFeed(),
    queryFn: ({ pageParam = 0 }) =>
      postService.getPublishedPosts({ page: pageParam, size: 15, sort: 'createdAt,desc' }),
    
    initialPageParam: 0,
    getNextPageParam: (lastPage) => 
      lastPage.last ? undefined : lastPage.currentPage + 1,
    enabled:isEnabled, 
    staleTime: 1000 * 60 * 3,   // 3 phút
    gcTime: 1000 * 60 * 10,
  });
};

// lấy danh sách bài viết khi chưa đăng nhập 
export const useInfiniteFeedHome = (isEnabled: boolean) => {
  return useInfiniteQuery({
    queryKey: postKeys.infiniteFeedHome(),
    queryFn: ({ pageParam = 0 }) =>
      postService.getPublicHomePosts({ page: pageParam, size: 15, sort: 'createdAt,desc' }),
    
    initialPageParam: 0,
    getNextPageParam: (lastPage) => 
      lastPage.last ? undefined : lastPage.currentPage + 1,
    enabled: isEnabled, 
    staleTime: 1000 * 60 * 3,   // 3 phút
    gcTime: 1000 * 60 * 10,
  });
};

// Theo author
export const useInfinitePostsByAuthor = (authorId: string, isEnabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'author', authorId],
    // Ép kiểu params ép buộc page theo cấu trúc pageParam của infinite scroll
    queryFn: ({ pageParam = 0 }) =>
      postService.getPostsByAuthor(authorId, { page: pageParam, size: 15, sort: 'createdAt,desc' }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.currentPage + 1),
    enabled: !!authorId && isEnabled,
    staleTime: 1000 * 60 * 5,
  });
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

// Lấy chi tiết post
export const usePost = (id: string, enabled = true) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postService.getPostById(id),
    enabled: !!id && enabled,
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

export const useAdminPosts = (
  params?: PaginationParams & { status?: PostStatus }
) => {
  return useQuery({
    queryKey: postKeys.adminPosts(params),
    queryFn: () => postService.getAdminPosts(params),
    staleTime: 1000 * 60 * 3,
  });
};

export const useAdminPostDetail = (id: string | null, enabled = true) => {
  return useQuery({
    queryKey: postKeys.adminPostDetail(id || ""),
    queryFn: () => postService.getAdminPostDetail(id as string),
    enabled: !!id && enabled,
  });
};

export const useUpdateAdminPostStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: PostStatus;
    }) => postService.updateAdminPostStatus(id, { status }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...postKeys.all, "admin"],
      });

      queryClient.invalidateQueries({
        queryKey: postKeys.adminPostDetail(data.id),
      });

      toast.success("Đã cập nhật trạng thái bài viết");
    },

    onError: (error) => {
      console.error("Cập nhật trạng thái bài viết thất bại:", error);
      toast.error("Không thể cập nhật trạng thái bài viết");
    },
  });
};