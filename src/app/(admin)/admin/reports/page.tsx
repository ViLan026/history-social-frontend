// @/app/(admin)/admin/reports/page.tsx
import React from "react";
import { Metadata } from "next";
import AdminReportTable from "@/features/report/components/admin/AdminReportTable";

// Định nghĩa tiêu đề trang cho Admin Dashboard
export const metadata: Metadata = {
    title: "Quản lý báo cáo vi phạm | Admin Dashboard",
    description: "Hệ thống xét duyệt và xử lý các báo cáo vi phạm từ người dùng.",
};

export default function AdminReportsPage() {
    return (
        <div className=" space-y-6 max-w-[1600px] ">
            <main className="pt-1">
                <AdminReportTable />
            </main>
        </div>
    );
}