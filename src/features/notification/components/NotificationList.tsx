// src/features/notification/components/NotificationList.tsx

"use client";

import NotificationItem from "./NotificationItem";
import NotificationListSkeleton from "./NotificationListSkeleton";
import { useNotifications } from "../useNotification";

interface NotificationListProps {
    page?: number;
    size?: number;
    compact?: boolean;
}

export default function NotificationList({
    page = 0,
    size = 20,
    compact = false,
}: NotificationListProps) {
    const { data, isLoading, isError } = useNotifications({
        page,
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

    if (!data || data.content.length === 0) {
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
            {data.content.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </div>
    );
}