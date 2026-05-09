// components/post/PostHeader.tsx
import { FeedPostResponse } from "@/features/post/post.types";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";

interface PostHeaderProps {
    post: FeedPostResponse;
}

export default function PostHeader({ post }: PostHeaderProps) {
    const formattedTime = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
        locale: vi
    });

    const authorName = post.author?.displayName || "Người dùng";
    const avatarUrl = post.author?.avatarUrl;

    return (
        <div>
            {/* Author Info */}
            <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface flex-shrink-0 ring-1 ring-border">
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={authorName}
                            fill
                            sizes="36px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-active text-primary-fg font-bold text-base">
                            {authorName.charAt(0).toUpperCase() || "N"}
                        </div>
                    )}
                </div>

                <div>
                    <span className="font-semibold leading-none pr-2">
                        {authorName}
                    </span> 
                    <span className="opacity-80 blur-[0.3px] text-xs text-foreground-faint text-blur-sm">
                        {formattedTime}
                    </span>
                </div>
            </div> 

            {/* Title */}
            <h2 className="mt-4 text-[22px] leading-tight font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
                {post.title}
            </h2>
        </div>
    );
}
