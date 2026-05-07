// components/post/PostTags.tsx
import Link from "next/link";

interface Tag {
  id: string;
  name: string;
}

interface PostTagsProps {
  tags?: Tag[];
}

export default function PostTags({ tags }: PostTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/posts?tag=${encodeURIComponent(tag.name)}`}
          onClick={(e) => e.stopPropagation()}
          className="relative z-20 rounded-full px-3 py-1 text-xs md:text-sm font-medium bg-surface text-foreground-muted border border-border-muted hover:border-primary/40 hover:text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-150"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}