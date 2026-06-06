// src/features/comment/components/CommentSection.tsx

"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useCommentsByPost,
  useCreateComment,
} from "@/features/comment/useComment";
import { CommentResponse } from "@/features/comment/comment.types";
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import { CommentSkeleton, EmptyState } from "./CommentSkeleton";
import { cn } from "@/lib/utils";

interface CommentSectionProps {
  postId: string;
  currentUserId?: string;
  mobileHeader?: React.ReactNode;
}

export const CommentSection = memo<CommentSectionProps>(
  ({ postId, currentUserId, mobileHeader }) => {
    const [pageSize, setPageSize] = useState(10);
    const [replyingTo, setReplyingTo] = useState<CommentResponse | null>(null);
    const [scrollTargetId, setScrollTargetId] = useState<string | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const commentRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const params = useMemo(
      () => ({
        page: 0,
        size: pageSize,
        sort: "createdAt,desc",
      }),
      [pageSize]
    );

    const { data, isLoading, isFetching } = useCommentsByPost(postId, params);
    const createMutation = useCreateComment();

    // const serverComments = data?.content ?? [];
    const serverComments = useMemo(() => data?.content ?? [], [data?.content]);
    const totalElements = data?.totalElements ?? 0;

    const isInitialLoading = isLoading && serverComments.length === 0;
    const hasMore =
      totalElements > serverComments.length && !isInitialLoading;

    const { rootComments, repliesMap, replyTargetNameMap } = useMemo(() => {
      const roots: CommentResponse[] = [];
      const childrenMap = new Map<string, CommentResponse[]>();
      const replies = new Map<string, CommentResponse[]>();
      const replyTargetNames = new Map<string, string>();

      serverComments.forEach((comment) => {
        if (!comment.parentId) {
          roots.push(comment);
          return;
        }

        const children = childrenMap.get(comment.parentId) ?? [];
        childrenMap.set(comment.parentId, [...children, comment]);
      });

      roots.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      childrenMap.forEach((children) => {
        children.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      const collectReplies = (parent: CommentResponse): CommentResponse[] => {
        const children = childrenMap.get(parent.id) ?? [];

        return children.flatMap((reply) => {
          replyTargetNames.set(
            reply.id,
            parent.authorName?.trim() || "Người dùng"
          );

          return [reply, ...collectReplies(reply)];
        });
      };

      roots.forEach((root) => {
        replies.set(root.id, collectReplies(root));
      });

      return {
        rootComments: roots,
        repliesMap: replies,
        replyTargetNameMap: replyTargetNames,
      };
    }, [serverComments]);

    useEffect(() => {
      if (!scrollTargetId) return;

      const timer = window.setTimeout(() => {
        const container = scrollContainerRef.current;
        const target = commentRefs.current[scrollTargetId];

        if (!container || !target) return;

        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const top =
          targetRect.top - containerRect.top + container.scrollTop - 80;

        container.scrollTo({
          top: Math.max(top, 0),
          behavior: "smooth",
        });

        setScrollTargetId(null);
      }, 120);

      return () => window.clearTimeout(timer);
    }, [scrollTargetId, rootComments, repliesMap]);

    const handleSubmit = useCallback(
      (content: string) => {
        const optimisticId = `optimistic-${Date.now()}`;

        setScrollTargetId(optimisticId);

        createMutation.mutate(
          {
            id: optimisticId,
            postId,
            content,
            authorId: currentUserId,
            parentId: replyingTo?.id,
          },
          {
            onSuccess: (createdComment) => {
              setReplyingTo(null);
              setScrollTargetId(createdComment.id);
            },
          }
        );
      },
      [createMutation, currentUserId, postId, replyingTo?.id]
    );

    const handleReply = useCallback((comment: CommentResponse) => {
      setReplyingTo(comment);
    }, []);

    const handleCancelReply = useCallback(() => {
      setReplyingTo(null);
    }, []);

    const handleLoadMore = useCallback(() => {
      setPageSize((prev) => prev + 5);
    }, []);

    return (
      <div className="relative flex h-full min-h-0 w-full flex-col">
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto bg-background px-4 lg:p-6 lg:pt-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {mobileHeader && (
            <div className="mb-4 mt-4 border-b border-border pb-4 lg:hidden">
              {mobileHeader}
            </div>
          )}

          <div className="space-y-4 bg-background pt-4 lg:pt-0">
            {isInitialLoading ? (
              <CommentSkeleton />
            ) : rootComments.length === 0 ? (
              <EmptyState />
            ) : (
              rootComments.map((comment) => {
                const replies = repliesMap.get(comment.id) ?? [];

                return (
                  <div
                    key={comment.id}
                    ref={(el) => {
                      commentRefs.current[comment.id] = el;
                    }}
                    className="rounded-2xl bg-background"
                  >
                    <div className="rounded-2xl px-4 py-2 transition-colors hover:bg-surface/40">
                      <CommentItem
                        comment={comment}
                        currentUserId={currentUserId}
                        postId={postId}
                        isOptimistic={comment.id.startsWith("optimistic-")}
                      />

                      <button
                        type="button"
                        onClick={() => handleReply(comment)}
                        disabled={comment.id.startsWith("optimistic-")}
                        className="ml-12 mt-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Trả lời
                      </button>
                    </div>

                    {replies.length > 0 && (
                      <div className="ml-10 mt-1 space-y-1 border-l-2 border-border-muted pl-2 md:ml-12">
                        {replies.map((reply) => {
                          const targetName = replyTargetNameMap.get(reply.id);

                          return (
                            <div
                              key={reply.id}
                              ref={(el) => {
                                commentRefs.current[reply.id] = el;
                              }}
                              className="rounded-2xl px-2 py-2 transition-colors hover:bg-surface/40"
                            >
                              {targetName && (
                                <div className="mb-1 ml-12 text-xs text-foreground-muted">
                                  Trả lời{" "}
                                  <span className="font-medium text-primary">
                                    @{targetName}
                                  </span>
                                </div>
                              )}

                              <CommentItem
                                comment={reply}
                                currentUserId={currentUserId}
                                postId={postId}
                                isOptimistic={reply.id.startsWith(
                                  "optimistic-"
                                )}
                              />

                              <button
                                type="button"
                                onClick={() => handleReply(reply)}
                                disabled={reply.id.startsWith("optimistic-")}
                                className="ml-12 mt-1 text-xs font-medium text-foreground-muted transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Trả lời
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {!isInitialLoading && hasMore && (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isFetching}
                className={cn(
                  "w-full rounded-2xl border border-border bg-card px-4 py-3",
                  "text-sm text-foreground-muted transition-all duration-200",
                  "hover:bg-surface hover:text-foreground",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                {isFetching ? "Đang tải..." : "Xem thêm bình luận cũ hơn"}
              </button>
            )}
          </div>
        </div>

        <div className="z-10 shrink-0 border-t border-border bg-background px-4 pb-2 pt-4 lg:p-4 lg:pb-0">
          {replyingTo && (
            <div className="mb-2 flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-sm">
              <span className="line-clamp-1 text-foreground-muted">
                Đang trả lời:{" "}
                <span className="font-medium text-foreground">
                  {replyingTo.authorName?.trim() || "Người dùng"}
                </span>
              </span>

              <button
                type="button"
                onClick={handleCancelReply}
                className="ml-3 shrink-0 text-sm font-medium text-primary hover:underline"
              >
                Huỷ
              </button>
            </div>
          )}

          <CommentInput
            onSubmit={handleSubmit}
            isSubmitting={createMutation.isPending}
            autoFocus={Boolean(replyingTo)}
          />
        </div>
      </div>
    );
  }
);

CommentSection.displayName = "CommentSection";