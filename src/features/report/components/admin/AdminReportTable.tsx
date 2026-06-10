"use client";

import React, { useState } from "react";
import { useAdminReports } from "../../useReport";
import { useReportStore } from "../../report.store";
import {
    ReportReasonType,
    ReportTargetType,
    ReportStatus
} from "../../report.types";
import AdminReportDrawer from "./AdminReportDrawer";

const REPORT_TABS: { label: string; value: ReportTargetType }[] = [
    { label: "Bài viết", value: "POST" },
    { label: "Bình luận", value: "COMMENT" }
];

const STATUS_OPTIONS: { label: string; value: ReportStatus | "" }[] = [
    { label: "Tất cả trạng thái", value: "" },
    { label: "Đang chờ", value: "PENDING" },
    { label: "Đã xử lý", value: "RESOLVED" },
    { label: "Đã bỏ qua", value: "DISMISSED" }
];

const reasonLabels: Record<ReportReasonType, string> = {
    MISINFORMATION: "Thông tin sai lệch",
    FAKE_HISTORY: "Xuyên tạc lịch sử",
    HATE_SPEECH: "Nội dung thù ghét",
    VIOLENCE: "Bạo lực",
    HARASSMENT: "Quấy rối",
    SPAM: "Spam",
    INAPPROPRIATE: "Không phù hợp",
    OTHER: "Khác"
};

const reportStatusLabels: Record<ReportStatus, string> = {
    PENDING: "Đang chờ",
    RESOLVED: "Đã xử lý",
    DISMISSED: "Đã bỏ qua"
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

function getEmptyMessage(targetType: ReportTargetType, status: ReportStatus | "") {
    const targetLabel = targetType === "POST" ? "bài viết" : "bình luận";

    if (!status) {
        return `Hiện tại không có báo cáo ${targetLabel}.`;
    }

    return `Hiện tại không có báo cáo ${targetLabel} ở trạng thái "${reportStatusLabels[status]}".`;
}

export default function AdminReportTable() {
    const [activeTab, setActiveTab] = useState<ReportTargetType>("POST");
    const [status, setStatus] = useState<ReportStatus | "">("");
    const [page, setPage] = useState(0);

    const { data, isLoading } = useAdminReports(
        page,
        20,
        activeTab,
        status || undefined
    );

    const openAdminDrawer = useReportStore((state) => state.openAdminDrawer);

    const reports = data?.content ?? [];

    return (
        <div className="space-y-4">
            <div className="sticky top-0 z-20 bg-background pt-2">
                <div className="flex flex-col gap-3 border-b border-border bg-background pb-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        {REPORT_TABS.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                onClick={() => {
                                    setActiveTab(tab.value);
                                    setPage(0);
                                }}
                                className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === tab.value
                                        ? "border-primary text-primary"
                                        : "border-transparent text-foreground-muted hover:text-foreground"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-full md:w-64">
                        <select
                            value={status}
                            onChange={(event) => {
                                setStatus(event.target.value as ReportStatus | "");
                                setPage(0);
                            }}
                            className="h-11 w-full rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary"
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option
                                    key={option.value || "ALL"}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full text-left text-sm text-foreground">
                    <thead className="bg-muted text-xs uppercase text-foreground-muted">
                        <tr>
                            <th className="px-6 py-4 font-medium">Lý do</th>
                            <th className="px-6 py-4 font-medium">Nội dung</th>
                            <th className="px-6 py-4 font-medium">
                                Trạng thái báo cáo
                            </th>
                            <th className="px-6 py-4 font-medium">
                                Trạng thái nội dung
                            </th>
                            <th className="px-6 py-4 font-medium">Ngày gửi</th>
                            <th className="px-6 py-4 text-right">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border/50">
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-8 text-center animate-pulse"
                                >
                                    Đang tải danh sách báo cáo...
                                </td>
                            </tr>
                        ) : reports.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-8 text-center text-foreground-muted"
                                >
                                    {getEmptyMessage(activeTab, status)}
                                </td>
                            </tr>
                        ) : (
                            reports.map((item) => (
                                <tr
                                    key={item.report.id}
                                    className="transition-colors hover:bg-muted/50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-destructive">
                                            {reasonLabels[item.report.reasonType]}
                                        </div>
                                    </td>

                                    <td className="max-w-[320px] px-6 py-4">
                                        {item.targetPreview.title && (
                                            <div className="line-clamp-1 font-semibold">
                                                {item.targetPreview.title}
                                            </div>
                                        )}

                                        <div className="line-clamp-2 text-foreground-muted">
                                            {item.targetPreview.content}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium">
                                            {reportStatusLabels[item.report.status]}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium">
                                            {getTargetStatusLabel(
                                                item.targetPreview.targetStatus
                                            )}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-foreground-muted">
                                        {formatDate(item.report.createdAt)}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => openAdminDrawer(item)}
                                            className="text-sm font-medium text-primary hover:underline"
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
                <div className="flex justify-center gap-2 pt-4">
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="rounded-lg border border-border bg-card px-4 py-2 hover:bg-muted disabled:opacity-50"
                    >
                        Trước
                    </button>

                    <span className="px-4 py-2 text-sm font-medium">
                        Trang {page + 1} / {data.totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setPage((p) => Math.min(data.totalPages - 1, p + 1))
                        }
                        disabled={page >= data.totalPages - 1}
                        className="rounded-lg border border-border bg-card px-4 py-2 hover:bg-muted disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            )}

            <AdminReportDrawer />
        </div>
    );
}