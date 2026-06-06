"use client";

import { useRouter } from "next/navigation";
import { NotificationResponse } from "../notification.types";
import { useMarkNotificationAsRead } from "../useNotification";
import { useUIStore } from "@/features/ui/ui.store";
import Avatar from "@/components/ui/Avatar";

interface NotificationItemProps {
    notification: NotificationResponse;
}

function getNotificationLabel(type: NotificationResponse["type"]) {
    switch (type) {
        case "COMMENT":
            return "Bình luận";
        case "REPLY":
            return "Trả lời";
        case "REACTION":
        case "LIKE":
            return "Tương tác";
        case "REPORT":
            return "Báo cáo";
        case "POST":
            return "Bài viết";
        case "SYSTEM":
        default:
            return "Hệ thống";
    }
}

function formatNotificationTime(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleString("vi-VN", {
        hour: "2-digit",
        // minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function getNotificationHref(notification: NotificationResponse) {
    switch (notification.type) {
        case "COMMENT":
        case "REPLY":
            if (notification.postId && notification.commentId) {
                return `/posts/${notification.postId}?commentId=${notification.commentId}`;
            }

            if (notification.postId) {
                return `/posts/${notification.postId}`;
            }

            return null;

        case "REACTION":

        case "POST":
            return notification.postId
                ? `/posts/${notification.postId}`
                : null;

        case "REPORT":
            return notification.reportId
                ? `/admin/reports?reportId=${notification.reportId}`
                : "/admin/reports";

        case "SYSTEM":
        default:
            return null;
    }
}

export default function NotificationItem({ notification }: NotificationItemProps) {
    const router = useRouter();
    const closeNotification = useUIStore((state) => state.closeNotification);
    const markAsReadMutation = useMarkNotificationAsRead();
    const displayName = notification.displayName?.trim() || "Người dùng"
    const handleClick = () => {
        if (!notification.read) {
            markAsReadMutation.mutate(notification.id);
        }

        closeNotification();

        const href = getNotificationHref(notification);
 
        if (href) {
            router.push(href);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={[
                "w-full text-left px-4 py-3 border-b border-border-muted transition-colors",
                "hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                notification.read ? "bg-card" : "bg-surface-raised",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <div className="relative mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary text-primary-fg">
                    <Avatar avatarUrl={notification.avatarUrl} displayName={displayName} />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">
                            {getNotificationLabel(notification.type)}
                        </span>

                        {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                    </div>

                    <p className="mt-1 text-sm leading-5 text-foreground">
                        {notification.content}
                    </p>

                    <p className="mt-1 text-xs text-foreground-muted">
                        {formatNotificationTime(notification.createdAt)}
                    </p>
                </div>
            </div>
        </button>
    );
}