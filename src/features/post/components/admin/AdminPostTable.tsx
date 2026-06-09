"use client";

import { useState } from "react";
import { PostStatus } from "../../post.types";
import { useAdminPosts } from "../../usePost";
import { usePostStore } from "../../post.store";
import AdminPostDrawer from "./AdminPostDrawer";

const STATUS_TABS: { label: string; value?: PostStatus }[] = [
    { label: "Tất cả", value: undefined },
    { label: "Công khai", value: PostStatus.PUBLISHED },
    { label: "Gắn cờ", value: PostStatus.FLAGGED },
    { label: "Từ chối", value: PostStatus.REJECTED },
    { label: "Đã ẩn", value: PostStatus.HIDDEN }
];

function formatDate(value?: string) {
    if (!value) return "Không rõ";
    return new Date(value).toLocaleDateString("vi-VN");
}

function getStatusLabel(status: PostStatus) {
    switch (status) {
        case PostStatus.PUBLISHED:
            return "Công khai";
        case PostStatus.FLAGGED:
            return "Gắn cờ";
        case PostStatus.REJECTED:
            return "Từ chối";
        case PostStatus.HIDDEN:
            return "Đã ẩn";
        case PostStatus.DRAFT:
            return "Nháp";
        default:
            return status;
    }
}

function getStatusClass(status: PostStatus) {
    switch (status) {
        case PostStatus.PUBLISHED:
            return "border-emerald-500/20 text-emerald-600 bg-emerald-500/10";
        case PostStatus.FLAGGED:
            return "border-amber-500/20 text-amber-600 bg-amber-500/10";
        case PostStatus.REJECTED:
            return "border-destructive/20 text-destructive bg-destructive/10";
        case PostStatus.HIDDEN:
            return "border-border text-foreground-muted bg-muted";
        default:
            return "border-border text-foreground-muted bg-muted";
    }
}

export default function AdminPostTable() {
    const [activeStatus, setActiveStatus] = useState<PostStatus | undefined>();
    const [page, setPage] = useState(0);

    const { data, isLoading } = useAdminPosts({
        page,
        size: 20,
        sort: "createdAt,desc",
        status: activeStatus
    });

    const openAdminPostDrawer = usePostStore(
        (state) => state.openAdminPostDrawer
    );

    const posts = data?.content ?? [];

    const handleChangeStatus = (status?: PostStatus) => {
        setActiveStatus(status);
        setPage(0);
    };

    return (
        <div className="space-y-4">
            <div className="sticky top-0 z-20 bg-background pt-2">
                <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background">
                    {STATUS_TABS.map((tab) => (
                        <button
                            key={tab.label}
                            type="button"
                            onClick={() => handleChangeStatus(tab.value)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                activeStatus === tab.value
                                    ? "border-primary text-primary"
                                    : "border-transparent text-foreground-muted hover:text-foreground"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden bg-card">
                <table className="w-full text-left text-sm text-foreground">
                    <thead className="bg-muted text-foreground-muted uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Bài viết</th>
                            {/* <th className="px-6 py-4 font-medium">Tác giả</th> */}
                            <th className="px-6 py-4 font-medium">
                                Trạng thái
                            </th>
                            <th className="px-6 py-4 font-medium">
                                Kiểm chứng
                            </th>
                            <th className="px-6 py-4 font-medium">Báo cáo</th>
                            {/* <th className="px-6 py-4 font-medium">Ngày tạo</th> */}
                            <th className="px-6 py-4 text-right">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border/50">
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-8 text-center animate-pulse"
                                >
                                    Đang tải danh sách bài viết...
                                </td>
                            </tr>
                        ) : posts.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-8 text-center text-foreground-muted"
                                >
                                    Không có bài viết phù hợp.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-6 py-4 max-w-[340px]">
                                        <div className="font-semibold line-clamp-1">
                                            {post.title}
                                        </div>
                                        <div className="text-foreground-muted line-clamp-2">
                                            {post.contentPreview}
                                        </div>
                                    </td>

                                    {/* <td className="px-6 py-4">
                                        <div className="font-medium">
                                            {post.authorName || "Không rõ"}
                                        </div>
                                        <div className="text-xs text-foreground-muted break-all">
                                            {post.authorId}
                                        </div>
                                    </td> */}

                                    <td className="px-6 py-4">
                                        <span
                                            className={`border px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                                post.status
                                            )}`}
                                        >
                                            {getStatusLabel(post.status)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-xs space-y-1">
                                            <p>
                                                Hỗ trợ:{" "}
                                                <b>
                                                    {
                                                        post.factCheckSummary
                                                            .supportedCount
                                                    }
                                                </b>
                                            </p>
                                            <p>
                                                Bác bỏ:{" "}
                                                <b className="text-destructive">
                                                    {
                                                        post.factCheckSummary
                                                            .refutedCount
                                                    }
                                                </b>
                                            </p>
                                            <p>
                                                Chưa đủ:{" "}
                                                <b>
                                                    {
                                                        post.factCheckSummary
                                                            .notEnoughEvidenceCount
                                                    }
                                                </b>
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 font-semibold">
                                        {post.reportCount}
                                    </td>

                                    {/* <td className="px-6 py-4 text-foreground-muted">
                                        {formatDate(post.createdAt)}
                                    </td> */}

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openAdminPostDrawer(post.id)
                                            }
                                            className="text-primary hover:underline font-medium text-sm"
                                        >
                                            Xem & xử lý
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {data && data.totalPages > 1 && (
                <div className="flex gap-2 justify-center pt-4">
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50"
                    >
                        Trước
                    </button>

                    <span className="px-4 py-2 text-sm font-medium">
                        Trang {page + 1} / {data.totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setPage((p) => Math.min(data.totalPages - 1, p + 1))
                        }
                        disabled={page >= data.totalPages - 1}
                        className="px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            )}

            <AdminPostDrawer />
        </div>
    );
}
