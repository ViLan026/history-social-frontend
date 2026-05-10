// components/post/PostHeader.tsx
import { Avatar } from "@/components/ui/Avatar";
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
                <Avatar avatarUrl={avatarUrl} displayName={authorName} />

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
