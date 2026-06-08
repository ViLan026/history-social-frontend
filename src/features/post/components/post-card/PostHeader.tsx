// components/post/PostHeader.tsx
import { Avatar } from "@/components/ui/Avatar";
import { FeedPostResponse } from "@/features/post/post.types";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/dist/client/link";
import FactCheckBadge from "../fact-check/FactCheckBadge";

interface PostHeaderProps {
    post: FeedPostResponse;
}

export default function PostHeader({ post }: PostHeaderProps) {
    const formattedTime = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: false,
        locale: vi
    });

    const authorName = post.author?.displayName || "Người dùng";
    const avatarUrl = post.author?.avatarUrl;

    return (
        <div>
            {/* Author Info */}
            <div className="flex items-center gap-3">
                <Link href={`/profile/${post.author?.userId}`}>
                    <Avatar avatarUrl={avatarUrl} displayName={authorName} />
                </Link>
                <div>
                    <span className="font-semibold leading-none pr-2">
                        {authorName}
                    </span>
                    <span className="opacity-80 blur-[0.3px] text-xs text-foreground-faint text-blur-sm">
                        {formattedTime} trước
                    </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {post.hasFactCheck && (
                        <FactCheckBadge postId={post.postId} />
                    )}
                </div>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-[22px] leading-tight font-semibold text-foreground pr-4">
                {post.title}
            </h3>
        </div>
    );
}
