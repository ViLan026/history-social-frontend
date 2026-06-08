// src/app/(admin)/admin/notifications/page.tsx

import { Metadata } from "next";
import AdminNotificationsClient from "./AdminNotificationsClient";

export const metadata: Metadata = {
    title: "Thông báo quản trị | Admin Dashboard",
    description:
        "Theo dõi các báo cáo, khiếu nại và thông báo quản trị trong hệ thống."
};

export default function AdminNotificationsPage() {
    return <AdminNotificationsClient />;
}