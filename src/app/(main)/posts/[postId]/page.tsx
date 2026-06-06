// src/app/(main)/posts/[postId]/page.tsx

import PostDetailPageClient from "./PostDetailPageClient";

interface PostDetailPageProps {
    params: Promise<{
        postId: string;
    }>;
    searchParams: Promise<{
        commentId?: string;
    }>;
}

export default async function PostDetailPage({
    params,
    searchParams,
}: PostDetailPageProps) {
    const { postId } = await params;
    const { commentId } = await searchParams;

    return (
        <PostDetailPageClient
            postId={postId}
            commentId={commentId}
        />
    );
}