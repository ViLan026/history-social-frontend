// components/post/PostFooter.tsx
"use client";

import { useState, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface PostFooterProps {
  post: {
    id: string;
    viewCount: number;
    createdAt: string;
  };
  currentUserId?: string;
}

export default function PostFooter({ post, currentUserId }: PostFooterProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: vi,
  });

  const toggleComment = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsCommentOpen((v) => !v);
  }, []);

  return (
    <div className="flex items-center justify-between gap-3 pt-3 md:pt-4 text-xs md:text-sm text-foreground-faint cursor-pointer border-none hover:bg-muted/50">
      {/* Views */}
      <div
        className="flex items-center gap-1.5"
        aria-label={`${post.viewCount} lượt xem`}
      >
        <EyeIcon />
        <span className="whitespace-nowrap">
          {post.viewCount.toLocaleString("vi-VN")}
        </span>
      </div>

      {/* Comment toggle */}
      <button
        onClick={toggleComment}
        aria-expanded={isCommentOpen}
        aria-label={isCommentOpen ? "Đóng bình luận" : "Mở bình luận"}
        className={cn(
          "relative z-20 flex items-center gap-1.5 rounded-full px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-150 select-none whitespace-nowrap",
          isCommentOpen
            ? "bg-primary-subtle text-primary border border-primary/30"
            : "bg-surface text-foreground-muted border border-border hover:border-border-focus hover:text-foreground hover:bg-surface-raised"
        )}
      >
        <CommentIcon filled={isCommentOpen} />
        <span>Bình luận</span>
      </button>

      {/* Date */}
      <time
        dateTime={post.createdAt}
        className="text-right whitespace-nowrap"
        title={new Date(post.createdAt).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      >
        {formattedDate}
      </time>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  );
}

function CommentIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}