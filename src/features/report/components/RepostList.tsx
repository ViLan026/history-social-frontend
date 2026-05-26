"use client";

import React, { useState } from "react";
import { useMyReports } from "../useReport";
import ReportItem from "./ReportItem";

export default function ReportList() {
    // Backend Spring Boot page thường bắt đầu từ 0
    const [page, setPage] = useState<number>(0);
    const size = 10;

    const { data, isLoading, isError, isFetching } = useMyReports(page, size);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((skeleton) => (
                    <div key={skeleton} className="rounded-xl border border-border bg-card p-5 h-48 animate-pulse flex flex-col gap-4">
                        <div className="flex justify-between w-full border-b border-border/50 pb-3">
                            <div className="h-4 w-1/3 bg-muted rounded"></div>
                            <div className="h-6 w-24 bg-muted rounded-full"></div>
                        </div>
                        <div className="space-y-3 flex-1">
                            <div className="h-4 w-3/4 bg-muted rounded"></div>
                            <div className="h-16 w-full bg-muted/50 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
                <p className="text-sm text-destructive">
                    Không thể tải lịch sử báo cáo lúc này. Vui lòng thử lại sau.
                </p>
            </div>
        );
    }

    const reports = data?.content ?? [];
    const totalPages = data?.totalPages ?? 1;

    // Trạng thái trống (Chưa từng báo cáo ai)
    if (reports.length === 0) {
        return (
            <div className="rounded-xl bg-card p-12 text-center border border-dashed border-border flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 15.75h3.75M18 19.5v-14.25A2.25 2.25 0 0015.75 3h-7.5a2.25 2.25 0 00-2.25 2.25v14.25a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25z" />
                    </svg>
                </div>
                <h3 className="text-base font-semibold text-foreground">Chưa có lịch sử báo cáo</h3>
                <p className="text-xs md:text-sm text-muted-foreground max-w-sm">
                    Những bài viết hoặc bình luận bạn báo cáo vi phạm sẽ được hiển thị tại đây để bạn theo dõi tiến độ xử lý.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* List */}
            <div className={`space-y-4 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}>
                {reports.map((report) => (
                    <ReportItem key={report.id} report={report} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0 || isFetching}
                        className="p-2 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:hover:bg-card transition-colors cursor-pointer"
                        title="Trang trước"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <span className="text-xs md:text-sm font-medium text-foreground px-4 py-2 bg-muted rounded-lg border border-border/40">
                        Trang {page + 1} / {totalPages}
                    </span>

                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={page >= totalPages - 1 || isFetching}
                        className="p-2 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:hover:bg-card transition-colors cursor-pointer"
                        title="Trang sau"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}