"use client";

import React, { memo } from "react";

export const CommentSkeleton = memo(() => (
  <div className="animate-pulse space-y-4" role="status" aria-label="Đang tải bình luận">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-surface" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-24 rounded-full bg-surface" />
            <div className="h-3 w-4/5 rounded-full bg-surface" />
            <div className="h-3 w-3/5 rounded-full bg-surface opacity-70" />
          </div>
        </div>
      </div>
    ))}
  </div>
));
CommentSkeleton.displayName = "CommentSkeleton";

export const EmptyState = memo(() => (
  <div className="flex flex-col items-center justify-center py-14 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-2xl" role="img" aria-label="Chưa có bình luận">
      💬
    </div>
    <h3 className="mt-4 text-sm font-medium text-foreground">
      Chưa có bình luận
    </h3>
    <p className="mt-1 max-w-xs text-sm text-foreground-muted">
      Hãy bắt đầu cuộc thảo luận đầu tiên cho bài viết này.
    </p>
  </div>
));
EmptyState.displayName = "EmptyState";
