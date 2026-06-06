// src/features/notification/components/NotificationBell.tsx

"use client";

import { Bell } from "lucide-react";
import { useUIStore } from "@/features/ui/ui.store";
import { useUnreadNotificationCount } from "../useNotification";

export default function NotificationBell() {
    const notificationModal = useUIStore((state) => state.notificationModal);
    const openNotification = useUIStore((state) => state.openNotification);
    const closeNotification = useUIStore((state) => state.closeNotification);

    const { data: unreadCount = 0 } = useUnreadNotificationCount();

    const handleClick = () => {
        if (notificationModal.isOpen) {
            closeNotification();
            return;
        }

        openNotification();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label="Thông báo"
            title="Thông báo"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-primary-fg transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--primary-hover)";
                (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "";
                (e.currentTarget as HTMLElement).style.color = "white";
            }}
        >
            <Bell className="h-5 w-5" aria-hidden="true" />

            {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-none text-destructive-fg">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </button>
    );
}
