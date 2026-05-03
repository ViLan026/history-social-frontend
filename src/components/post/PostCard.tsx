// components/post/PostCard.tsx
// ============================================================
// PostCard — hiển thị bài viết trong feed
// Styling: 100% semantic tokens, zero hardcoded colors
// ============================================================

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { PostSummaryResponse, PostStatus } from "@/types/post";
import { CommentSection } from "@/components/comment/CommentSection";
import { cn } from "@/lib/utils";

// ─── Props ────────────────────────────────────────────────────────────────────

interface PostCardProps {
  post: PostSummaryResponse;
  /**
   * ID user hiện tại.
   * Dùng để xác định quyền xóa comment của chính mình.
   */
  currentUserId?: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Badge trạng thái bài viết */
function StatusBadge({ status }: { status: PostStatus }) {
  if (status !== PostStatus.DRAFT) return null;

  return (
    <span
      className="
        shrink-0
        rounded-full px-2.5 py-1
        text-xs font-semibold tracking-wide
        bg-warning-subtle text-warning
        border border-warning/20
      "
    >
      Nháp
    </span>
  );
}

/** Tag pill */
function TagPill({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="
        rounded-full px-3 py-1
        text-xs font-medium
        bg-surface text-foreground-muted
        border border-border-muted
        hover:border-primary/40 hover:text-primary hover:bg-primary-subtle
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        transition-all duration-150
      "
    >
      #{name}
    </Link>
  );
}

function EyeIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function CommentIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

// ─── PostCard ─────────────────────────────────────────────────────────────────

export const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) setIsTruncated(el.scrollHeight > el.clientHeight);
  }, [post.content]);

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: vi,
  });

  const toggleComment = useCallback(() => setIsCommentOpen((v) => !v), []);

  return (
    <article
      className="
        overflow-hidden rounded-xl
        bg-card border border-card-border
        p-5 md:p-6
        hover:-translate-y-px
        transition-transform duration-200
      "
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <Link
          href={`/posts/${post.id}`}
          className="flex-1 min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <h2
            className="
              line-clamp-2 text-lg font-heading font-semibold leading-snug
              text-foreground hover:text-primary
              transition-colors duration-150
            "
          >
            {post.title}
          </h2>
        </Link>

        <StatusBadge status={post.status} />
      </div>

      {/* ── Content preview ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <p
          ref={contentRef}
          className={cn(
            "text-sm leading-7 text-foreground-muted",
            !isExpanded && "line-clamp-3"
          )}
        >
          {post.content}
        </p>

        {(isTruncated || isExpanded) && (
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="
              mt-2 text-xs font-medium
              text-primary hover:text-primary-hover
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              rounded-sm transition-colors duration-150
            "
          >
            {isExpanded ? "Thu gọn ↑" : "Xem thêm ↓"}
          </button>
        )}
      </div>

      {/* ── Tags ────────────────────────────────────────────────────────── */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagPill
              key={tag.id}
              name={tag.name}
              href={`/posts?tag=${encodeURIComponent(tag.name)}`}
            />
          ))}
        </div>
      )}

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div
        className="
          flex items-center justify-between gap-3
          pt-4 mt-4
          border-t border-border-muted
          text-xs text-foreground-faint
        "
      >
        {/* Views */}
        <div className="flex items-center gap-1.5" aria-label={`${post.viewCount} lượt xem`}>
          <EyeIcon />
          <span>{post.viewCount.toLocaleString("vi-VN")} lượt xem</span>
        </div>

        {/* Comment toggle */}
        <button
          onClick={toggleComment}
          aria-expanded={isCommentOpen}
          aria-label={isCommentOpen ? "Đóng bình luận" : "Mở bình luận"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "transition-all duration-150 select-none",
            isCommentOpen
              ? "bg-primary-subtle text-primary border border-primary/30"
              : "bg-surface text-foreground-muted border border-border hover:border-border-focus hover:text-foreground hover:bg-surface-raised"
          )}
        >
          <CommentIcon filled={isCommentOpen} />
          Bình luận
        </button>

        {/* Date */}
        <time
          dateTime={post.createdAt}
          title={new Date(post.createdAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        >
          {formattedDate}
        </time>
      </div>

      {/* ── Comment section (CSS grid collapse) ─────────────────────────── */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isCommentOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
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