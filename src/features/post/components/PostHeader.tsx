// components/post/PostHeader.tsx
import { PostSummaryResponse } from "@/features/post/post.types";
import StatusBadge from "./StatusBadge";

interface PostHeaderProps {
  post: PostSummaryResponse;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <h2 className="flex-1 min-w-0 line-clamp-2 text-lg md:text-xl lg:text-2xl font-heading font-semibold leading-tight md:leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
        {post.title}
      </h2>
      <StatusBadge status={post.status} />
    </div>
  );
}