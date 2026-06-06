"use client";

import React from "react";
import { useReviewReport } from "../../useReport";
import { ReportStatus, ReportTargetType } from "../../report.types";

interface Props {
    reportId: string;
    targetType: ReportTargetType;
}

export default function ReportActionButtons({ reportId, targetType }: Props) {
    const { mutate: reviewReport, isPending } = useReviewReport();

    const handleReview = (status: ReportStatus) => {
        const message =
            status === "RESOLVED"
                ? targetType === "POST"
                    ? "Xác nhận vi phạm và chuyển bài viết sang trạng thái REJECTED?"
                    : "Xác nhận vi phạm và xóa/ẩn bình luận này?"
                : "Bỏ qua báo cáo này?";

        if (confirm(message)) {
            reviewReport({ id: reportId, request: { status } });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <button
                type="button"
                onClick={() => handleReview("DISMISSED")}
                disabled={isPending}
                className="flex-1 py-2.5 px-4 rounded-lg border border-border text-foreground hover:bg-muted font-medium transition-colors disabled:opacity-50"
            >
                Bỏ qua báo cáo
            </button>

            <button
                type="button"
                onClick={() => handleReview("RESOLVED")}
                disabled={isPending}
                className="flex-1 py-2.5 px-4 rounded-lg bg-destructive text-white hover:bg-destructive/90 font-medium transition-colors disabled:opacity-50"
            >
                Xác nhận vi phạm
            </button>
        </div>
    );
}