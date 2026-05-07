// components/post/PostContent.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PostContentProps {
  post: {
    content: string;
  };
}

export default function PostContent({ post }: PostContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [post.content]);

  return (
    <div className="relative">
      <p
        ref={contentRef}
        className={cn(
          "text-sm md:text-base leading-relaxed text-foreground-muted",
          "max-w-prose",
          !isExpanded && "line-clamp-3"
        )}
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {post.content}
      </p>

      {(isTruncated || isExpanded) && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded((v) => !v);
          }}
          className="relative z-20 mt-2 text-xs md:text-sm font-medium text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm transition-colors duration-150"
        >
          {isExpanded ? "Thu gọn ↑" : "Xem thêm ↓"}
        </button>
      )}
    </div>
  );
}