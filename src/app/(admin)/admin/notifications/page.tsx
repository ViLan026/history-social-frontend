// src/app/(admin)/admin/notifications/page.tsx

import { Metadata } from "next";
import NotificationList from "@/features/notification/components/NotificationList";

export const metadata: Metadata = {
    title: "Thông báo quản trị | Admin Dashboard",
    description:
        "Theo dõi các báo cáo, khiếu nại và thông báo quản trị trong hệ thống."
};

export default function AdminNotificationsPage() {
    return (
        <div className="space-y-6 max-w-[1200px] mx-auto">
            <main className="pt-2 md:pt-5 lg:pt-7">
                <section className="overflow-hidden rounded-2xl border border-border bg-card neu-raised">
                    <NotificationList size={20} showLoadMore />
                </section>
            </main>
        </div>
    );
}
