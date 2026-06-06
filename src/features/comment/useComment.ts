// src/features/comment/useComment.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentService } from "./comment.service";
import { CommentRequest, CommentResponse } from "@/features/comment/comment.types";
import { PageResponse, PaginationParams } from "@/types/api";
import { postKeys } from "@/features/post/usePost";
import { FeedPostResponse } from "@/features/post/post.types";

export type CommentQueryParams = PaginationParams & { sort?: string };

interface UseCommentsByPostOptions {
  enabled?: boolean;
}

type InfinitePostPages = {
  pages: PageResponse<FeedPostResponse>[];
  pageParams: unknown[];
};

export const COMMENT_QUERY_KEYS = {
  all: ["comments"] as const,
  lists: () => [...COMMENT_QUERY_KEYS.all, "list"] as const,
  list: (postId: string, params?: CommentQueryParams) =>
    [...COMMENT_QUERY_KEYS.lists(), postId, params] as const,
};

const updateCommentCountInFeed = (
  oldData: InfinitePostPages | undefined,
  postId: string,
  delta: number
): InfinitePostPages | undefined => {
  if (!oldData?.pages || delta === 0) return oldData;

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      content: page.content.map((post) =>
        post.postId === postId
          ? {
              ...post,
              commentCount: Math.max((post.commentCount ?? 0) + delta, 0),
            }
          : post
      ),
    })),
  };
};

export const useCommentsByPost = (
  postId: string,
  params?: CommentQueryParams,
  options: UseCommentsByPostOptions = {}
) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEYS.list(postId, params),
    queryFn: () => commentService.getCommentsByPostId(postId, params),
    enabled: !!postId && (options.enabled ?? true),
    staleTime: 30_000,
  });
};

export interface CreateCommentVariables extends CommentRequest {
  id?: string;
  authorId?: string;
  authorName?: string;
  authorAvatarUrl?: string;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content, parentId }: CreateCommentVariables) =>
      commentService.createComment({ postId, content, parentId }),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });

      const commentQueries = queryClient.getQueryCache().findAll({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });

      const commentSnapshots = commentQueries.map((query) => ({
        key: query.queryKey,
        data: queryClient.getQueryData(query.queryKey),
      }));

      const optimisticComment: CommentResponse = {
        id: variables.id ?? `optimistic-${Date.now()}`,
        postId: variables.postId,
        authorId: variables.authorId ?? "",
        authorName: variables.authorName ?? "Bạn",
        authorAvatarUrl: variables.authorAvatarUrl ?? "",
        parentId: variables.parentId,
        content: variables.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      commentQueries.forEach((query) => {
        queryClient.setQueryData<PageResponse<CommentResponse>>(
          query.queryKey,
          (old) => {
            if (!old) return old;

            return {
              ...old,
              content: [optimisticComment, ...(old.content ?? [])],
              totalElements: (old.totalElements ?? 0) + 1,
            };
          }
        );
      });

      return { commentSnapshots };
    },

    onSuccess: (_data, variables) => {
      queryClient.setQueriesData<InfinitePostPages>(
        { queryKey: postKeys.all },
        (oldData) => updateCommentCountInFeed(oldData, variables.postId, 1)
      );

      queryClient.setQueryData<FeedPostResponse>(
        postKeys.detail(variables.postId),
        (oldPost) => {
          if (!oldPost) return oldPost;

          return {
            ...oldPost,
            commentCount: (oldPost.commentCount ?? 0) + 1,
          };
        }
      );
    },

    onError: (_error, _variables, context) => {
      context?.commentSnapshots.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string; postId: string }) =>
      commentService.deleteComment(commentId),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });

      await queryClient.cancelQueries({
        queryKey: postKeys.all,
      });

      const commentQueries = queryClient.getQueryCache().findAll({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });

      const commentSnapshots = commentQueries.map((query) => ({
        key: query.queryKey,
        data: queryClient.getQueryData(query.queryKey),
      }));

      const postQueries = queryClient.getQueryCache().findAll({
        queryKey: postKeys.all,
      });

      const postSnapshots = postQueries.map((query) => ({
        key: query.queryKey,
        data: queryClient.getQueryData(query.queryKey),
      }));

      let deletedCount = 0;

      commentQueries.forEach((query) => {
        queryClient.setQueryData<PageResponse<CommentResponse>>(
          query.queryKey,
          (old) => {
            if (!old) return old;

            const removedCount = (old.content ?? []).filter(
              (comment) =>
                comment.id === variables.commentId ||
                comment.parentId === variables.commentId
            ).length;

            deletedCount = Math.max(deletedCount, removedCount);

            return {
              ...old,
              content: (old.content ?? []).filter(
                (comment) =>
                  comment.id !== variables.commentId &&
                  comment.parentId !== variables.commentId
              ),
              totalElements: Math.max((old.totalElements ?? 0) - removedCount, 0),
            };
          }
        );
      });

      if (deletedCount > 0) {
        queryClient.setQueriesData<InfinitePostPages>(
          { queryKey: postKeys.all },
          (oldData) =>
            updateCommentCountInFeed(oldData, variables.postId, -deletedCount)
        );

        queryClient.setQueryData<FeedPostResponse>(
          postKeys.detail(variables.postId),
          (oldPost) => {
            if (!oldPost) return oldPost;

            return {
              ...oldPost,
              commentCount: Math.max(
                (oldPost.commentCount ?? 0) - deletedCount,
                0
              ),
            };
          }
        );
      }

      return {
        commentSnapshots,
        postSnapshots,
      };
    },

    onError: (_error, _variables, context) => {
      context?.commentSnapshots.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });

      context?.postSnapshots.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });
    },
  });
};