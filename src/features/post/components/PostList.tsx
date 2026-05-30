"use client";

import { useEffect, useRef } from "react";
import { useInfiniteFeed, useInfiniteFeedHome,  useInfinitePostsByAuthor} from "@/features/post/usePost";
import PostCard from "./post-card/PostCard";
import PostListSkeleton from "./PostListSkeleton";
import { useAuthStore } from "@/features/auth/auth.store";
// import { useCurrentUser } from "@/features/user/useUser";

interface PostListProps {
    authorId?: string;
}

export default function PostList({ authorId }: PostListProps) {
    const { isAuthenticated } = useAuthStore();
    // const { data: currentUser } = useCurrentUser();
    // if(isAuthenticated)
    //     authorId = currentUser?.id; // Nếu đã login thì lấy authorId từ user info để hiển thị feed cá nhân

    // !! được dịch từ phải sang trái với biến authorId có giá trị thị !authorId sẽ là false, sau đó !false sẽ là true và ngược lại
    const isAuthorMode = !!authorId; // Có authorId => Chế độ xem trang cá nhân
    const isAuthMode = !isAuthorMode && isAuthenticated; // Đã login + Không có authorId => Trang chủ cá nhân hóa
    const isPublicMode = !isAuthorMode && !isAuthenticated; // Chưa login + Không có authorId => Trang chủ công khai

    // Khai báo cả 3 hook với điều kiện enabled tương ứng
    const  authFeed = useInfiniteFeed(isAuthMode);
    const publicFeed = useInfiniteFeedHome(isPublicMode);
    const authorFeed = useInfinitePostsByAuthor(authorId || "", isAuthorMode); // Truyền thêm điều kiện bật/tắt ở tham số thứ 2

    // Lựa chọn feed chính xác dựa trên chế độ hiện tại
    let currentFeed = publicFeed;
    if (isAuthMode) currentFeed = authFeed;
    if (isAuthorMode) currentFeed = authorFeed;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = currentFeed;

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

    // Gộp tất cả bài viết từ các trang được tải về
    const rawPosts = data?.pages.flatMap((page) => page.content) ?? [];

    const posts = Array.from(
        new Map(rawPosts.map((post) => [post.postId, post])).values()
    );

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
                    <div className="flex items-center gap-3 rounded-lg md:rounded-xl bg-background border border-border px-4 md:px-5 py-2.5 md:py-3">
                        <div className="h-4 w-4 md:h-5 md:w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <span className="text-xs md:text-sm font-medium text-foreground-muted">
                            Đang tải thêm...
                        </span>
                    </div>
                )}
            </div>

            {!hasNextPage && posts.length > 0 && (
                <div className="rounded-lg md:rounded-xl bg-background border border-border py-3 md:py-4 text-center text-xs md:text-sm text-foreground-muted">
                    Bạn đã xem hết bài viết
                </div>
            )}
        </div>
    );
}
