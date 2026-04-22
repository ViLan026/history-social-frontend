'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteFeed } from '@/features/post/usePost';
import PostCard from '@/components/ui/PostCard';

export default function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteFeed();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="neu rounded-3xl p-6 animate-pulse"
          >
            <div className="neu-inset h-5 w-2/3 rounded-xl" />
            <div className="mt-4 space-y-3">
              <div className="neu-inset h-4 rounded-xl" />
              <div className="neu-inset h-4 rounded-xl" />
              <div className="neu-inset h-4 w-5/6 rounded-xl" />
            </div>
            <div className="mt-5 neu-inset h-52 rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="neu rounded-3xl p-8 text-center text-white">
        <p className="text-gray-100">
          Không thể tải bài viết. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  const posts =
    data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Observer target */}
      <div
        ref={observerTarget}
        className="flex h-14 items-center justify-center"
      >
        {isFetchingNextPage && (
          <div className="neu flex items-center gap-3 rounded-2xl px-5 py-3 text-white">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span className="text-sm">
              Đang tải thêm...
            </span>
          </div>
        )}
      </div>

      {!hasNextPage && posts.length > 0 && (
        <div className=" rounded-2xl py-4 text-center text-sm text-gray-100">
          Bạn đã xem hết bài viết
        </div>
      )}
    </div>
  );
}