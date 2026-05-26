"use client";

import React, { useState } from "react";
import { FeedPostResponse } from "@/features/post/post.types";
import { useUIStore } from "@/features/ui/ui.store";
import { useToggleBookmark } from "@/features/bookmark/useBookmark";
import ReactionButton from "@/features/reaction/components/ReactionButton"; // 1. Import Component vừa làm

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

    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleToggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isPending) return;
        setIsBookmarked(!isBookmarked);
        toggleBookmark(post.postId);
    };

    return (
        <>
            <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                <div className="flex items-center gap-3 md:gap-5 text-foreground-muted">
                    <ReactionButton
                        postId={post.postId}
                        currentUserReaction={
                            (
                                post as FeedPostResponse & {
                                    currentUserReaction?: string | null;
                                }
                            ).currentUserReaction
                        }
                    />

                    {!isInModal && (
                        <button
                            type="button"
                            onClick={() => openPostDetail(post)}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-foreground-muted hover:text-foreground hover:bg-surface transition-colors duration-150"
                        >
                            {/* SVG Biểu tượng bình luận */}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span className="text-xs font-semibold">12</span>
                        </button>
                    )}
                </div>
                {/* Nút Bookmark */}
                <button
                    type="button"
                    onClick={handleToggleBookmark}
                    disabled={isPending}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors cursor-pointer relative z-10 
                        ${
                            isBookmarked
                                ? "bg-surface text-red-700 font-medium"
                                : "text-foreground-muted hover:bg-surface hover:text-red-700"
                        }`}
                    title={isBookmarked ? "Hủy lưu bài viết" : "Lưu bài viết"}
                >
                    {isBookmarked ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-current animate-in zoom-in-75 duration-100"
                        >
                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.235 1.34 1.954 2.362 1.254l5.388-3.692a.75.75 0 0 1 .85 0l5.388 3.692c1.022.7 2.361-.019 2.361-1.254V3.375c0-1.036-.84-1.875-1.875-1.875H5.625Z" />
                        </svg>
                    ) : (
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
