// components/comment/CommentItem.tsx
"use client";

import React, { memo, useCallback } from "react";
import { CommentResponse } from "@/features/comment/comment.types";
import { cn } from "@/lib/utils";
import { useDeleteComment } from "@/features/comment/useComment";
import Avatar from "@/components/ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

interface CommentItemProps {
    comment: CommentResponse;
    currentUserId?: string;
    postId: string;
    isOptimistic?: boolean;
}

export const CommentItem = memo<CommentItemProps>(
    ({ comment, currentUserId, postId, isOptimistic = false }) => {
        const { mutate: deleteComment, isPending: isDeleting } =
            useDeleteComment();

        const formattedTime = formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: false,
            locale: vi,
        });

        const isOwner = !!currentUserId && currentUserId === comment.authorId;
        const authorName = comment.authorName?.trim() || "Người dùng";

        const isHiddenByHsd =
            comment.isVisible === false &&
            comment.hiddenReason === "HATE_SPEECH";

        const handleDelete = useCallback(() => {
            if (isDeleting || isHiddenByHsd) return;
            deleteComment({ commentId: comment.id, postId });
        }, [comment.id, postId, isDeleting, isHiddenByHsd, deleteComment]);


        if (isHiddenByHsd && !isOwner) {
            return null;
        }


        return (
            <div
                className={cn(
                    "group flex items-start gap-2.5 transition-opacity duration-300 bg-background",
                    isOptimistic && "opacity-60",
                    isDeleting && "opacity-40 pointer-events-none",
                    isHiddenByHsd && "opacity-60"
                )}
            >
                <Link href={`/profile/${comment.authorId}`}>
                    <Avatar
                        avatarUrl={comment.authorAvatarUrl}
                        displayName={authorName}
                    />
                </Link>

                <div className="min-w-0 flex-1">
                    <div
                        className={cn(
                            "rounded-xl rounded-tl-sm px-3.5 py-2.5 border",
                            isHiddenByHsd
                                ? "bg-destructive/5 border-destructive/20"
                                : "bg-surface border-border-muted"
                        )}
                    >
                        <span className="mb-0.5 block text-xs font-semibold text-foreground-muted">
                            {authorName}
                        </span>

                        {isHiddenByHsd ? (
                            <div className="space-y-2">
                                <p className="text-sm italic text-destructive/80">
                                    Bình luận của bạn đã bị thu hồi do vi phạm
                                    tiêu chuẩn cộng đồng.
                                </p>

                                <p className="break-words text-sm leading-relaxed text-foreground-muted ">
                                    {comment.content}
                                </p>
                            </div>
                        ) : (
                            <p className="break-words text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                                {comment.content}
                            </p>
                        )}
                    </div>

                    <div className="mt-1 flex items-center gap-3 px-1">
                        <time
                            className="text-[11px] text-foreground-faint"
                            dateTime={comment.createdAt}
                        >
                            {isOptimistic ? "Đang gửi..." : formattedTime} trước
                        </time>

                        {isOwner && !isOptimistic && !isHiddenByHsd && (
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