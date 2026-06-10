// src/features/report/components/admin/ReportActionButtons.tsx
"use client";

import { useReviewReport } from "../../useReport";
import { ReportStatus, ReportTargetType } from "../../report.types";

interface ReportActionButtonsProps {
    reportId: string;
    targetType: ReportTargetType;
    currentStatus: ReportStatus;
}

export default function ReportActionButtons({
    reportId,
    targetType,
    currentStatus
}: ReportActionButtonsProps) {
    const { mutate: reviewReport, isPending } = useReviewReport();

    const handleReview = (status: ReportStatus) => {
        const message =
            status === "RESOLVED"
                ? targetType === "POST"
                    ? "Xác nhận vi phạm và chuyển bài viết sang trạng thái REJECTED?"
                    : "Xác nhận vi phạm và ẩn bình luận này?"
                : status === "DISMISSED"
                  ? "Bỏ qua báo cáo này?"
                  : "Chuyển báo cáo này về trạng thái chờ xử lý?";

        if (!window.confirm(message)) return;

        reviewReport({
            id: reportId,
            request: { status }
        });
    };

    return (
        <div className="space-y-3">
            <div className="border-t border-border pt-4">
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                    Xử lý báo cáo
                </h4>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        disabled={isPending || currentStatus === "DISMISSED"}
                        onClick={() => handleReview("DISMISSED")}
                        className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Bỏ qua báo cáo
                    </button>

                    <button
                        type="button"
                        disabled={isPending || currentStatus === "PENDING"}
                        onClick={() => handleReview("PENDING")}
                        className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Chuyển về chờ xử lý
                    </button>

                    <button
                        type="button"
                        disabled={isPending || currentStatus === "RESOLVED"}
                        onClick={() => handleReview("RESOLVED")}
                        className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-fg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Xác nhận vi phạm
                    </button>
                </div>
            </div>
        </div>
    );
}