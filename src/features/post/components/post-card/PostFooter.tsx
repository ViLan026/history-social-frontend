// components/post/post-card/PostFooter.tsx
"use client";

import React, { useState } from "react";
import { FeedPostResponse } from "@/features/post/post.types";
import { useUIStore } from "@/features/ui/ui.store";
import { useToggleBookmark } from "@/features/bookmark/useBookmark";

interface PostFooterProps {
    post: FeedPostResponse;
    isInModal?: boolean;
}

export default function PostFooter({
    post,
    isInModal = false
}: PostFooterProps) {
    const openPostDetail = useUIStore((state) => state.openPostDetail);
    const { mutate: toggleBookmark, isPending } = useToggleBookmark();

    // Mặc định luôn là CHƯA ĐÁNH DẤU (false) khi vừa hiển thị bài viết
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleToggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault(); // Ngăn hành vi trigger Link cha (nếu có)
        if (isPending) return;

        // Optimistic UI: Đổi trạng thái icon lập tức
        setIsBookmarked(!isBookmarked);

        // Kích hoạt API lưu/gỡ ngầm lên server
        toggleBookmark(post.postId);
    };

    return (
        <>
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
                <div className="flex items-center gap-3 md:gap-5 text-foreground-muted">
                    {/* Nút Like */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors hover:bg-surface hover:text-red-500"
                    >
                        <span aria-hidden="true">❤️</span>
                        <span>48</span>
                    </button>

                    {/* Nút Bình luận */}
                    {!isInModal && (
                        <button
                            type="button"
                            onClick={() => openPostDetail(post)}
                            className={[
                                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5",
                                "bg-surface text-foreground",
                                "transition-all duration-200",
                                "hover:bg-primary hover:text-primary-fg"
                            ].join(" ")}
                        >
                            <span aria-hidden="true">💬</span>
                            <span>12</span>
                        </button>
                    )}
                </div>

                {/* Nút Bookmark (Mặc định ban đầu luôn hiển thị nút "Lưu") */}
                <button
                    type="button"
                    onClick={handleToggleBookmark}
                    disabled={isPending}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors cursor-pointer relative z-10 
                        ${isBookmarked 
                            ? "bg-surface text-red-700 font-medium" 
                            : "text-foreground-muted hover:bg-surface hover:text-red-700"
                        }`}
                    title={isBookmarked ? "Hủy lưu bài viết" : "Lưu bài viết"}
                >
                    {isBookmarked ? (
                        // Icon Solid - Đã bấm lưu thành công
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-current animate-in zoom-in-75 duration-100"
                        >
                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.235 1.34 1.954 2.362 1.254l5.388-3.692a.75.75 0 0 1 .85 0l5.388 3.692c1.022.7 2.361-.019 2.361-1.254V3.375c0-1.036-.84-1.875-1.875-1.875H5.625Z" />
                        </svg>
                    ) : (
                        // Icon Outline - Trạng thái gốc lúc vừa tải trang
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-5 h-5 text-current transition-transform active:scale-95"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                        </svg>
                    )}

                    <span>{isBookmarked ? "Đã lưu" : "Lưu"}</span>
                </button>
            </div>
        </>
    );
}