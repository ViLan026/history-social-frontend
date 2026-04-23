// src/components/ui/PostCard.tsx
"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { PostSummaryResponse, PostStatus } from "@/types/post";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { CommentSection } from "@/components/comment/CommentSection";
import { cn } from "@/lib/utils";

// ─── Props ───────────────────────────────────────────────────────────────────

interface PostCardProps {
  post: PostSummaryResponse;
  /**
   * ID user hiện tại.
   * Dùng để xác định quyền xóa comment của chính mình.
   * Truyền từ PostList (hoặc layout) nơi đã có auth context.
   */
  currentUserId?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: vi,
  });

  const toggleComment = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);

  return (
    <article className="neu overflow-hidden rounded-3xl bg-[#4f6f91] p-6 text-white transition-all duration-300 hover:translate-y-[-2px] hover:brightness-105">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <Link href={`/posts/${post.id}`} className="flex-1">
          <h2 className="line-clamp-2 text-xl font-bold hover:text-gray-100">
            {post.title}
          </h2>
        </Link>

        {post.status === PostStatus.DRAFT && (
          <span className="neu rounded-full px-3 py-1 text-xs font-semibold text-yellow-100">
            Nháp
          </span>
        )}
      </div>

      {/* ── Content preview ─────────────────────────────────────────────── */}
      <p className="mb-5 line-clamp-3 text-sm leading-7 text-gray-100">
        {post.content}
      </p>

      {/* ── Tags ────────────────────────────────────────────────────────── */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/posts?tag=${encodeURIComponent(tag.name)}`}
              className="neu rounded-full px-3 py-1 text-xs font-medium text-white hover:brightness-110"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-gray-100">
        {/* Views */}
        <div className="flex items-center gap-1.5">
          <svg
            className="h-4 w-4 flex-shrink-0 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="text-xs">{post.viewCount} lượt xem</span>
        </div>

        {/* Comment toggle button */}
        <button
          onClick={toggleComment}
          aria-expanded={isCommentOpen}
          aria-label={isCommentOpen ? "Đóng bình luận" : "Mở bình luận"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
            "transition-all duration-200 select-none",
            isCommentOpen
              ? "shadow-[inset_3px_3px_7px_#3f5f80,inset_-3px_-3px_7px_#5f89b5] text-white"
              : "shadow-[3px_3px_7px_#3f5f80,-3px_-3px_7px_#5f89b5] text-gray-100 hover:text-white hover:brightness-110"
          )}
        >
          <svg
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              isCommentOpen && "scale-110"
            )}
            fill={isCommentOpen ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Bình luận
        </button>

        {/* Date */}
        <time dateTime={post.createdAt} className="text-xs text-gray-200">
          {formattedDate}
        </time>
      </div>

      {/* ── Comment Section (smooth collapse animation) ──────────────────── */}
      {/*
       * Trick: grid-rows 0fr → 1fr tạo animation mượt mà không cần JS height calculation.
       * Nếu Tailwind chưa generate sẵn class, dùng style fallback bên dưới.
       */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isCommentOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
        // Fallback inline styles nếu Tailwind không generate arbitrary grid-rows
        style={{
          gridTemplateRows: isCommentOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          {/*
           * CommentSection luôn tồn tại trong DOM nhưng chỉ fetch API
           * khi isOpen=true nhờ options.enabled trong useCommentsByPost.
           */}
          <CommentSection
            postId={post.id}
            isOpen={isCommentOpen}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </article>
  );
};

export default PostCard;