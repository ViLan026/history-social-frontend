// @/features/report/components/admin/ReportActionButtons.tsx
"use client";

import React from "react";
import { useReviewReport } from "../../useReport";
import { ReportStatus } from "../../report.types";

interface Props {
    reportId: string;
}

export default function ReportActionButtons({ reportId }: Props) {
    const { mutate: reviewReport, isPending } = useReviewReport();

    const handleReview = (status: ReportStatus) => {
        if (confirm(`Bạn chắc chắn muốn đánh dấu báo cáo này là ${status}?`)) {
            reviewReport({ id: reportId, request: { status } });
        }
    };

    return (
        <div className="flex gap-3 pt-4 border-t border-border mt-4">
            <button
                onClick={() => handleReview("DISMISSED")}
                disabled={isPending}
                className="flex-1 py-2 px-4 rounded-lg border border-border text-foreground hover:bg-muted font-medium transition-colors disabled:opacity-50"
            >
                Bỏ qua (Sai phạm không hợp lệ)
            </button>
            <button
                onClick={() => handleReview("RESOLVED")}
                disabled={isPending}
                className="flex-1 py-2 px-4 rounded-lg bg-destructive text-white hover:bg-destructive/90 font-medium transition-colors disabled:opacity-50"
            >
                Xác nhận vi phạm (Xóa/Ẩn nội dung)
            </button>
        </div>
    );
}