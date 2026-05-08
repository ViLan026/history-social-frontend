// components/post/post-card/PostCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FeedPostResponse } from "@/features/post/post.types";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostTags from "./PostTags";
import PostFooter from "./PostFooter";
import { useUIStore } from "@/features/ui/ui.store";

interface PostCardProps {
  post: FeedPostResponse;
  isInModal?: boolean;
}

export default function PostCard({
  post,
}: PostCardProps) {

  const { isPostDetailOpen } = useUIStore();

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl",
        "bg-card border border-transparent",
        "transition-all duration-200",
        !isPostDetailOpen &&
          "hover:border-border hover:bg-surface/40 hover:shadow-sm",
        isPostDetailOpen ? "p-0 shadow-none" : "p-4 md:p-5 lg:p-6",
      ].join(" ")}
    >
      {!isPostDetailOpen && (
        <Link
          href={`/posts/${post.postId}`}
          className="absolute inset-0 z-0"
          aria-label={`Đọc bài viết: ${post.title}`}
        >
          <span className="sr-only">Xem chi tiết</span>
        </Link>
      )}

      <div className="relative z-10 space-y-4">
        <PostHeader post={post} />
        <PostContent post={post} />
        <PostTags tags={post.tags} />

        {<PostFooter post={post} />}
      </div>
    </article>
  );
}