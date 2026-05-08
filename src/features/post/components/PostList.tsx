// features/post/components/PostList.tsx
"use client";

import { useEffect, useRef } from "react";
import { useInfiniteFeed } from "@/features/post/usePost";
import PostCard from "./post-card/PostCard";
import PostListSkeleton from "./PostListSkeleton";

export default function PostList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useInfiniteFeed();

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) {
        return <PostListSkeleton />;
    }

    if (isError) {
        return (
            <div className="rounded-lg md:rounded-xl bg-card p-6 md:p-8 text-center transition-all hover:bg-muted/50 cursor-pointer border-none">
                <p className="text-sm md:text-base text-foreground-muted">
                    Không thể tải bài viết. Vui lòng thử lại sau.
                </p>
            </div>
        );
    }

    const posts = data?.pages.flatMap((page) => page.content) ?? [];
    console.log("Hiển thị dữ liệu của posts", posts);

    return (
        <div className="space-y-4 md:space-y-5 bg-background">
            {posts.map((post) => (
                <PostCard post={post} key={post.postId} />
            ))}

            <div
                ref={observerTarget}
                className="flex h-14 items-center justify-center"
            >
                {isFetchingNextPage && (
                    <div className="flex items-center gap-3 rounded-lg md:rounded-xl bg-surface border border-border px-4 md:px-5 py-2.5 md:py-3">
                        <div className="h-4 w-4 md:h-5 md:w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <span className="text-xs md:text-sm font-medium text-foreground-muted">
                            Đang tải thêm...
                        </span>
                    </div>
                )}
            </div>

            {!hasNextPage && posts.length > 0 && (
                <div className="rounded-lg md:rounded-xl bg-surface border border-border py-3 md:py-4 text-center text-xs md:text-sm text-foreground-muted">
                    Bạn đã xem hết bài viết
                </div>
            )}
        </div>
    );
}
