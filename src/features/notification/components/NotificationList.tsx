// src/features/notification/components/NotificationList.tsx

"use client";

import NotificationItem from "./NotificationItem";
import NotificationListSkeleton from "./NotificationListSkeleton";
import { useInfiniteNotifications } from "../useNotification";

interface NotificationListProps {
    size?: number;
    compact?: boolean;
    showLoadMore?: boolean;
}

export default function NotificationList({
    size = 20,
    compact = false,
    showLoadMore = true,
}: NotificationListProps) {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteNotifications({
        size,
        sort: "createdAt,desc",
    });

    if (isLoading) {
        return <NotificationListSkeleton />;
    }

    if (isError) {
        return (
            <div className="px-4 py-6 text-sm text-foreground-muted">
                Không thể tải danh sách thông báo.
            </div>
        );
    }

    const notifications =
        data?.pages.flatMap((page) => page.content) ?? [];

    if (notifications.length === 0) {
        return (
            <div className="px-4 py-8 text-center text-sm text-foreground-muted">
                Chưa có thông báo nào.
            </div>
        );
    }

    return (
        <div
            className={[
                "divide-y divide-border-muted",
                compact ? "max-h-[420px] overflow-y-auto" : "",
            ].join(" ")}
        >
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                />
            ))}

            {showLoadMore && hasNextPage && (
                <div className="p-4 text-center">
                    <button
                        type="button"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isFetchingNextPage
                            ? "Đang tải thêm..."
                            : "Tải thêm thông báo"}
                    </button>
                </div>
            )}

            {showLoadMore && !hasNextPage && notifications.length > 0 && (
                <div className="px-4 py-4 text-center text-xs text-foreground-muted">
                    Bạn đã xem hết thông báo.
                </div>
            )}
        </div>
    );
}