"use client";

import React, { memo, useState, useCallback, useMemo, useEffect } from "react";
import {
    useCommentsByPost,
    useCreateComment,
} from "@/features/comment/useComment";
import { CommentResponse } from "@/features/comment/comment.types";
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import { cn } from "@/lib/utils";

interface CommentSectionProps {
    postId: string;
    currentUserId?: string;
    mobileHeader?: React.ReactNode;
}

const CommentSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse" aria-label="Đang tải bình luận" role="status">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-card p-4">
                <div className="flex items-start gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-surface" />
                    <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-24 rounded-full bg-surface" />
                        <div className="h-3 w-4/5 rounded-full bg-surface" />
                        <div className="h-3 w-3/5 rounded-full bg-surface opacity-70" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-2xl">
            💬
        </div>
        <h3 className="mt-4 text-sm font-medium text-foreground">Chưa có bình luận</h3>
        <p className="mt-1 max-w-xs text-sm text-foreground-muted">
            Hãy bắt đầu cuộc thảo luận đầu tiên cho bài viết này.
        </p>
    </div>
);

export const CommentSection = memo<CommentSectionProps>(
    ({ postId, currentUserId, mobileHeader }) => {
        const [pageSize, setPageSize] = useState(10);
        
        const params = useMemo(() => ({ page: 0, size: pageSize, sort: "createdAt,desc" }), [pageSize]);
        const { data, isLoading, isFetching } = useCommentsByPost(postId, params);
        const createMutation = useCreateComment();

        const [cachedComments, setCachedComments] = useState<CommentResponse[]>([]);
        const [cachedTotal, setCachedTotal] = useState<number>(0);

        useEffect(() => {
            if (data?.content) {
                setCachedComments(data.content);
                setCachedTotal(data.totalElements ?? 0);
            }
        }, [data?.content, data?.totalElements]);

        const optimisticComment = useMemo<CommentResponse | null>(() => {
            if (!createMutation.isPending || !createMutation.variables) return null;
            return {
                id: `optimistic-${Date.now()}`,
                postId,
                authorId: createMutation.variables.authorId ?? currentUserId ?? "",
                content: createMutation.variables.content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }, [createMutation.isPending, createMutation.variables, postId, currentUserId]);

        const serverComments = data?.content ?? cachedComments;
        const totalElements = data?.totalElements ?? cachedTotal;
        
        const isInitialLoading = isLoading && serverComments.length === 0;
        
        const hasMore = totalElements > serverComments.length && !isInitialLoading;

        const displayComments = useMemo<CommentResponse[]>(() => {
            if (!optimisticComment) return serverComments;
            const filtered = serverComments.filter((c) => c.id !== optimisticComment.id);
            return [optimisticComment, ...filtered];
        }, [optimisticComment, serverComments]);

        const handleSubmit = useCallback((content: string) => {
            createMutation.mutate({ postId, content, authorId: currentUserId });
        }, [postId, currentUserId, createMutation]);

        const handleLoadMore = useCallback(() => setPageSize((prev) => prev + 5), []);

        return (
            <div className="relative flex h-full w-full min-h-0 flex-col">
                <div className="flex-1 overflow-y-auto px-4 lg:p-6 lg:pt-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    
                    {/* --- HIỂN THỊ BÀI VIẾT TRÊN MOBILE NGAY TRONG KHUNG CUỘN NÀY --- */}
                    {mobileHeader && (
                        <div className="block lg:hidden mt-4 mb-4 pb-4 border-b border-border">
                            {mobileHeader}
                        </div>
                    )}

                    <div className="space-y-2 pt-4 lg:pt-0">
                        {isInitialLoading ? (
                            <CommentSkeleton />
                        ) : displayComments.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                {displayComments.map((comment) => (
                                    <div key={comment.id} className="rounded-2xl bg-card px-4 py-2 transition-colors hover:bg-surface/40">
                                        <CommentItem
                                            comment={comment}
                                            currentUserId={currentUserId}
                                            postId={postId}
                                            isOptimistic={comment.id.startsWith("optimistic-")}
                                        />
                                    </div>
                                ))}
                            </>
                        )}

                        {!isInitialLoading && hasMore && (
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                disabled={isFetching}
                                className={cn(
                                    "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground-muted transition-all duration-200 hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                )}
                            >
                                {isFetching ? (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                                        Đang tải...
                                    </span>
                                ) : (
                                    <span>Xem thêm ({totalElements - serverComments.length})</span>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="z-10 shrink-0 border-t border-slate-200 bg-background px-4 pt-4 pb-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:p-4 lg:pt-4 lg:pb-0">
                    <CommentInput
                        onSubmit={handleSubmit}
                        isSubmitting={createMutation.isPending}
                        autoFocus={window.innerWidth > 1024}
                    />
                </div>
            </div>
        );
    }
);

CommentSection.displayName = "CommentSection";