// components/post/PostHeader.tsx
import { PostSummaryResponse } from "@/features/post/post.types";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface PostHeaderProps {
  post: PostSummaryResponse & {
    author?: {
      id: string;
      profile?: {
        displayName?: string;
        avatarUrl?: string;
      };
    };
  };
}

export default function PostHeader({ post }: PostHeaderProps) {
  const formattedTime = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: vi,
  });

  const authorName = post.author?.profile?.displayName || "Người dùng";
  const avatarUrl = post.author?.profile?.avatarUrl;

  return (
    <div>
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-red-900 to-rose-800 flex-shrink-0 ring-1 ring-border">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={authorName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
              {authorName.charAt(0) || "N"}
            </div>
          )}
        </div>

        <div>
          <div className="font-semibold text-foreground">
            {authorName}
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-muted mt-0.5">
            <span>{formattedTime}</span>

            {/* Trung đại - có thể thay bằng field động sau */}
            <span className="inline-flex items-center gap-1">
              <span className="text-amber-600">●</span> Trung đại
            </span>

            {/* Nguồn chính */}
            <span className="px-2.5 py-0.5 text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200/30">
              Nguồn chính
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-[22px] leading-tight font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
        {post.title}
      </h2>
    </div>
  );
}