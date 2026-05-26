"use client";

import { useEffect } from "react";
import { useReportStore } from "../../report.store";
import ReportActionButtons from "./ReportActionButtons";

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

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={closeAdminDrawer} />

            <div className="relative w-full max-w-[980px] max-h-[90vh] bg-card shadow-2xl rounded-2xl flex flex-col border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">
                        Chi tiết báo cáo
                    </h2>
                    <button
                        onClick={closeAdminDrawer}
                        className="p-2 hover:bg-muted rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    <section className="w-full space-y-3">
                        <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                            Thông tin báo cáo
                        </h3>
                        <div className="w-full bg-muted/30 p-4 rounded-xl border border-border space-y-2 text-sm">
                            <p className="w-full break-words">
                                <span>Loại:</span>{" "}
                                {report.targetType}
                            </p>
                            <p className="w-full break-words">
                                <span>Lý do:</span>{" "}
                                <span className="text-destructive font-bold">
                                    {report.reasonType}
                                </span>
                            </p>
                            <p className="w-full break-words">
                                <span>
                                    Người tố cáo ID:
                                </span>{" "}
                                {report.reporterId}
                            </p>
                            {report.reasonText && (
                                <p className="w-full break-words">
                                    <span>Mô tả:</span>{" "}
                                    <i className="text-foreground">
                                        &quot;{report.reasonText}&quot;
                                    </i>
                                </p>
                            )}
                        </div>
                    </section>

                    <section className="w-full space-y-3">
                        <h3 className="text-sm font-semibold uppercase text-foreground tracking-wider">
                            Nội dung vi phạm
                        </h3>
                        <div className="w-full bg-destructive/5 p-4 rounded-xl border border-border space-y-3">
                            <div className="flex items-center justify-between text-sm w-full">
                                <span className="font-bold text-foreground">
                                    {targetPreview.authorName}
                                </span>
                                {targetPreview.isDeleted && (
                                    <span className="text-xs bg-destructive text-foreground px-2 py-0.5 rounded">
                                        Đã xóa
                                    </span>
                                )}
                            </div>
                            {/* Thêm w-full để nội dung văn bản bị tố cáo trải đều hết chiều rộng */}
                            <p className="text-foreground text-sm whitespace-pre-wrap w-full break-words">
                                {targetPreview.content}
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer với các nút Action */}
                <div className="p-5 bg-card">
                    <ReportActionButtons reportId={report.id} />
                </div>
            </div>
        </div>
    );
}
