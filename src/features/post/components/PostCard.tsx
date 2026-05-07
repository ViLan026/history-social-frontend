// components/post/PostCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { PostSummaryResponse } from "@/features/post/post.types";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostTags from "./PostTags";
import PostFooter from "./PostFooter";

interface PostCardProps {
  post: PostSummaryResponse;
  currentUserId?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  return (
    <article className="group relative overflow-hidden rounded-lg md:rounded-xl bg-card border-none hover:border-border-focus p-4 md:p-5 lg:p-6 transition-all duration-200 hover:shadow-sm">
      <Link
        href={`/posts/${post.id}`}
        className="absolute inset-0 z-0"
        aria-label={`Đọc bài viết: ${post.title}`}
      >
        <span className="sr-only">Xem chi tiết</span>
      </Link>

      <div className="relative z-10 space-y-3 md:space-y-4">
        <PostHeader post={post} />
        <PostContent post={post} />
        <PostTags tags={post.tags} />
        <PostFooter post={post} currentUserId={currentUserId} />
      </div>
    </article>
  );
};

export default PostCard;