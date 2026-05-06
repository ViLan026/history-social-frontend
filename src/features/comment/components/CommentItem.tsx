// components/comment/CommentItem.tsx
// ============================================================
// Single comment bubble
// Styling: 100% semantic tokens, zero hardcoded colors
// ============================================================

"use client";

import React, { memo, useCallback } from "react";
import { CommentResponse } from "@/features/comment/comment.types";
import { formatRelativeTimeVi, cn } from "@/lib/utils";
import { useDeleteComment } from "@/features/comment/useComment";

interface CommentItemProps {
    comment: CommentResponse;
    currentUserId?: string;
    postId: string;
    isOptimistic?: boolean;
}

const getInitial = (authorId: string): string =>
    authorId ? authorId.charAt(0).toUpperCase() : "?";

/**
 * Chọn 1 trong 5 màu semantic dựa trên hash của authorId.
 * Dùng CSS variables — không hardcode hex.
 */
const AVATAR_HUES = [
    "bg-primary-subtle text-primary",
    "bg-secondary-subtle text-secondary",
    "bg-info-subtle text-info",
    "bg-success-subtle text-success",
    "bg-warning-subtle text-warning"
] as const;

const getAvatarClass = (authorId: string): string => {
    if (!authorId) return AVATAR_HUES[0];
    return AVATAR_HUES[authorId.charCodeAt(0) % AVATAR_HUES.length];
};

export const CommentItem = memo<CommentItemProps>(
    ({ comment, currentUserId, postId, isOptimistic = false }) => {
        const { mutate: deleteComment, isPending: isDeleting } =
            useDeleteComment();

        const isOwner = !!currentUserId && currentUserId === comment.authorId;

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
                        "flex h-8 w-8 shrink-0 items-center justify-center",
                        "rounded-full text-xs font-semibold select-none",
                        "ring-1 ring-border",
                        getAvatarClass(comment.authorId)
                    )}
                    aria-hidden="true"
                >
                    {getInitial(comment.authorId)}
                </div>

                {/* Bubble + meta */}
                <div className="min-w-0 flex-1">
                    {/* Bubble */}
                    <div
                        className="
                            rounded-xl rounded-tl-sm
                            px-3.5 py-2.5
                            bg-surface border border-border-muted
                            "
                    >
                        {/* Author label */}
                        <span className="mb-0.5 block text-xs font-semibold text-foreground-muted">
                            {isOptimistic ? "Bạn" : "Người dùng"}
                        </span>

                        {/* Content */}
                        <p className="break-words text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                            {comment.content}
                        </p>
                    </div>

                    {/* Meta row */}
                    <div className="mt-1 flex items-center gap-3 px-1">
                        {/* Time */}
                        <time
                            className="text-[11px] text-foreground-faint"
                            dateTime={comment.createdAt}
                        >
                            {isOptimistic
                                ? "Đang gửi..."
                                : formatRelativeTimeVi(comment.createdAt)}
                        </time>

                        {/* Delete — chỉ hiện khi hover + là chủ comment */}
                        {isOwner && !isOptimistic && (
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="
                                    text-[11px] text-destructive/60
                                    hover:text-destructive
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                    disabled:cursor-not-allowed
                                    opacity-0 group-hover:opacity-100 focus:opacity-100
                                    transition-all duration-150
                                    rounded-sm
                                    "
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
