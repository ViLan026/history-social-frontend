"use client";

import { PostStatus } from "../../post.types";
import { useUpdateAdminPostStatus } from "../../usePost";

interface Props {
    postId: string;
    currentStatus: PostStatus;
}

export default function AdminPostStatusActions({
    postId,
    currentStatus,
}: Props) {
    const { mutate: updateStatus, isPending } = useUpdateAdminPostStatus();

    const handleUpdateStatus = (status: PostStatus) => {
        if (status === currentStatus) return;

        const confirmed = confirm(
            `Bạn chắc chắn muốn đổi trạng thái bài viết sang ${status}?`
        );

        if (!confirmed) return;

        updateStatus({ id: postId, status });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <button
                type="button"
                disabled={isPending || currentStatus === PostStatus.PUBLISHED}
                onClick={() => handleUpdateStatus(PostStatus.PUBLISHED)}
                className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50"
            >
                Công khai lại
            </button>

            <button
                type="button"
                disabled={isPending || currentStatus === PostStatus.FLAGGED}
                onClick={() => handleUpdateStatus(PostStatus.FLAGGED)}
                className="flex-1 px-4 py-2 rounded-lg border border-amber-500/30 text-amber-600 hover:bg-amber-500/10 disabled:opacity-50"
            >
                Gắn cờ
            </button>

            <button
                type="button"
                disabled={isPending || currentStatus === PostStatus.REJECTED}
                onClick={() => handleUpdateStatus(PostStatus.REJECTED)}
                className="flex-1 px-4 py-2 rounded-lg bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50"
            >
                Từ chối bài viết
            </button>
        </div>
    );
}