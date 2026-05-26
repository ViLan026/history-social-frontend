// @/features/bookmark/components/BookmarkCard.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookmarkResponse } from "@/features/bookmark/bookmark.types";
import { useToggleBookmark } from "@/features/bookmark/useBookmark";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface BookmarkCardProps {
    bookmark: BookmarkResponse;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
    const { post, bookmarkedAt } = bookmark;
    const { mutate: toggleBookmark, isPending } = useToggleBookmark();

    const [isBookmarked, setIsBookmarked] = useState(true);

    const handleToggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault(); // Ngăn sự kiện click Link bọc ngoài
        if (isPending) return;

        // Đảo ngược trạng thái icon ngay lập tức trên UI
        setIsBookmarked(!isBookmarked);

        // Gọi API lên server
        toggleBookmark(post.postId);
    };

    const formattedDate = new Date(bookmarkedAt).toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return (
        <article className="group relative overflow-hidden bg-card p-4 md:p-5 lg:p-6 transition-all duration-200 hover:border-primary/20 hover:shadow-sm">
            <Link
                href={`/posts/${post.postId}`}
                className="absolute inset-0 z-0"
                aria-label={post.title}
            >
                <span className="sr-only">Xem chi tiết bài viết</span>
            </Link>

            <div className="relative  space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar
                            avatarUrl={post.author.avatarUrl}
                            displayName={post.author.displayName}
                        />
                        <div>
                            <span className="font-semibold leading-none pr-2">
                                {post.author.displayName}
                            </span>
                            <span className="opacity-80 blur-[0.3px] text-xs text-foreground-faint text-blur-sm">
                                Đã lưu vào {formattedDate}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleToggleBookmark}
                        disabled={isPending}
                        className={`p-2 rounded-full transition-colors cursor-pointer z-10 relative 
                            ${isBookmarked ? 'text-primary hover:bg-muted' : 'text-foreground hover:bg-muted'}`}
                        title={isBookmarked ? "Hủy lưu bài viết" : "Lưu lại bài viết"}
                    >
                        {isBookmarked ? (
                            // Icon Solid (Đã lưu)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.235 1.34 1.954 2.362 1.254l5.388-3.692a.75.75 0 0 1 .85 0l5.388 3.692c1.022.7 2.361-.019 2.361-1.254V3.375c0-1.036-.84-1.875-1.875-1.875H5.625Z" />
                            </svg>
                        ) : (
                            // Icon Outline (Đã gỡ lưu - Thay text-black thành text-current để ăn màu chuẩn theo theme)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="w-5 h-5 text-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <h2 className="mt-4 text-[22px] leading-tight font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
                    {post.title}
                </h2>
                <div
                    className={cn(
                        "text-sm md:text-base leading-relaxed text-foreground-muted whitespace-pre-line break-words ",
                        "line-clamp-3"
                    )}
                >
                    {post.content}
                </div>
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground-muted border border-border/30"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
