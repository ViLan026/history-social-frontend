"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

interface LikeButtonProps {
  postId: string | number;
  initialLiked?: boolean;
}

export default function LikeButton({ postId, initialLiked = false }: LikeButtonProps) {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(initialLiked);

  const toggleLikeMutation = useMutation({
    mutationFn: () => apiClient.post(`/posts/${postId}/like`),
    onMutate: async () => {
      // 1. Hủy các tác vụ lấy dữ liệu đang chạy để không bị đè state
      await queryClient.cancelQueries({ queryKey: ["posts", "feed"] });
      // 2. Cập nhật giao diện LẠC QUAN (đỏ tim luôn)
      setIsLiked(!isLiked);
    },
    onError: () => {
      // 3. Nếu mạng rớt hoặc lỗi, tự động lùi lại trạng thái cũ
      setIsLiked(isLiked);
    },
    onSettled: () => {
      // 4. Khi API chạy xong (dù lỗi hay thành công), đồng bộ lại data chuẩn từ server
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
    }
  });

  return (
    <button
      onClick={() => toggleLikeMutation.mutate()}
      className={`text-sm font-medium flex items-center gap-1 transition-colors ${
        isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
      }`}
    >
      <span className="text-lg leading-none">{isLiked ? '❤️' : '🤍'}</span>
      {isLiked ? 'Đã thích' : 'Thích'}
    </button>
  );
}