import React from 'react';
import Link from 'next/link';
import { PostSummaryResponse, PostStatus } from '@/types/post';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: PostSummaryResponse;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
}) => {
  const formattedDate = formatDistanceToNow(
    new Date(post.createdAt),
    { addSuffix: true }
  );

  return (
    <article className="neu overflow-hidden rounded-3xl bg-[#4f6f91] p-6 text-white transition-all duration-300 hover:translate-y-[-2px] hover:brightness-105">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <Link
          href={`/posts/${post.id}`}
          className="flex-1"
        >
          <h2 className="line-clamp-2 text-xl font-bold hover:text-gray-100">
            {post.title}
          </h2>
        </Link>

        {post.status === PostStatus.DRAFT && (
          <span className="neu rounded-full px-3 py-1 text-xs font-semibold text-yellow-100">
            Nháp
          </span>
        )}
      </div>

      {/* Preview */}
      <p className="mb-5 line-clamp-3 text-sm leading-7 text-gray-100">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/posts?tag=${encodeURIComponent(
                tag.name
              )}`}
              className="neu rounded-full px-3 py-1 text-xs font-medium text-white hover:brightness-110"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-gray-100">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>

          <span>{post.viewCount} lượt xem</span>
        </div>

        <time
          dateTime={post.createdAt}
          className="text-xs text-gray-200"
        >
          {formattedDate}
        </time>
      </div>
    </article>
  );
};

export default PostCard;