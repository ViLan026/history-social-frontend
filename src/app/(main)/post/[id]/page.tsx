"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { postService } from "@/features/post/post.service";
import { PostResponse, MediaType } from "@/types/post";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPostById(postId);
        setPost(res.data);
      } catch (err: any) {
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Đang tải...</div>;
  }

  if (error || !post) {
    return <div className="text-center text-red-400 mt-10">{error || "Bài viết không tồn tại."}</div>;
  }

  // Render lưới Media dựa trên số lượng
  const renderMedia = () => {
    if (!post.mediaList || post.mediaList.length === 0) return null;

    // Sắp xếp media theo displayOrder
    const sortedMedia = [...post.mediaList].sort((a, b) => a.displayOrder - b.displayOrder);

    return (
      <div className={`grid gap-2 mb-4 ${sortedMedia.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {sortedMedia.map((media, index) => {
          // Nếu có 3 media, cho cái đầu tiên full width
          const isFirstOfThree = sortedMedia.length >= 3 && index === 0;
          
          return (
            <div key={media.id} className={`relative w-full overflow-hidden rounded-xl bg-slate-800/50 ${isFirstOfThree ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
              {media.mediaType === MediaType.VIDEO ? (
                <video 
                  src={media.mediaUrl} 
                  controls 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={media.mediaUrl}
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#527493] flex justify-center p-4 md:p-8">
      {/* Container của bài viết - Mô phỏng UI Glassmorphism như trong ảnh */}
      <div className="bg-[#486b8b] border border-white/10 shadow-2xl rounded-2xl p-5 md:p-6 max-w-2xl w-full h-fit text-slate-100">
        
        {/* 1. Header: Avatar & Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-300 shrink-0">
            {/* Tạm dùng ảnh placeholder vì PostResponse chưa có avatar URL */}
            <img 
              src={`https://ui-avatars.com/api/?name=Author&background=random`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-tight">
              {/* Tạm mock tên vì authorId là UUID, cần call API User để lấy tên thật */}
              Lê Minh Anh 
            </h3>
            <div className="text-sm text-slate-300/80">
              {/* Format thời gian thực tế dựa trên post.createdAt ở đây */}
              5 giờ trước • Lưu trữ viên
            </div>
          </div>
        </div>

        {/* 2. Nội dung Text */}
        <div className="mb-4">
          {post.title && <h2 className="text-xl font-bold mb-2">{post.title}</h2>}
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* 3. Media (Ảnh / Video) */}
        {renderMedia()}

        {/* 4. Nguồn trích dẫn (Sources) */}
        {post.sources && post.sources.length > 0 && (
          <div className="mb-4 text-sm text-slate-300/90 flex flex-wrap items-center gap-1">
            <span className="font-medium text-slate-400">Nguồn trích dẫn:</span>
            {post.sources.map((source, idx) => (
              <a 
                key={source.id} 
                href={source.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-300 hover:underline"
              >
                {source.url || source.title}{idx < post.sources.length - 1 ? ', ' : ''}
              </a>
            ))}
          </div>
        )}

        {/* 5. Tags (Đặt ngay dưới source, trên Action bar) */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 mt-2">
            {post.tags.map(tag => (
              <span 
                key={tag.id} 
                className="px-3 py-1 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-medium cursor-pointer"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <hr className="border-white/10 my-4" />

        {/* 6. Action Bar */}
        <div className="flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">3.5k</span>
            </button>
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">210</span>
            </button>
          </div>
          <button className="hover:text-white transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}