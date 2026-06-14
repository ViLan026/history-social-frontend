import { Avatar } from "@/components/ui/Avatar";
import { FeedPostResponse } from "@/features/post/post.types";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import FactCheckBadge from "../fact-check/FactCheckBadge";
import ReportMenuButton from "@/features/report/components/ReportMenuButton";
import PostOwnerStatusActions from "./PostOwnerStatusActions";

interface PostHeaderProps {
    post: FeedPostResponse;
    showOwnerActions?: boolean;
}

export default function PostHeader({
    post,
    showOwnerActions = false
}: PostHeaderProps) {
    const formattedTime = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: false,
        locale: vi
    });

    const authorName = post.author?.displayName || "Người dùng";
    const avatarUrl = post.author?.avatarUrl;
    const authorId = post.author?.userId;

    return (
        <div>
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    {authorId ? (
                        <Link href={`/profile/${authorId}`}>
                            <Avatar
                                avatarUrl={avatarUrl}
                                displayName={authorName}
                            />
                        </Link>
                    ) : (
                        <Avatar
                            avatarUrl={avatarUrl}
                            displayName={authorName}
                        />
                    )}

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="truncate font-semibold leading-none">
                                {authorName}
                            </span>

                            <span className="text-xs text-foreground-faint">
                                {formattedTime} trước
                            </span>

                            {post.hasFactCheck && (
                                <FactCheckBadge postId={post.postId} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    {showOwnerActions && <PostOwnerStatusActions post={post} />}

                    {!showOwnerActions && <ReportMenuButton targetId={post.postId} targetType="POST" showLabel/>}
                </div>
            </div>

            <h3 className="mt-4 pr-4 text-[22px] font-semibold leading-tight text-foreground">
                {post.title}
            </h3>
        </div>
    );
}
