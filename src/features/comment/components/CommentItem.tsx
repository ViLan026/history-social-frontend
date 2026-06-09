"use client";

import React, { memo, useCallback } from "react";
import { CommentResponse } from "@/features/comment/comment.types";
import { cn } from "@/lib/utils";
import { useDeleteComment } from "@/features/comment/useComment";
import Avatar from "@/components/ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import ReportMenuButton from "@/features/report/components/ReportMenuButton";

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
            locale: vi
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
                    "group flex items-start gap-2.5 bg-background transition-opacity duration-300",
                    isOptimistic && "opacity-60",
                    isDeleting && "pointer-events-none opacity-40",
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
                            "rounded-xl rounded-tl-sm border px-3.5 py-2.5",
                            isHiddenByHsd
                                ? "border-destructive/20 bg-destructive/5"
                                : "border-border-muted bg-surface"
                        )}
                    >
                        <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="min-w-0 truncate text-xs font-semibold text-foreground-muted">
                                {authorName}
                            </span>

                            {!isOwner && !isOptimistic && (
                                <ReportMenuButton
                                    targetId={comment.id}
                                    targetType="COMMENT"
                                    showLabel={false}
                                />
                            )}
                        </div>

                        {isHiddenByHsd ? (
                            <div className="space-y-2">
                                <p className="text-sm italic text-destructive/80">
                                    Bình luận của bạn đã bị thu hồi do vi phạm
                                    tiêu chuẩn cộng đồng.
                                </p>

                                <p className="text-sm leading-relaxed text-foreground-muted">
                                    {comment.content}
                                </p>
                            </div>
                        ) : (
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
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
                                    rounded-sm
                                    text-[11px] text-destructive/60
                                    opacity-0 transition-all duration-150
                                    hover:text-destructive
                                    focus:opacity-100
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                    disabled:cursor-not-allowed
                                    group-hover:opacity-100
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
