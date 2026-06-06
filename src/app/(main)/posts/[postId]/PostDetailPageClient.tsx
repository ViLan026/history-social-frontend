// src/app/(main)/posts/[postId]/PostDetailPageClient.tsx

"use client";

import MainLayout from "@/components/layout/MainLayout";
import Navigation from "@/components/layout/Navigation";
import SuggestedUsers from "@/features/follow/components/SuggestedUsers";
import PostCard from "@/features/post/components/post-card/PostCard";
import PostListSkeleton from "@/features/post/components/PostListSkeleton";
import {CommentSection} from "@/features/comment/components/CommentSection";
import { usePost } from "@/features/post/usePost";
import ScrollToComment from "@/features/comment/components/ScrollToComment";

interface PostDetailPageClientProps {
    postId: string;
    commentId?: string;
}

export default function PostDetailPageClient({
    postId,
    commentId,
}: PostDetailPageClientProps) {
    const { data: post, isLoading, isError } = usePost(postId);

    return (
        <MainLayout
            leftSidebar={<Navigation />}
            rightSidebar={
                <div className="h-full relative space-y-6">
                    <SuggestedUsers />

                    <div className="sticky top-20 pb-8" />
                </div>
            }
        >
            <div className="max-w-feed mx-auto px-4 py-2 space-y-4">
                {isLoading && <PostListSkeleton />}

                {isError && (
                    <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-foreground-muted">
                        Không thể tải bài viết. Vui lòng thử lại sau.
                    </div>
                )}

                {!isLoading && !isError && !post && (
                    <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-foreground-muted">
                        Bài viết không tồn tại hoặc đã bị ẩn.
                    </div>
                )}

                {post && (
                    <>
                        <PostCard post={post} />

                        <section className="rounded-2xl border border-border bg-card">
                            <CommentSection postId={postId} />
                        </section>

                        {commentId && (
                            <ScrollToComment commentId={commentId} />
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}