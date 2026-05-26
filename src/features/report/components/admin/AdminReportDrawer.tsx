// @/features/report/components/admin/AdminReportDrawer.tsx
"use client";

import { useReportStore } from "../../report.store";
import ReportActionButtons from "./ReportActionButtons";

export default function AdminReportDrawer() {
    const { isAdminDrawerOpen, selectedAdminReport, closeAdminDrawer } = useReportStore();

    if (!isAdminDrawerOpen || !selectedAdminReport) return null;

    const { report, targetPreview } = selectedAdminReport;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            {/* Vùng bấm ngoài để đóng */}
            <div className="absolute inset-0" onClick={closeAdminDrawer} />

            {/* Khung Drawer */}
            <div className="relative w-full max-w-lg h-full bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">Chi tiết báo cáo</h2>
                    <button onClick={closeAdminDrawer} className="p-2 hover:bg-muted rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {/* Thông tin báo cáo */}
                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">Thông tin báo cáo</h3>
                        <div className="bg-muted/30 p-4 rounded-xl border border-border space-y-2 text-sm">
                            <p><span className="font-medium">Loại:</span> {report.targetType}</p>
                            <p><span className="font-medium">Lý do:</span> <span className="text-destructive font-bold">{report.reasonType}</span></p>
                            <p><span className="font-medium">Người tố cáo ID:</span> {report.reporterId}</p>
                            {report.reasonText && (
                                <p><span className="font-medium">Mô tả:</span> <i className="text-foreground-muted">&quot;{report.reasonText}&quot;</i></p>
                            )}
                        </div>
                    </section>

                    {/* Nội dung bị báo cáo */}
                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">Nội dung vi phạm</h3>
                        <div className="bg-destructive/5 p-4 rounded-xl border border-destructive/20 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-bold text-foreground">{targetPreview.authorName}</span>
                                {targetPreview.isDeleted && <span className="text-xs bg-destructive text-white px-2 py-0.5 rounded">Đã xóa</span>}
                            </div>
                            <p className="text-foreground text-sm whitespace-pre-wrap">{targetPreview.content}</p>
                        </div>
                    </section>
                </div>

                {/* Footer với các nút Action */}
                <div className="p-5 border-t border-border bg-card">
                    <ReportActionButtons reportId={report.id} />
                </div>
            </div>
        </div>
    );
}