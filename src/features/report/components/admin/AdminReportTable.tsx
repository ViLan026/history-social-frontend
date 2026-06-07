"use client";

import React, { useState } from "react";
import { usePendingReports } from "../../useReport";
import { useReportStore } from "../../report.store";
import { ReportReasonType, ReportTargetType } from "../../report.types";
import AdminReportDrawer from "./AdminReportDrawer";

const REPORT_TABS: { label: string; value: ReportTargetType }[] = [
    { label: "Bài viết", value: "POST" },
    { label: "Bình luận", value: "COMMENT" },
];

const reasonLabels: Record<ReportReasonType, string> = {
    MISINFORMATION: "Thông tin sai lệch",
    FAKE_HISTORY: "Xuyên tạc lịch sử",
    HATE_SPEECH: "Nội dung thù ghét",
    VIOLENCE: "Bạo lực",
    HARASSMENT: "Quấy rối",
    SPAM: "Spam",
    INAPPROPRIATE: "Không phù hợp",
    OTHER: "Khác",
};

function formatDate(value?: string) {
    if (!value) return "Không rõ";
    return new Date(value).toLocaleString("vi-VN");
}

function getTargetStatusLabel(status?: string) {
    switch (status) {
        case "REJECTED":
            return "Đã từ chối";
        case "FLAGGED":
            return "Đang bị gắn cờ";
        case "PUBLISHED":
            return "Đang công khai";
        case "DRAFT":
            return "Bản nháp";
        case "HIDDEN":
            return "Đã ẩn";
        case "DELETED":
            return "Đã xóa";
        default:
            return status || "Không rõ";
    }
}

export default function AdminReportTable() {
    const [activeTab, setActiveTab] = useState<ReportTargetType>("POST");
    const [postPage, setPostPage] = useState(0);
    const [commentPage, setCommentPage] = useState(0);

    const currentPage = activeTab === "POST" ? postPage : commentPage;
    const setCurrentPage = activeTab === "POST" ? setPostPage : setCommentPage;

    const { data, isLoading } = usePendingReports(currentPage, 20, activeTab);
    const openAdminDrawer = useReportStore((state) => state.openAdminDrawer);

    const reports = data?.content ?? [];

    return (
        <div className="space-y-4">
            <div className="sticky top-0 z-20 bg-background pt-2">
                <div className="flex items-center gap-2 border-b border-border bg-background">
                    {REPORT_TABS.map((tab) => (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.value
                                    ? "border-primary text-primary"
                                    : "border-transparent text-foreground-muted hover:text-foreground"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden bg-card">
                <table className="w-full text-left text-sm text-foreground">
                    <thead className="bg-muted text-foreground-muted uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Lý do</th>
                            {/* <th className="px-6 py-4 font-medium">Người đăng</th> */}
                            <th className="px-6 py-4 font-medium">Nội dung</th>
                            <th className="px-6 py-4 font-medium">Trạng thái nội dung</th>
                            <th className="px-6 py-4 font-medium">Ngày gửi</th>
                            <th className="px-6 py-4 text-right">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border/50">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center animate-pulse">
                                    Đang tải danh sách báo cáo...
                                </td>
                            </tr>
                        ) : reports.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-foreground-muted">
                                    Hiện tại không có báo cáo {activeTab === "POST" ? "bài viết" : "bình luận"} nào cần duyệt.
                                </td>
                            </tr>
                        ) : (
                            reports.map((item) => (
                                <tr key={item.report.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-destructive">
                                            {reasonLabels[item.report.reasonType]}
                                        </div>
                                        {/* <div className="text-xs text-foreground-muted">
                                            {item.report.targetType}
                                        </div> */}
                                    </td>

                                    {/* <td className="px-6 py-4">
                                        <div className="font-medium">
                                            {item.targetPreview.authorName || "Không rõ"}
                                        </div>
                                        <div className="text-xs text-foreground-muted break-all">
                                            {item.targetPreview.authorId}
                                        </div>
                                    </td> */}

                                    <td className="px-6 py-4 max-w-[320px]">
                                        {item.targetPreview.title && (
                                            <div className="font-semibold line-clamp-1">
                                                {item.targetPreview.title}
                                            </div>
                                        )}
                                        <div className="text-foreground-muted line-clamp-2">
                                            {item.targetPreview.content}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="border border-border px-2.5 py-1 rounded-full text-xs font-medium">
                                            {getTargetStatusLabel(item.targetPreview.targetStatus)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-foreground-muted">
                                        {formatDate(item.report.createdAt)}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => openAdminDrawer(item)}
                                            className="text-primary hover:underline font-medium text-sm"
                                        >
                                            Xem & xử lý
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {data && data.totalPages > 1 && (
                <div className="flex gap-2 justify-center pt-4">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                        disabled={currentPage === 0}
                        className="px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50"
                    >
                        Trước
                    </button>

                    <span className="px-4 py-2 text-sm font-medium">
                        Trang {currentPage + 1} / {data.totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(data.totalPages - 1, p + 1))}
                        disabled={currentPage >= data.totalPages - 1}
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