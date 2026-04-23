// src/components/comment/CommentSection.tsx
"use client";

import React, { memo, useState, useCallback, useMemo } from "react";
import {
  useCommentsByPost,
  useCreateComment,
  CreateCommentVariables,
} from "@/features/comment/useComment";
import { CommentResponse } from "@/types/comment";
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import { cn } from "@/lib/utils";

// ─── Props ───────────────────────────────────────────────────────────────────

interface CommentSectionProps {
  postId: string;
  /** Kiểm soát fetch – chỉ gọi API khi section đang mở */
  isOpen: boolean;
  /** ID user hiện tại để phân quyền xóa comment */
  currentUserId?: string;
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

const CommentSkeleton: React.FC = () => (
  <div className="space-y-3 animate-pulse" aria-label="Đang tải bình luận">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-start gap-2.5">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-white/10" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 w-20 rounded-full bg-white/10" />
          <div className="h-3 w-4/5 rounded-full bg-white/10" />
          <div className="h-3 w-3/5 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const CommentSection = memo<CommentSectionProps>(
  ({ postId, isOpen, currentUserId }) => {
    // Tăng size để "load more" – giữ page=0, chỉ tăng size
    const [pageSize, setPageSize] = useState(5);

    const params = useMemo(
      () => ({ page: 0, size: pageSize, sort: "createdAt,desc" }),
      [pageSize]
    );

    const { data, isLoading, isFetching } = useCommentsByPost(postId, params, {
      enabled: isOpen,
    });

    const createMutation = useCreateComment();

    // ─── Optimistic comment ────────────────────────────────────────────────
    // Dùng variables của mutation để render comment tạm ngay lập tức
    const optimisticComment = useMemo<CommentResponse | null>(() => {
      if (!createMutation.isPending || !createMutation.variables) return null;
      return {
        id: `optimistic-${Date.now()}`,
        postId,
        authorId: createMutation.variables.authorId ?? currentUserId ?? "",
        content: createMutation.variables.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }, [createMutation.isPending, createMutation.variables, postId, currentUserId]);

    const serverComments = data?.content ?? [];
    const totalElements = data?.totalElements ?? 0;
    const hasMore = totalElements > serverComments.length && !isLoading;

    // Kết hợp: optimistic ở đầu (nếu đang pending) + server comments
    const displayComments = useMemo<CommentResponse[]>(() => {
      if (optimisticComment) {
        // Lọc bỏ comment trùng id (phòng khi cache đã thêm optimistic rồi)
        const filtered = serverComments.filter(
          (c) => c.id !== optimisticComment.id
        );
        return [optimisticComment, ...filtered];
      }
      return serverComments;
    }, [optimisticComment, serverComments]);

    // ─── Handlers ─────────────────────────────────────────────────────────

    const handleSubmit = useCallback(
      (content: string) => {
        const variables: CreateCommentVariables = {
          postId,
          content,
          authorId: currentUserId,
        };
        createMutation.mutate(variables);
      },
      [postId, currentUserId, createMutation]
    );

    const handleLoadMore = useCallback(() => {
      setPageSize((prev) => prev + 5);
    }, []);

    // ─── Render ───────────────────────────────────────────────────────────

    return (
      <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
        {/* Input */}
        <CommentInput
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          autoFocus={isOpen}
        />

        {/* List */}
        <div className="space-y-3">
          {isLoading ? (
            <CommentSkeleton />
          ) : displayComments.length === 0 ? (
            <EmptyState />
          ) : (
            displayComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={currentUserId}
                postId={postId}
                isOptimistic={comment.id.startsWith("optimistic-")}
              />
            ))
          )}
        </div>

        {/* Load more */}
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
            className={cn(
              "w-full rounded-xl py-2.5 text-sm text-white/60",
              "transition-all duration-200 hover:text-white/90",
              "disabled:cursor-not-allowed disabled:opacity-40"
            )}
          >
            {isFetching ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
                Đang tải...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Xem thêm bình luận ({totalElements - serverComments.length})
              </span>
            )}
          </button>
        )}
      </div>
    );
  }
);

CommentSection.displayName = "CommentSection";

// ─── Sub-components ───────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center gap-2 py-6">
    <svg
      className="h-8 w-8 text-white/20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
    <p className="text-sm text-white/40">Chưa có bình luận nào</p>
    <p className="text-xs text-white/25">Hãy là người đầu tiên bình luận!</p>
  </div>
);