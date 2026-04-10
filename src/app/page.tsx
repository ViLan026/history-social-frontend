"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import apiClient from "@/lib/axios";
import LoadingCard from "@/components/shared/LoadingCard";
import LikeButton from "@/components/LikeButton";
import CreatePost from "@/components/CreatePost";

export default function HomePage() {
  const { ref, inView } = useInView();

  // 1. Cấu hình Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", "feed"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await apiClient.get(`/posts?page=${pageParam}&size=10`);
      return res.data; // Giả sử res.data có { content, last, pageNumber }
    },
    initialPageParam: 0,
    // Hàm này quyết định số trang tiếp theo là bao nhiêu
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageNumber + 1;
    },
  });

  // 2. Tự động gọi trang tiếp theo khi cuộn xuống cuối (inView)
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <LoadingCard />;
  if (status === "error") return <p className="text-center py-10">Có lỗi xảy ra khi tải bảng tin.</p>;

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Khu vực đăng bài (Client Component dùng Zustand) */}
      <CreatePost />

      <h1 className="text-xl font-bold border-b pb-2">Dòng thời gian lịch sử</h1>

      <div className="flex flex-col gap-6">
        {/* React Query trả về dữ liệu theo từng "page" 
            nên ta cần lặp qua data.pages sau đó lặp qua page.content */}
        {data?.pages.map((page, i) => (
          <div key={i} className="flex flex-col gap-6">
            {page.content.map((post: any) => (
              <article key={post.id} className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.authorName}</h3>
                    <p className="text-xs text-gray-500">{post.createdAt}</p>
                  </div>
                </div>

                <p className="text-gray-800 leading-relaxed">{post.content}</p>

                {/* Hiển thị các tag lịch sử */}
                <div className="flex gap-2 mt-3">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-200">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex gap-4">
                  <LikeButton postId={post.id} initialLiked={post.isLiked} />
                  <button className="text-sm text-gray-600 hover:text-blue-600">
                    💬 Bình luận ({post.commentCount || 0})
                  </button>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>

      {/* Điểm neo để nhận biết người dùng đã cuộn xuống cuối chưa */}
      <div ref={ref} className="py-10 text-center">
        {isFetchingNextPage ? (
          <p className="text-gray-500 animate-pulse">Đang tải thêm bài viết...</p>
        ) : hasNextPage ? (
          <p className="text-gray-400 text-sm">Cuộn thêm để khám phá lịch sử</p>
        ) : (
          <p className="text-gray-500 font-medium">Bạn đã xem hết các sự kiện rồi! 🎉</p>
        )}
      </div>
    </main>
  );
}