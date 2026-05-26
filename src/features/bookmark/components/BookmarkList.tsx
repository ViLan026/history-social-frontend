// @/features/bookmark/components/BookmarkList.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useBookmarkedPosts } from "@/features/bookmark/useBookmark";
import BookmarkCard from "./BookmarkCard";
import BookmarkListSkeleton from "./BookmarkListSkeleton";
import { useQueryClient } from "@tanstack/react-query";

export default function BookmarkList() {
    const [page, setPage] = useState<number>(1);

    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {

            queryClient.removeQueries({ queryKey: ["bookmarks", "list"] });
        };
    }, [queryClient]);

    // Gọi hook lấy danh sách bài viết đã lưu kèm tham số phân trang
    const { data, isLoading, isError, isFetching } = useBookmarkedPosts();

    if (isLoading) {
        return <BookmarkListSkeleton />;
    }

    if (isError) {
        return (
            <div className="rounded-xl bg-card p-8 text-center border border-border">
                <p className="text-sm text-foreground-muted">
                    Không thể tải danh sách bài viết đã lưu. Vui lòng thử lại
                    sau.
                </p>
            </div>
        );
    }

    const bookmarks = data?.content ?? [];
    const totalPages = data?.totalPages ?? 1;

    // Trường hợp người dùng chưa lưu bài viết nào
    if (bookmarks.length === 0) {
        return (
            <div className="rounded-xl bg-card p-12 text-center border border-dashed border-border space-y-3">
                <div className="flex justify-center text-foreground-muted/60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                        />
                    </svg>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                    Chưa có bài viết đã lưu
                </h3>
                <p className="text-xs md:text-sm text-foreground-muted max-w-sm mx-auto">
                    Các bài viết bạn lưu lại bằng nút bookmark sẽ xuất hiện tại
                    đây để đọc lại khi cần thiết.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Danh sách các thẻ bài viết */}
            <div
                className={`space-y-4 md:space-y-5 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}
            >
                {bookmarks.map((bookmark) => (
                    <BookmarkCard
                        bookmark={bookmark}
                        key={bookmark.bookmarkId}
                    />
                ))}
            </div>

            {/* Thanh điều hướng phân trang (Pagination Bar) */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    {/* Nút lùi trang */}
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1 || isFetching}
                        className="p-2 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:hover:bg-card transition-colors cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    {/* Hiển thị số trang hiện tại */}
                    <span className="text-xs md:text-sm font-medium text-foreground px-4 py-2 bg-muted rounded-lg border border-border/40">
                        Trang {page} / {totalPages}
                    </span>

                    {/* Nút tiến trang */}
                    <button
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={page === totalPages || isFetching}
                        className="p-2 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-50 disabled:hover:bg-card transition-colors cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
