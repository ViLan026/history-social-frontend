"use client";

import { FeedPostResponse, PostStatus } from "@/features/post/post.types";
import { useUpdateMyPostStatus } from "@/features/post/usePost";
import { cn } from "@/lib/utils";

interface PostOwnerStatusActionsProps {
    post: FeedPostResponse;
}

export default function PostOwnerStatusActions({
    post,
}: PostOwnerStatusActionsProps) {
    const { mutate, isPending } = useUpdateMyPostStatus();

    const action = getOwnerAction(post.status);

    if (!action) {
        return null;
    }

    if (!action.nextStatus) {
        return (
            <span className="shrink-0 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground-muted">
                {action.label}
            </span>
        );
    }

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() =>
                mutate({
                    id: post.postId,
                    status: action.nextStatus!,
                })
            }
            className={cn(
                "shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium transition",
                "bg-surface text-foreground-muted hover:bg-background hover:text-foreground",
                "disabled:cursor-not-allowed disabled:opacity-60"
            )}
        >
            {isPending ? "Đang xử lý..." : action.label}
        </button>
    );
}

function getOwnerAction(status: PostStatus): {
    label: string;
    nextStatus?: PostStatus;
} | null {
    switch (status) {
        case PostStatus.DRAFT:
            return {
                label: "Đăng bài",
                nextStatus: PostStatus.PUBLISHED,
            };

        case PostStatus.PUBLISHED:
            return {
                label: "Ẩn bài",
                nextStatus: PostStatus.HIDDEN,
            };

        case PostStatus.HIDDEN:
            return {
                label: "Mở bài",
                nextStatus: PostStatus.PUBLISHED,
            };

        case PostStatus.FLAGGED:
            return {
                label: "Bị gắn cờ",
            };

        case PostStatus.REJECTED:
            return {
                label: "Bị từ chối",
            };

        default:
            return null;
    }
}