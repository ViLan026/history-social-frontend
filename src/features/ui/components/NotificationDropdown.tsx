
"use client";

import Link from "next/link";
import { useUIStore } from "@/features/ui/ui.store";
import NotificationList from "@/features/notification/components/NotificationList";

interface NotificationDropdownProps {
    admin?: boolean;
}

export default function NotificationDropdown({
    admin = false,
}: NotificationDropdownProps) {
    const closeNotification = useUIStore((state) => state.closeNotification);

    const fullPageUrl = admin ? "/admin/notifications" : "/notifications";

    return (
        <div className="fixed right-4 top-16 z-50 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-border-muted px-4 py-3">
                <div>
                    <h3 className="text-sm font-semibold text-foreground">
                        Thông báo
                    </h3>
                    <p className="text-xs text-foreground-muted">
                        Cập nhật mới nhất từ hệ thống
                    </p>
                </div>

                <button
                    type="button"
                    onClick={closeNotification}
                    className="rounded-full px-3 py-1.5 text-xs font-medium text-foreground-muted hover:bg-surface transition-colors"
                >
                    Đóng
                </button>
            </div>

            <NotificationList page={0} size={8} compact />

            <div className="border-t border-border-muted px-4 py-3 text-center">
                <Link
                    href={fullPageUrl}
                    onClick={closeNotification}
                    className="text-sm font-medium text-primary hover:underline"
                >
                    Xem tất cả thông báo
                </Link>
            </div>
        </div>
    );
}