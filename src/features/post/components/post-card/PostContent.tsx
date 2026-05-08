// components/post/PostContent.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/features/ui/ui.store";

interface PostContentProps {
    post: {
        content: string;
    };
}

export default function PostContent({ post }: PostContentProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
      const { isPostDetailOpen } = useUIStore();

    useEffect(() => {
        // Nếu đang ở giao diện chi tiết (Modal), không cần tính toán việc cắt chữ
        if (isPostDetailOpen) return;

        const el = contentRef.current;
        if (el) {
            setIsTruncated(el.scrollHeight > el.clientHeight);
        }
    }, [post.content, isPostDetailOpen]);

    return (
        <div className="relative">
            <p
                ref={contentRef}
                className={cn(
                    "text-sm md:text-base leading-relaxed text-foreground-muted",
                    "max-w-prose",
                    // Chỉ giới hạn 3 dòng nếu KHÔNG ở trong Modal VÀ chưa bấm Xem thêm
                    !isExpanded && !isPostDetailOpen && "line-clamp-3"
                )}
                style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                }}
            >
                {post.content}
            </p>

            {/* Chỉ hiển thị nút Xem thêm/Thu gọn ở giao diện List */}
            {!isPostDetailOpen && (isTruncated || isExpanded) && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsExpanded((v) => !v);
                    }}
                    className="relative z-20 mt-2 text-xs md:text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                    {isExpanded ? "Thu gọn ↑" : "Xem thêm ↓"}
                </button>
            )}
        </div>
    );
}