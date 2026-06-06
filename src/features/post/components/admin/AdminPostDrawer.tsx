"use client";

import React, { useEffect } from "react";
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

function renderEvidence(evidence: unknown): React.ReactNode {
    if (evidence === undefined || evidence === null) return null;

    if (typeof evidence === "string") {
        return (
            <p className="text-xs text-foreground-muted whitespace-pre-wrap">
                {evidence}
            </p>
        );
    }

    if (typeof evidence === "number" || typeof evidence === "boolean") {
        return (
            <p className="text-xs text-foreground-muted">
                {String(evidence)}
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

export default function AdminPostDrawer() {
    const {
        isAdminPostDrawerOpen,
        selectedAdminPostId,
        closeAdminPostDrawer,
    } = usePostStore();

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
                            Xem nội dung, kết quả kiểm chứng và xử lý trạng thái.
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
                                    <h4 className="font-bold text-lg break-words">
                                        {post.title}
                                    </h4>

                                    <p className="text-sm whitespace-pre-wrap break-words">
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
                                            {
                                                post.factCheckSummary
                                                    .refutedCount
                                            }
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
                                        Chưa có dữ liệu kiểm chứng cho bài viết này.
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
                                                        <p className="font-medium text-sm break-words">
                                                            {claim.claimText}
                                                        </p>

                                                        <span className="shrink-0 text-xs px-2.5 py-1 rounded-full border border-border bg-card">
                                                            {getClaimLabel(
                                                                claim.label
                                                            )}
                                                        </span>
                                                    </div>

                                                    {claim.explanation && (
                                                        <p className="text-sm text-foreground-muted whitespace-pre-wrap break-words">
                                                            {claim.explanation}
                                                        </p>
                                                    )}

                                                    {claim.evidence !==
                                                        undefined &&
                                                        claim.evidence !==
                                                            null && (
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