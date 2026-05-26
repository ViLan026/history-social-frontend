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
        <div className=" space-y-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col gap-1.5 border-b border-border/60 pb-5">
                <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl mt-1">
                    Quản lý báo cáo vi phạm
                </h1>
                <p className="text-sm text-foreground-muted max-w-2xl leading-relaxed">
                    Nơi tiếp nhận và kiểm duyệt các nội dung (Bài viết, Bình luận) bị người dùng gắn cờ báo cáo. 
                    Vui lòng xem xét kỹ nội dung gốc trước khi ra quyết định Ẩn/Xóa hoặc Bỏ qua.
                </p>
            </div>

            <main className="pt-1">
                <AdminReportTable />
            </main>
        </div>
    );
}