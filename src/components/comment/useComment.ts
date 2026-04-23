// src/features/comment/useComment.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentService } from "./comment.service";
import { CommentRequest, CommentResponse } from "@/types/comment";
import { PaginationParams } from "@/types/api";

// ─── Types ───────────────────────────────────────────────────────────────────

/** Extends PaginationParams với sort (Spring Data style: "field,direction") */
export type CommentQueryParams = PaginationParams & { sort?: string };

interface UseCommentsByPostOptions {
  /** Cho phép tắt fetch khi section chưa mở → tránh gọi API thừa */
  enabled?: boolean;
}

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const COMMENT_QUERY_KEYS = {
  all: ["comments"] as const,
  lists: () => [...COMMENT_QUERY_KEYS.all, "list"] as const,
  list: (postId: string, params?: CommentQueryParams) =>
    [...COMMENT_QUERY_KEYS.lists(), postId, params] as const,
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

/**
 * Lấy danh sách comment của 1 bài viết (có phân trang).
 * @param options.enabled  false → bỏ qua fetch (dùng khi comment section chưa mở)
 */
export const useCommentsByPost = (
  postId: string,
  params?: CommentQueryParams,
  options: UseCommentsByPostOptions = {}
) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEYS.list(postId, params),
    queryFn: () => commentService.getCommentsByPostId(postId, params),
    enabled: !!postId && (options.enabled ?? true),
    staleTime: 30_000, // 30s – giảm refetch không cần thiết
  });
};

// ─────────────────────────────────────────────────────────────────────────────

/** Variables mở rộng: thêm authorId để hỗ trợ optimistic UI */
export interface CreateCommentVariables extends CommentRequest {
  /** ID của người dùng hiện tại – dùng cho optimistic comment */
  authorId?: string;
}

/**
 * Tạo comment mới.
 * Hỗ trợ optimistic update: hiển thị comment ngay lập tức trong cache trước khi
 * server xác nhận, rollback nếu có lỗi.
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: CreateCommentVariables) =>
      commentService.createComment({ postId, content }),

    onMutate: async (variables) => {
      // Huỷ bất kỳ refetch đang chờ để tránh ghi đè optimistic update
      await queryClient.cancelQueries({
        queryKey: COMMENT_QUERY_KEYS.lists(),
      });

      // Snapshot cache hiện tại để rollback khi lỗi
      const keys = queryClient
        .getQueryCache()
        .findAll({ queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId] });

      const snapshots = keys.map((q) => ({
        key: q.queryKey,
        data: queryClient.getQueryData(q.queryKey),
      }));

      // Tạo comment tạm (optimistic)
      const optimisticComment: CommentResponse = {
        id: `optimistic-${Date.now()}`,
        postId: variables.postId,
        authorId: variables.authorId ?? "",
        content: variables.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Cập nhật tất cả cache key của bài viết đó
      keys.forEach((q) => {
        queryClient.setQueryData(q.queryKey, (old: any) => {
          if (!old) return old;
          return {
            ...old,
            content: [optimisticComment, ...(old.content ?? [])],
            totalElements: (old.totalElements ?? 0) + 1,
          };
        });
      });

      return { snapshots };
    },

    onError: (_err, _vars, context) => {
      // Rollback về snapshot cũ
      context?.snapshots?.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: (_data, _err, variables) => {
      // Luôn refetch để đồng bộ với server
      queryClient.invalidateQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });
    },
  });
};

// ─────────────────────────────────────────────────────────────────────────────

/** Xóa comment, sau đó invalidate cache của bài viết đó */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: string; postId: string }) =>
      commentService.deleteComment(commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...COMMENT_QUERY_KEYS.lists(), variables.postId],
      });
    },
  });
};