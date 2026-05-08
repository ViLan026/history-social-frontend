// components/post/post-card/PostFooter.tsx
"use client";

import { FeedPostResponse } from "@/features/post/post.types";
import { useUIStore } from "@/features/ui/ui.store";

interface PostFooterProps {
    post: FeedPostResponse;
}
export default function PostFooter({ post}: PostFooterProps) {
    const openPostDetail = useUIStore((state) => state.openPostDetail);

    return (
        <>
            <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
                <div className="flex items-center gap-3 md:gap-5 text-foreground-muted">
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors hover:bg-surface hover:text-red-500"
                    >
                        <span aria-hidden="true">❤️</span>
                        <span>48</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => openPostDetail(post.postId)}
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

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5">
                        <span aria-hidden="true">👁</span>
                        <span>
                            {post.viewCount?.toLocaleString("vi-VN") || 0}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-foreground-muted transition-colors hover:bg-surface hover:text-amber-500"
                >
                    <span aria-hidden="true">📌</span>
                    <span>Lưu</span>
                </button>
            </div>

        </>
    );
}
