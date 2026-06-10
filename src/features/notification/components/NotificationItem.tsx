"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Avatar from "@/components/ui/Avatar";
import { useUIStore } from "@/features/ui/ui.store";
import { useOpenPostDetail } from "@/features/post/usePost";
import { NotificationResponse } from "../notification.types";
import { useMarkNotificationAsRead } from "../useNotification";

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
        case "HSD":
            return "Kiểm duyệt bình luận";
        case "FACT_CHECK":
            return "Đối chiếu nguồn";
        case "SYSTEM":
        default:
            return "Hệ thống";
    }
}

function formatNotificationTime(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function shouldOpenPostDetail(type: NotificationResponse["type"]) {
    return [
        "COMMENT",
        "REPLY",
        "REACTION",
        "LIKE",
        "POST",
        "HSD",
        "FACT_CHECK",
    ].includes(type);
}

export default function NotificationItem({
    notification,
}: NotificationItemProps) {
    const router = useRouter();

    const closeNotification = useUIStore((state) => state.closeNotification);
    const openPostDetailById = useOpenPostDetail();

    const markAsReadMutation = useMarkNotificationAsRead();

    const displayName = notification.displayName?.trim() || "Người dùng";
    const postId = notification.postId ?? notification.referenceId;

    const handleClick = async () => {
        if (!notification.read) {
            markAsReadMutation.mutate(notification.id);
        }

        if (shouldOpenPostDetail(notification.type)) {
            if (!postId) {
                closeNotification();
                return;
            }

            try {
                await openPostDetailById(postId, {
                    forceRefresh: notification.type === "FACT_CHECK",
                    refreshFactCheck: notification.type === "FACT_CHECK",
                });

                closeNotification();
            } catch (error) {
                console.error("Không thể mở chi tiết bài viết:", error);
                toast.error("Không thể mở chi tiết bài viết");
            }

            return;
        }

        closeNotification();

        if (notification.type === "REPORT") {
            router.push(
                notification.reportId
                    ? `/admin/reports?reportId=${notification.reportId}`
                    : "/admin/reports"
            );
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={[
                "w-full border-b border-border-muted px-4 py-3 text-left transition-colors",
                "hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                notification.read ? "bg-card" : "bg-surface-raised",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <div className="relative mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary text-primary-fg">
                    <Avatar
                        avatarUrl={notification.avatarUrl}
                        displayName={displayName}
                    />
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