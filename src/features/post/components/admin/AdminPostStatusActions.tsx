// features/post/components/admin/AdminPostStatusActions.tsx
"use client";

import { PostStatus } from "../../post.types";
import { useUpdateAdminPostStatus } from "../../usePost";

interface AdminPostStatusActionsProps {
    postId: string;
    currentStatus: PostStatus;
}

interface StatusAction {
    label: string;
    status: PostStatus;
    className: string;
}

const STATUS_ACTIONS: StatusAction[] = [
    {
        label: "Công khai lại",
        status: PostStatus.PUBLISHED,
        className: "border border-border bg-surface text-foreground hover:bg-background",
    },
    {
        label: "Gắn cờ",
        status: PostStatus.FLAGGED,
        className: "border border-border bg-surface text-foreground hover:bg-background",
    },
    {
        label: "Từ chối bài viết",
        status: PostStatus.REJECTED,
        className: "bg-primary text-primary-fg hover:opacity-90",
    },
];

export default function AdminPostStatusActions({
    postId,
    currentStatus,
}: AdminPostStatusActionsProps) {
    const { mutate: updateStatus, isPending } = useUpdateAdminPostStatus();

    const handleUpdateStatus = (status: PostStatus) => {
        if (status === currentStatus || isPending) return;

        const confirmed = window.confirm(
            `Bạn chắc chắn muốn đổi trạng thái bài viết sang ${status}?`
        );

        if (!confirmed) return;

        updateStatus({ id: postId, status });
    };

    return (
        <section className="rounded-xl border border-border bg-card p-4 neu-raised animate-fade-in">
            <div className="mb-4 space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                    Thao tác quản trị
                </h3>
                <p className="text-sm text-foreground-muted">
                    Cập nhật trạng thái kiểm duyệt của bài viết.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {STATUS_ACTIONS.map((action) => (
                    <button
                        key={action.status}
                        type="button"
                        disabled={isPending || currentStatus === action.status}
                        onClick={() => handleUpdateStatus(action.status)}
                        className={[
                            "w-full rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
                            action.className,
                        ].join(" ")}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </section>
    );
}