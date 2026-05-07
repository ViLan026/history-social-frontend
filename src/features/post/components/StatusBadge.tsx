// components/post/StatusBadge.tsx
import { PostStatus } from "@/features/post/post.types";

interface StatusBadgeProps {
  status: PostStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status !== PostStatus.DRAFT) return null;

  return (
    <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide bg-warning-subtle text-warning border border-warning/20 whitespace-nowrap">
      Nháp
    </span>
  );
}