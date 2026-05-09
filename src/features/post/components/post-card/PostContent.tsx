// components/post/PostContent.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { FeedPostResponse } from "../../post.types";

interface PostContentProps {
    post: FeedPostResponse;
    isInModal?: boolean;
}

export default function PostContent({
    post,
    isInModal = false
}: PostContentProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // Nếu đang ở giao diện chi tiết (Modal), không cần tính toán việc cắt chữ
        if (isInModal) return;

        const el = contentRef.current;
        if (el) {
            setIsTruncated(el.scrollHeight > el.clientHeight);
        }
    }, [post.content, isInModal]);

    return (
        <div className="relative">
            <p
                ref={contentRef}
                className={cn(
                    "text-sm md:text-base leading-relaxed text-foreground-muted",
                    "max-w-prose",
                    // Chỉ giới hạn 3 dòng nếu KHÔNG ở trong Modal VÀ chưa bấm Xem thêm
                    !isExpanded && !isInModal && "line-clamp-3"
                )}
                style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word"
                }}
            >
                {post.content}
            </p>

            <div className="space-y-1 mt-4 ">
                {post.sources.map((source) => (
                    <div
                        key={source.id}
                        className="flex items-center gap-1 px-4 py-1 border-l-2 border-[#7c0c29] pl-3.5 space-y-0.5"
                    >


                        <div className="font-mono text-sm text-foreground/85 leading-snug">
                            <span className="font-semibold text-primary/80">
                                Nguồn:{" "}
                            </span>
                            <span className="text-foreground/80">
                                {source.title}
                            </span>
                            {source.author && (
                                <span className="text-foreground/60">
                                    {" "}
                                    — {source.author}
                                </span>
                            )}
                            {source.publishedYear && (
                                <span className="text-foreground/50">
                                    {" "}
                                    ({source.publishedYear})
                                </span>
                            )}

                            {source.url && (
                                <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 inline-flex items-center text-[10px] uppercase tracking-widest text-primary hover:underline font-bold opacity-0 group-hover:opacity-100 transition-opacity "
                                >
                                    [Xem nguồn]
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chỉ hiển thị nút Xem thêm/Thu gọn ở giao diện List */}
            {!isInModal && (isTruncated || isExpanded) && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsExpanded((v) => !v);
                    }}
                    className="relative  z-20 mt-4 text-xs md:text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                    {isExpanded ? "Thu gọn ↑" : "Xem thêm ↓"}
                </button>
            )}
        </div>
    );
}
