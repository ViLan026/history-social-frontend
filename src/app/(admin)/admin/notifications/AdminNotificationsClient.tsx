// src/app/(admin)/admin/notifications/AdminNotificationsClient.tsx

"use client";

import NotificationList from "@/features/notification/components/NotificationList";

export default function AdminNotificationsClient() {
    return (
        <div className="mx-auto max-w-[1200px] space-y-6">
            <main className="pt-2 md:pt-5 lg:pt-7">
                <section className="overflow-hidden rounded-2xl border border-border bg-card neu-raised">
                    <NotificationList size={20} showLoadMore />
                </section>
            </main>
        </div>
    );
}