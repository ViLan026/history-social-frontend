// features/post/components/admin/AdminPostStatusActions.tsx
"use client";

import { PostStatus } from "../../post.types";
import {
    useRecheckAdminPostFactCheck,
    useUpdateAdminPostStatus
} from "../../usePost";

interface AdminPostStatusActionsProps {
    postId: string;
    currentStatus: PostStatus;
}

interface StatusAction {
    label: string;
    status: PostStatus;
    variant: "outline" | "danger";
}

const STATUS_ACTIONS: StatusAction[] = [
    {
        label: "Công khai lại",
        status: PostStatus.PUBLISHED,
        variant: "outline"
    },
    {
        label: "Gắn cờ",
        status: PostStatus.FLAGGED,
        variant: "outline"
    },
    {
        label: "Từ chối",
        status: PostStatus.REJECTED,
        variant: "danger"
    }
];

const BASE_BUTTON_CLASS =
    "inline-flex h-9 min-w-[116px] items-center justify-center rounded-full px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-45";

const BUTTON_VARIANTS: Record<StatusAction["variant"] | "primary", string> = {
    outline:
        "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
    danger: "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
    primary: "border border-primary bg-primary text-primary-fg hover:opacity-90"
};

function buttonClass(variant: StatusAction["variant"] | "primary") {
    return `${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS[variant]}`;
}

export default function AdminPostStatusActions({
    postId,
    currentStatus
}: AdminPostStatusActionsProps) {
    const { mutate: updateStatus, isPending: isUpdatingStatus } =
        useUpdateAdminPostStatus();

    const { mutate: recheckFactCheck, isPending: isRechecking } =
        useRecheckAdminPostFactCheck();

    const isDisabled = isUpdatingStatus || isRechecking;

    const handleUpdateStatus = (status: PostStatus) => {
        if (status === currentStatus || isDisabled) return;

        const confirmed = window.confirm(
            `Bạn chắc chắn muốn đổi trạng thái bài viết sang ${status}?`
        );

        if (!confirmed) return;

        updateStatus({ id: postId, status });
    };

    return (
        <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    {STATUS_ACTIONS.map((action) => (
                        <button
                            key={action.status}
                            type="button"
                            disabled={
                                isDisabled || currentStatus === action.status
                            }
                            onClick={() => handleUpdateStatus(action.status)}
                            className={buttonClass(action.variant)}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => recheckFactCheck(postId)}
                    disabled={isDisabled}
                    className={buttonClass("primary")}
                >
                    {isRechecking ? "Đang kiểm tra..." : "Kiểm chứng lại"}
                </button>
            </div>
        </section>
    );
}
