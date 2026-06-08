"use client";

import { useEffect } from "react";
import { usePostStore } from "../../post.store";
import { useAdminPostDetail } from "../../usePost";
import { PostStatus } from "../../post.types";
import AdminPostStatusActions from "./AdminPostStatusActions";
import FactCheckSection from "../fact-check/FactCheckSection";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={closeAdminPostDrawer} />

            <div className="relative flex max-h-[90vh] w-full max-w-[1040px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="flex items-center justify-between border-b border-border p-5">
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
                        className="rounded-full p-2 hover:bg-muted"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto p-5">
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
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">
                                    Thông tin chung
                                </h3>

                                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-4">
                                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                                        <p className="text-foreground-muted">
                                            Trạng thái
                                        </p>
                                        <p className="font-semibold">
                                            {getStatusLabel(post.status)}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                                        <p className="text-foreground-muted">
                                            Báo cáo
                                        </p>
                                        <p className="font-semibold">
                                            {post.reportCount}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                                        <p className="text-foreground-muted">
                                            Bình luận
                                        </p>
                                        <p className="font-semibold">
                                            {post.commentCount}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                                        <p className="text-foreground-muted">
                                            Tương tác
                                        </p>
                                        <p className="font-semibold">
                                            {post.reactionCount}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
                                    <p className="text-foreground-muted">
                                        Tác giả
                                    </p>
                                    <p className="font-semibold">
                                        {post.authorName}
                                    </p>
                                    <p className="break-all font-mono text-xs text-foreground-muted">
                                        {post.authorId}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
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
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">
                                    Nội dung bài viết
                                </h3>

                                <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4">
                                    <h4 className=" text-lg font-bold">
                                        {post.title}
                                    </h4>

                                    <p className="whitespace-pre-wrap  text-sm">
                                        {post.content}
                                    </p>
                                </div>
                            </section>

                            <FactCheckSection
                                summary={post.factCheckSummary}
                                claims={post.factCheckClaims}
                                showEvidence
                                title="Đối chiếu nguồn lịch sử"
                                description="Kết quả kiểm chứng được tạo từ hệ thống hỗ trợ đối chiếu tài liệu lịch sử."
                            />
                        </>
                    )}
                </div>

                {post && (
                    <div className="border-t border-border bg-card p-5">
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
