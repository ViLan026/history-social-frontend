// src/components/comment/CommentItem.tsx
"use client";

import React, { memo, useCallback } from "react";
import { CommentResponse } from "@/types/comment";
import { formatRelativeTimeVi, cn } from "@/lib/utils";
import { useDeleteComment } from "@/features/comment/useComment";

// ─── Props ───────────────────────────────────────────────────────────────────

interface CommentItemProps {
  comment: CommentResponse;
  /** ID user hiện tại để xác định quyền xóa */
  currentUserId?: string;
  postId: string;
  /** Comment tạm (optimistic) chưa có phản hồi từ server */
  isOptimistic?: boolean;
}

// ─── Avatar mặc định (từ authorId) ───────────────────────────────────────────

const getInitial = (authorId: string): string => {
  if (!authorId) return "?";
  // Lấy ký tự đầu của authorId (UUID thường bắt đầu bằng hex)
  return authorId.charAt(0).toUpperCase();
};

/** Màu avatar từ hash của authorId */
const getAvatarColor = (authorId: string): string => {
  const colors = [
    "from-blue-400 to-blue-600",
    "from-teal-400 to-teal-600",
    "from-indigo-400 to-indigo-600",
    "from-cyan-400 to-cyan-600",
    "from-violet-400 to-violet-600",
  ];
  if (!authorId) return colors[0];
  const idx = authorId.charCodeAt(0) % colors.length;
  return colors[idx];
};

// ─── Component ───────────────────────────────────────────────────────────────

export const CommentItem = memo<CommentItemProps>(
  ({ comment, currentUserId, postId, isOptimistic = false }) => {
    const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

    const isOwner =
      !!currentUserId && currentUserId === comment.authorId;

    const handleDelete = useCallback(() => {
      if (isDeleting) return;
      deleteComment({ commentId: comment.id, postId });
    }, [comment.id, postId, isDeleting, deleteComment]);

    return (
      <div
        className={cn(
          "group flex items-start gap-2.5 transition-opacity duration-300",
          isOptimistic && "opacity-60",
          isDeleting && "opacity-40 pointer-events-none"
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center",
            "rounded-full bg-gradient-to-br text-xs font-bold text-white",
            "shadow-[2px_2px_5px_#3f5f80,-2px_-2px_5px_#5f89b5]",
            getAvatarColor(comment.authorId)
          )}
        >
          {getInitial(comment.authorId)}
        </div>

        {/* Bubble + metadata */}
        <div className="min-w-0 flex-1">
          {/* Bubble */}
          <div
            className={cn(
              "rounded-2xl rounded-tl-sm px-3.5 py-2.5",
              "bg-white/10 backdrop-blur-sm",
              "shadow-[2px_2px_6px_rgba(0,0,0,0.15)]"
            )}
          >
            {/* Tên */}
            <span className="mb-0.5 block text-xs font-semibold text-white/70">
              {isOptimistic ? "Bạn" : "Người dùng"}
            </span>

            {/* Nội dung */}
            <p className="break-words text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>

          {/* Metadata row */}
          <div className="mt-1 flex items-center gap-3 px-1">
            {/* Thời gian */}
            <span className="text-[11px] text-white/40">
              {isOptimistic ? "Đang gửi..." : formatRelativeTimeVi(comment.createdAt)}
            </span>

            {/* Nút xóa – chỉ hiện khi hover và là chủ comment */}
            {isOwner && !isOptimistic && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={cn(
                  "text-[11px] text-red-300/70 transition-all duration-150",
                  "hover:text-red-300 disabled:cursor-not-allowed",
                  "opacity-0 group-hover:opacity-100 focus:opacity-100"
                )}
              >
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CommentItem.displayName = "CommentItem";