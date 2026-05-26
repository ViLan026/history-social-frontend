// @/features/report/components/admin/AdminReportTable.tsx
"use client";

import React, { useState } from "react";
import { usePendingReports } from "../../useReport";
import { useReportStore } from "../../report.store";
import AdminReportDrawer from "./AdminReportDrawer";

export default function AdminReportTable() {
    const [page, setPage] = useState(0);
    const { data, isLoading } = usePendingReports(page, 20);
    const openAdminDrawer = useReportStore(state => state.openAdminDrawer);

    if (isLoading) return <div className="p-8 text-center animate-pulse">Đang tải danh sách báo cáo...</div>;

    const reports = data?.content ?? [];

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-border overflow-hidden bg-card">
                <table className="w-full text-left text-sm text-foreground">
                    <thead className="bg-muted text-foreground-muted uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Đối tượng</th>
                            <th className="px-6 py-4 font-medium">Lý do</th>
                            <th className="px-6 py-4 font-medium">Trạng thái</th>
                            <th className="px-6 py-4 font-medium">Ngày gửi</th>
                            <th className="px-6 py-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {reports.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-foreground-muted">
                                    Tuyệt vời! Hiện tại không có báo cáo nào cần duyệt.
                                </td>
                            </tr>
                        )}
                        {reports.map((item) => (
                            <tr key={item.report.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{item.report.targetType}</td>
                                <td className="px-6 py-4 text-destructive font-semibold">{item.report.reasonType}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-amber-500/10 text-amber-600 border-amber-500/20 border px-2.5 py-1 rounded-full text-xs font-medium">
                                        Đang chờ
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-foreground-muted">
                                    {new Date(item.report.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => openAdminDrawer(item)}
                                        className="text-primary hover:underline font-medium text-sm"
                                    >
                                        Xem & Xử lý
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Phân trang đơn giản */}
            {data && data.totalPages > 1 && (
                <div className="flex gap-2 justify-center pt-4">
                    <button 
                        onClick={() => setPage(p => Math.max(0, p - 1))} 
                        disabled={page === 0}
                        className="px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50"
                    >
                        Trước
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">Trang {page + 1} / {data.totalPages}</span>
                    <button 
                        onClick={() => setPage(p => Math.min(data.totalPages - 1, p + 1))} 
                        disabled={page >= data.totalPages - 1}
                        className="px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            )}

            <AdminReportDrawer />
        </div>
    );
}