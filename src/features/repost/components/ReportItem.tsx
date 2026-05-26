"use client";

import React from "react";
import {
    MyReportResponse,
    ReportReasonType,
    ReportStatus,
    ReportTargetType
} from "../report.types";

interface ReportItemProps {
    report: MyReportResponse;
}

// Map trạng thái sang hiển thị UI (Nhãn và Màu sắc)
const STATUS_CONFIG: Record<
    ReportStatus,
    { label: string; className: string }
> = {
    PENDING: {
        label: "Đang chờ xử lý",
        className: "bg-amber-500/10 text-amber-600 border-amber-500/20"
    },
    RESOLVED: {
        label: "Đã xử lý vi phạm",
        className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
    },
    DISMISSED: {
        label: "Báo cáo không hợp lệ",
        className: "bg-muted text-foreground/60 border-border/50"
    }
};

// Map lý do sang Tiếng Việt
const REASON_LABEL: Record<ReportReasonType, string> = {
    MISINFORMATION: "Thông tin sai lệch",
    FAKE_HISTORY: "Xuyên tạc lịch sử",
    HATE_SPEECH: "Nội dung thù ghét",
    VIOLENCE: "Nội dung bạo lực",
    HARASSMENT: "Quấy rối",
    SPAM: "Spam / Quảng cáo rác",
    INAPPROPRIATE: "Nội dung không phù hợp",
    OTHER: "Lý do khác"
};

// Map loại đối tượng bị báo cáo
const TARGET_LABEL: Record<ReportTargetType, string> = {
    POST: "Bài viết",
    COMMENT: "Bình luận"
};

export default function ReportItem({ report }: ReportItemProps) {
    // Sửa lỗi: Đảm bảo luôn có fallback nếu trạng thái từ backend không khớp với type hệ thống
    const statusConfig = STATUS_CONFIG[report.status] || {
        label: "Không xác định",
        className: "bg-muted text-foreground border-border"
    };

    const formattedDate = report.createdAt
        ? new Date(report.createdAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
          })
        : "---";

    // Đảm bảo không lỗi nếu targetType bị thiếu hoặc sai lệch từ backend
    const targetText = TARGET_LABEL[report.targetType] || "Nội dung";
    const reasonTextLabel = REASON_LABEL[report.reasonType] || "Lý do khác";

    return (
        <article className="rounded-xl border border-border bg-card p-4 md:p-5 transition-shadow hover:shadow-sm space-y-4">
            {/* Header: Trạng thái & Ngày gửi */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                        Báo cáo {targetText.toLowerCase()}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-xs text-muted-foreground">
                        {formattedDate}
                    </span>
                </div>
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.className}`}
                >
                    {statusConfig.label}
                </span>
            </div>

            {/* Body: Lý do và Nội dung */}
            <div className="space-y-3">
                <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                    <span className="text-muted-foreground">
                        Lý do vi phạm:
                    </span>
                    <span className="font-medium text-foreground">
                        {reasonTextLabel}
                    </span>
                </div>

                {report.reasonText && (
                    <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                        <span className="text-muted-foreground">
                            Chi tiết bổ sung:
                        </span>
                        <span className="text-foreground italic">
                            &quot;{report.reasonText}&quot;
                        </span>
                    </div>
                )}

                {/* Khối hiển thị Preview Nội dung gốc bị báo cáo */}
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    Nội dung bị báo cáo
                </span>
                {report.targetExists ? (
                    <div className="text-sm text-foreground line-clamp-2 leading-relaxed">
                        {report.targetContentPreview ||
                            "Không có bản xem trước cho nội dung này."}
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        {report.targetStatus === "DELETED"
                            ? "Nội dung này đã bị xóa khỏi hệ thống."
                            : "Nội dung này đã bị ẩn."}
                    </div>
                )}
            </div>
        </article>
    );
}
