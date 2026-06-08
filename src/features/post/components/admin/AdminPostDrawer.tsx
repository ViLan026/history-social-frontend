"use client";

import React, { useEffect, useState } from "react";
import { usePostStore } from "../../post.store";
import { useAdminPostDetail } from "../../usePost";
import { PostFactCheckClaimResponse, PostStatus } from "../../post.types";
import AdminPostStatusActions from "./AdminPostStatusActions";

function formatDate(value?: string) {
    if (!value) return "Không rõ";
    return new Date(value).toLocaleString("vi-VN");
}

function getStatusLabel(status?: PostStatus) {
    switch (status) {
        case PostStatus.PUBLISHED:
            return "Đang công khai";
        case PostStatus.FLAGGED:
            return "Đang bị gắn cờ";
        case PostStatus.REJECTED:
            return "Đã từ chối";
        case PostStatus.HIDDEN:
            return "Người dùng đã ẩn";
        case PostStatus.DRAFT:
            return "Bản nháp";
        default:
            return status || "Không rõ";
    }
}

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

function getEvidenceCount(evidence: unknown) {
    if (Array.isArray(evidence)) return evidence.length;
    if (evidence === undefined || evidence === null) return 0;
    return 1;
}

function isEvidenceObject(value: unknown): value is {
    chunk_id?: string;
    score?: number;
    book_name?: string;
    pages?: number[];
    text?: string;
    footnotes?: unknown;
} {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatScore(score?: number) {
    if (typeof score !== "number") return null;
    return score.toFixed(3);
}

function hasNonEmptyFootnotes(footnotes: unknown) {
    if (footnotes === undefined || footnotes === null) return false;

    if (typeof footnotes === "string") {
        return footnotes.trim().length > 0;
    }

    if (Array.isArray(footnotes)) {
        return footnotes.length > 0;
    }

    if (typeof footnotes === "object") {
        return Object.keys(footnotes).length > 0;
    }

    return true;
}

function renderEvidenceItem(item: unknown, index: number) {
    if (typeof item === "string") {
        return (
            <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <p className="mb-2 text-xs font-semibold text-foreground-muted">
                    Bằng chứng {index + 1}
                </p>
                <p className="whitespace-pre-wrap text-foreground-muted">
                    {item}
                </p>
            </div>
        );
    }

    if (typeof item === "number" || typeof item === "boolean") {
        return (
            <div className="rounded-xl border border-border bg-card p-4 text-sm text-foreground-muted">
                {String(item)}
            </div>
        );
    }

    if (isEvidenceObject(item)) {
        const score = formatScore(item.score);

        return (
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-muted">
                    <span className="font-semibold text-foreground">
                        Bằng chứng {index + 1}
                    </span>

                    {item.book_name && (
                        <span className="rounded-full border border-border px-2 py-0.5">
                            {item.book_name}
                        </span>
                    )}

                    {item.pages && item.pages.length > 0 && (
                        <span className="rounded-full border border-border px-2 py-0.5">
                            Trang {item.pages.join(", ")}
                        </span>
                    )}

                    {score && (
                        <span className="rounded-full border border-border px-2 py-0.5">
                            Score {score}
                        </span>
                    )}
                </div>

                {item.text && (
                    <p className="text-sm whitespace-pre-wrap text-foreground-muted">
                        {item.text}
                    </p>
                )}

                {hasNonEmptyFootnotes(item.footnotes) && (
                    <details className="text-xs">
                        <summary className="cursor-pointer text-primary font-medium">
                            Xem chú thích
                        </summary>
                        <pre className="mt-2 rounded-lg bg-muted/60 p-3 overflow-x-auto whitespace-pre-wrap">
                            {JSON.stringify(item.footnotes, null, 2)}
                        </pre>
                    </details>
                )}
            </div>
        );
    }

    return (
        <pre className="text-xs bg-muted/60 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(item, null, 2)}
        </pre>
    );
}

function ClaimEvidence({ evidence }: { evidence: unknown }) {
    const [isOpen, setIsOpen] = useState(false);

    if (evidence === undefined || evidence === null) {
        return null;
    }

    const evidenceItems = Array.isArray(evidence) ? evidence : [evidence];
    const evidenceCount = getEvidenceCount(evidence);

    return (
        <div className="space-y-2">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
                <span>{isOpen ? "Ẩn bằng chứng" : "Xem bằng chứng"}</span>
                <span className="text-foreground-muted">({evidenceCount})</span>
                <span>{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
                <div className="space-y-3 pt-1">
                    {evidenceItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {renderEvidenceItem(item, index)}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function AdminPostDrawer() {
    const { isAdminPostDrawerOpen, selectedAdminPostId, closeAdminPostDrawer } =
        usePostStore();

    const { data: post, isLoading } = useAdminPostDetail(
        selectedAdminPostId,
        isAdminPostDrawerOpen
    );

    useEffect(() => {
        if (isAdminPostDrawerOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAdminPostDrawerOpen]);

    if (!isAdminPostDrawerOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={closeAdminPostDrawer} />

            <div className="relative w-full max-w-[1040px] max-h-[90vh] bg-card shadow-2xl rounded-2xl flex flex-col border border-border overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Chi tiết bài viết
                        </h2>
                        <p className="text-sm text-foreground-muted">
                            Xem nội dung, kết quả kiểm chứng và xử lý trạng
                            thái.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={closeAdminPostDrawer}
                        className="p-2 hover:bg-muted rounded-full"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {isLoading ? (
                        <div className="py-16 text-center text-foreground-muted animate-pulse">
                            Đang tải chi tiết bài viết...
                        </div>
                    ) : !post ? (
                        <div className="py-16 text-center text-foreground-muted">
                            Không tìm thấy bài viết.
                        </div>
                    ) : (
                        <>
                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                                    Thông tin chung
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                        <p className="text-foreground-muted">
                                            Trạng thái
                                        </p>
                                        <p className="font-semibold">
                                            {getStatusLabel(post.status)}
                                        </p>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                        <p className="text-foreground-muted">
                                            Báo cáo
                                        </p>
                                        <p className="font-semibold">
                                            {post.reportCount}
                                        </p>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                        <p className="text-foreground-muted">
                                            Bình luận
                                        </p>
                                        <p className="font-semibold">
                                            {post.commentCount}
                                        </p>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-xl border border-border">
                                        <p className="text-foreground-muted">
                                            Tương tác
                                        </p>
                                        <p className="font-semibold">
                                            {post.reactionCount}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl border border-border text-sm">
                                    <p className="text-foreground-muted">
                                        Tác giả
                                    </p>
                                    <p className="font-semibold">
                                        {post.authorName}
                                    </p>
                                    <p className="font-mono text-xs text-foreground-muted break-all">
                                        {post.authorId}
                                    </p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl border border-border text-sm">
                                    <p>
                                        <span className="text-foreground-muted">
                                            Ngày tạo:
                                        </span>{" "}
                                        {formatDate(post.createdAt)}
                                    </p>
                                    <p>
                                        <span className="text-foreground-muted">
                                            Cập nhật:
                                        </span>{" "}
                                        {formatDate(post.updatedAt)}
                                    </p>
                                    {post.deletedAt && (
                                        <p>
                                            <span className="text-foreground-muted">
                                                Ngày xóa:
                                            </span>{" "}
                                            {formatDate(post.deletedAt)}
                                        </p>
                                    )}
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                                    Nội dung bài viết
                                </h3>

                                <div className="bg-muted/20 p-4 rounded-xl border border-border space-y-3">
                                    <h4 className="font-bold text-lg">
                                        {post.title}
                                    </h4>

                                    <p className="text-sm whitespace-pre-wrap">
                                        {post.content}
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                                    Tổng quan kiểm chứng
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl border border-border bg-muted/20">
                                        <p className="text-sm text-foreground-muted">
                                            Được hỗ trợ
                                        </p>
                                        <p className="text-xl font-bold">
                                            {
                                                post.factCheckSummary
                                                    .supportedCount
                                            }
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl border border-border bg-muted/20">
                                        <p className="text-sm text-foreground-muted">
                                            Bị bác bỏ
                                        </p>
                                        <p className="text-xl font-bold text-destructive">
                                            {post.factCheckSummary.refutedCount}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl border border-border bg-muted/20">
                                        <p className="text-sm text-foreground-muted">
                                            Chưa đủ bằng chứng
                                        </p>
                                        <p className="text-xl font-bold">
                                            {
                                                post.factCheckSummary
                                                    .notEnoughEvidenceCount
                                            }
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase text-foreground-muted tracking-wider">
                                    Chi tiết kiểm chứng
                                </h3>

                                {post.factCheckClaims.length === 0 ? (
                                    <div className="p-4 rounded-xl border border-border bg-muted/20 text-sm text-foreground-muted">
                                        Chưa có dữ liệu kiểm chứng cho bài viết
                                        này.
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {post.factCheckClaims
                                            .slice()
                                            .sort(
                                                (a, b) =>
                                                    a.displayOrder -
                                                    b.displayOrder
                                            )
                                            .map((claim) => (
                                                <div
                                                    key={claim.id}
                                                    className="p-4 rounded-xl border border-border bg-muted/20 space-y-3"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <p className="font-medium text-sm">
                                                            {claim.claimText}
                                                        </p>

                                                        <span className="shrink-0 text-xs px-2.5 py-1 rounded-full border border-border bg-card">
                                                            {getClaimLabel(
                                                                claim.label
                                                            )}
                                                        </span>
                                                    </div>

                                                    {claim.explanation && (
                                                        <p className="text-sm text-foreground-muted whitespace-pre-wrap">
                                                            {claim.explanation}
                                                        </p>
                                                    )}

                                                    <ClaimEvidence
                                                        evidence={
                                                            claim.evidence
                                                        }
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                </div>

                {post && (
                    <div className="p-5 bg-card border-t border-border">
                        <AdminPostStatusActions
                            postId={post.id}
                            currentStatus={post.status}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
