// src/features/post/components/post-card/PostContent.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FeedPostResponse, MediaType } from "../../post.types";

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
    const contentRef = useRef<HTMLDivElement>(null);

    const mediaList = useMemo(() => {
        return [...(post.mediaList ?? [])].sort(
            (a, b) => a.displayOrder - b.displayOrder
        );
    }, [post.mediaList]);

    useEffect(() => {
        if (isInModal) return;

        const el = contentRef.current;
        if (el) {
            setIsTruncated(el.scrollHeight > el.clientHeight);
        }
    }, [post.content, isInModal]);

    return (
        <div className="relative space-y-4">
            <div>
                <div
                    ref={contentRef}
                    className={cn(
                        "text-sm md:text-base leading-relaxed text-foreground whitespace-pre-line break-words",
                        !isExpanded && !isInModal && "line-clamp-3"
                    )}
                >
                    {post.content}
                </div>

                {!isInModal && (isTruncated || isExpanded) && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsExpanded((v) => !v);
                        }}
                        className="relative z-20 mt-4 text-xs md:text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                        {isExpanded ? "Thu gọn ↑" : "Xem thêm ↓"}
                    </button>
                )}
            </div>
            {mediaList.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                    {mediaList.map((media) => (
                        <div
                            key={media.id}
                            className="flex justify-center overflow-hidden rounded-xl border border-border bg-muted/30"
                        >
                            {media.mediaType === MediaType.IMAGE && (
                                <Image
                                    src={media.mediaUrl}
                                    alt={post.title || "Hình ảnh bài viết"}
                                    width={1200}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, 720px"
                                    className="h-auto max-h-[720px] w-full object-contain"
                                    priority={false}
                                />
                            )}

                            {media.mediaType === MediaType.VIDEO && (
                                <video
                                    src={media.mediaUrl}
                                    controls={isInModal}
                                    muted={!isInModal}
                                    className="max-h-[720px] w-full bg-black object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {post.sources?.length > 0 && (
                <div className="space-y-1">
                    {post.sources.map((source) => (
                        <div
                            key={source.id}
                            className="group flex items-center gap-1 border-l-2 border-[#7c0c29] px-4 py-1 pl-3.5"
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
                                        onClick={(e) => e.stopPropagation()}
                                        className="ml-2 inline-flex items-center text-[10px] uppercase tracking-widest text-primary hover:underline font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        [Xem nguồn]
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
