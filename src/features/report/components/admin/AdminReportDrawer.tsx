"use client";

import { useEffect } from "react";
import { useReportStore } from "../../report.store";
import ReportActionButtons from "./ReportActionButtons";
import {
    PostFactCheckClaimResponse,
    ReportReasonType
} from "../../report.types";

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

function getClaimLabel(label: PostFactCheckClaimResponse["label"]) {
    switch (label) {
        case "SUPPORTED":
            return "Được tài liệu hỗ trợ";
        case "REFUTED":
            return "Bị tài liệu bác bỏ";
        case "NOT_ENOUGH_EVIDENCE":
            return "Chưa đủ bằng chứng";
        default:
            return label;
    }
}

function renderEvidence(evidence: unknown) {
    if (!evidence) return null;

    if (typeof evidence === "string") {
        return (
            <p className="text-xs text-foreground-muted whitespace-pre-wrap">
                {evidence}
            </p>
        );
    }

    if (Array.isArray(evidence)) {
        return (
            <div className="space-y-2">
                {evidence.map((item, index) => (
                    <pre
                        key={index}
                        className="text-xs bg-muted/60 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap"
                    >
                        {typeof item === "string"
                            ? item
                            : JSON.stringify(item, null, 2)}
                    </pre>
                ))}
            </div>
        );
    }

    return (
        <pre className="text-xs bg-muted/60 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(evidence, null, 2)}
        </pre>
    );
}

export default function AdminReportDrawer() {
    const { isAdminDrawerOpen, selectedAdminReport, closeAdminDrawer } =
        useReportStore();

    useEffect(() => {
        if (isAdminDrawerOpen && selectedAdminReport) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAdminDrawerOpen, selectedAdminReport]);

    if (!isAdminDrawerOpen || !selectedAdminReport) return null;

    const { report, targetPreview } = selectedAdminReport;
    const factCheckClaims = targetPreview.factCheckClaims ?? [];

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={closeAdminDrawer} />

            <div className="relative w-full max-w-[1040px] max-h-[90vh] bg-card shadow-2xl rounded-2xl flex flex-col border border-border overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Chi tiết báo cáo
                        </h2>
                        <p className="text-sm text-foreground-muted">
                            Kiểm tra nội dung bị báo cáo trước khi xử lý.
                        </p>
                    </div>

                    <button
                        onClick={closeAdminDrawer}
                        className="p-2 hover:bg-muted rounded-full"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                            Thông tin báo cáo
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                <p className="text-foreground-muted">
                                    Loại đối tượng
                                </p>
                                <p className="font-semibold">
                                    {report.targetType}
                                </p>
                            </div>

                            <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                <p className="text-foreground-muted">
                                    Lý do báo cáo
                                </p>
                                <p className="font-semibold text-destructive">
                                    {reasonLabels[report.reasonType]}
                                </p>
                            </div>

                            <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                <p className="text-foreground-muted">
                                    Người báo cáo ID
                                </p>
                                <p className="font-mono text-xs break-all">
                                    {report.reporterId}
                                </p>
                            </div>

                            <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                <p className="text-foreground-muted">
                                    Số lượt báo cáo nội dung
                                </p>
                                <p className="font-semibold">
                                    {targetPreview.reportCount ?? 1}
                                </p>
                            </div>
                        </div>

                        {report.reasonText && (
                            <div className="bg-muted/30 p-4 rounded-xl border border-border text-sm">
                                <p className="text-foreground-muted mb-1">
                                    Mô tả từ người báo cáo
                                </p>
                                <p className="whitespace-pre-wrap ">
                                    {report.reasonText}
                                </p>
                            </div>
                        )}
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                            Nội dung bị báo cáo
                        </h3>

                        <div className="bg-destructive/5 p-4 rounded-xl border border-border space-y-3">
                            <div className="flex items-center justify-between gap-3 text-sm">
                                <div>
                                    <p className="font-bold text-foreground">
                                        {targetPreview.authorName ||
                                            "Không rõ tác giả"}
                                    </p>
                                    <p className="text-xs text-foreground-muted break-all">
                                        {targetPreview.authorId}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    {targetPreview.isDeleted && (
                                        <span className="text-xs bg-destructive text-white px-2 py-1 rounded-full">
                                            Đã xóa
                                        </span>
                                    )}

                                    {targetPreview.isHiddenByAdmin && (
                                        <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full border border-amber-500/20">
                                            Admin đã ẩn
                                        </span>
                                    )}

                                    {targetPreview.isHiddenByAuthor && (
                                        <span className="text-xs bg-muted px-2 py-1 rounded-full border border-border">
                                            Tác giả đã ẩn
                                        </span>
                                    )}
                                </div>
                            </div>

                            {targetPreview.title && (
                                <h4 className="font-semibold text-lg text-foreground ">
                                    {targetPreview.title}
                                </h4>
                            )}

                            <p className="text-foreground text-sm whitespace-pre-wrap ">
                                {targetPreview.content}
                            </p>
                        </div>
                    </section>

                    {report.targetType === "POST" && (
                        <section className="space-y-3">
                            <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                                Kết quả kiểm chứng AI
                            </h3>

                            {factCheckClaims.length === 0 ? (
                                <div className="p-4 rounded-xl border border-border bg-muted/20 text-sm text-foreground-muted">
                                    Chưa có dữ liệu kiểm chứng cho bài viết này.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {factCheckClaims
                                        .slice()
                                        .sort(
                                            (a, b) =>
                                                a.displayOrder - b.displayOrder
                                        )
                                        .map((claim) => (
                                            <div
                                                key={claim.id}
                                                className="p-4 rounded-xl border border-border bg-muted/20 space-y-3"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <p className="font-medium text-sm ">
                                                        {claim.claimText}
                                                    </p>

                                                    <span className="shrink-0 text-xs px-2.5 py-1 rounded-full border border-border bg-card">
                                                        {getClaimLabel(
                                                            claim.label
                                                        )}
                                                    </span>
                                                </div>

                                                {claim.explanation && (
                                                    <p className="text-sm text-foreground-muted whitespace-pre-wrap ">
                                                        {claim.explanation}
                                                    </p>
                                                )}

                                                {claim.evidence !== undefined &&
                                                    claim.evidence !== null && (
                                                        <div className="space-y-2">
                                                            <p className="text-xs font-semibold text-foreground-muted uppercase">
                                                                Bằng chứng
                                                            </p>
                                                            {renderEvidence(
                                                                claim.evidence
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </section>
                    )}

                    {report.targetType === "COMMENT" &&
                        targetPreview.hateSpeechResult && (
                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                                    Kết quả kiểm tra bình luận
                                </h3>

                                <div className="p-4 rounded-xl border border-border bg-muted/20 text-sm">
                                    <p>
                                        Nhãn:{" "}
                                        <span className="font-semibold">
                                            {targetPreview.hateSpeechResult
                                                .label === "HATE"
                                                ? "Nội dung không phù hợp"
                                                : "Bình thường"}
                                        </span>
                                    </p>

                                    {typeof targetPreview.hateSpeechResult
                                        .score === "number" && (
                                        <p className="text-foreground-muted">
                                            Độ tin cậy:{" "}
                                            {(
                                                targetPreview.hateSpeechResult
                                                    .score * 100
                                            ).toFixed(2)}
                                            %
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}
                </div>

                <div className="p-5 bg-card border-t border-border">
                    <ReportActionButtons
                        reportId={report.id}
                        targetType={report.targetType}
                        currentStatus={report.status}
                    />
                </div>
            </div>
        </div>
    );
}
