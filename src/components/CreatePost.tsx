"use client";

import { usePostStore } from "@/store/post.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios"; // Lưu ý đường dẫn đúng với file lib/axios.ts của bạn

export default function CreatePost() {
  const { content, tags, setDraft, clearDraft } = usePostStore();
  const queryClient = useQueryClient();

  // Đẩy bài viết lên Server bằng React Query
  const createPostMutation = useMutation({
    mutationFn: (newPost: { content: string; tags: string[] }) => {
      return apiClient.post('/posts', newPost);
    },
    onSuccess: () => {
      // 1. Xóa nội dung trong ô nhập (Zustand)
      clearDraft();
      // 2. Yêu cầu React Query load lại dòng thời gian (News Feed) ngay lập tức
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
    },
    onError: () => {
      alert("Đã xảy ra lỗi khi đăng bài. Vui lòng thử lại!");
    }
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <textarea
        className="w-full border border-gray-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows={3}
        placeholder="Chia sẻ một kiến thức lịch sử thú vị..."
        value={content}
        onChange={(e) => setDraft({ content: e.target.value })}
      />
      
      <div className="flex justify-between items-center mt-4">
        {/* Khu vực gắn thẻ Tag lịch sử */}
        <div className="flex gap-2">
          {tags.length > 0 ? (
            tags.map(tag => (
              <span key={tag} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-medium">
                #{tag}
              </span>
            ))
          ) : (
             // Nút ví dụ thêm Tag nhanh
            <button
              onClick={() => setDraft({ tags: ['Cổ Đại'] })}
              className="text-sm text-gray-500 hover:text-blue-600 bg-gray-100 px-3 py-1 rounded-full transition-colors"
            >
              + Gắn thẻ "Cổ Đại"
            </button>
          )}
        </div>

        {/* Nút Đăng Bài */}
        <button
          onClick={() => createPostMutation.mutate({ content, tags })}
          disabled={createPostMutation.isPending || !content.trim()}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {createPostMutation.isPending ? "Đang đăng..." : "Đăng bài"}
        </button>
      </div>
    </div>
  );
}