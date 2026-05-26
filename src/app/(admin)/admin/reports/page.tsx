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
        <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col gap-1.5 border-b border-border/60 pb-5">
                <div className="flex items-center gap-2 text-xs font-medium text-foreground-muted uppercase tracking-wider">
                    <span>Bảng điều khiển</span>
                    <span>/</span>
                    <span className="text-primary font-semibold">Báo cáo vi phạm</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl mt-1">
                    Quản lý báo cáo vi phạm
                </h1>
                <p className="text-sm text-foreground-muted max-w-2xl leading-relaxed">
                    Nơi tiếp nhận và kiểm duyệt các nội dung (Bài viết, Bình luận) bị người dùng gắn cờ báo cáo. 
                    Vui lòng xem xét kỹ nội dung gốc trước khi ra quyết định Ẩn/Xóa hoặc Bỏ qua.
                </p>
            </div>

            {/* Thống kê nhanh (Tùy chọn bổ sung để giao diện đẹp hơn) */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-amber-500/10 text-amber-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider">Đang chờ xử lý</p>
                        <p className="text-lg font-bold text-foreground mt-0.5">Thời gian thực</p>
                    </div>
                </div>
                
                <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-destructive/10 text-destructive rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider">Tiêu chuẩn cộng đồng</p>
                        <p className="text-lg font-bold text-foreground mt-0.5">Nghiêm ngặt</p>
                    </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider">Hệ thống kiểm duyệt</p>
                        <p className="text-lg font-bold text-foreground mt-0.5">Tự động + Cơm</p>
                    </div>
                </div>
            </div>

            {/* Bảng danh sách chính */}
            <main className="pt-2">
                <AdminReportTable />
            </main>
        </div>
    );
}