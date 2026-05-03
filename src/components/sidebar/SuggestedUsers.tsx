// components/sidebar/SuggestedUsers.tsx
// ============================================================
// "Gợi ý theo dõi" widget — tách từ RightSidebar
// Styling: 100% semantic tokens, zero hardcoded colors
// ============================================================

"use client";

import Image from "next/image";
import Link from "next/link";
import { useUsers } from "@/features/user/useUser";
import { useUserStore } from "@/store/user.store";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function UserSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse" aria-hidden="true">
      <div className="w-9 h-9 rounded-full bg-surface-raised shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 rounded bg-surface-raised w-3/4" />
        <div className="h-2.5 rounded bg-surface-raised w-1/2" />
      </div>
      <div className="h-7 w-16 rounded-lg bg-surface-raised shrink-0" />
    </div>
  );
}

// ─── User Row ─────────────────────────────────────────────────────────────────

interface UserRowProps {
  id: string;
  displayName?: string;
  email: string;
  avatarUrl?: string;
  onFollow: (id: string) => void;
}

function UserRow({ id, displayName, email, avatarUrl, onFollow }: UserRowProps) {
  const name = displayName || email.split("@")[0];
  const initial = name[0].toUpperCase();

  return (
    <div className="flex items-center gap-3 group">
      {/* Avatar + name */}
      <Link
        href={`/profile/${id}`}
        className="
          flex items-center gap-3 flex-1 min-w-0
          rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        "
      >
        {/* Avatar */}
        <div
          className="
            relative w-9 h-9 rounded-full shrink-0 overflow-hidden
            ring-1 ring-border
            group-hover:ring-primary/40
            transition-all duration-150
          "
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : (
            <span
              className="
                w-full h-full flex items-center justify-center
                bg-primary-subtle text-primary
                text-sm font-heading font-semibold
                select-none
              "
            >
              {initial}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="
            text-sm font-medium leading-tight text-foreground
            group-hover:text-primary
            truncate transition-colors duration-150
          ">
            {name}
          </p>
          <p className="text-xs text-foreground-faint truncate mt-0.5">
            {email}
          </p>
        </div>
      </Link>

      {/* Follow button */}
      <button
        onClick={() => onFollow(id)}
        aria-label={`Theo dõi ${name}`}
        className="
          shrink-0 px-3 py-1.5 rounded-lg
          text-xs font-medium
          text-primary border border-primary/40
          hover:bg-primary-subtle hover:border-primary/70
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          transition-all duration-150
        "
      >
        Theo dõi
      </button>
    </div>
  );
}

// ─── SuggestedUsers ───────────────────────────────────────────────────────────

export default function SuggestedUsers() {
  const { data, isLoading } = useUsers({ page: 0, size: 6, keyword: "" });
  const { currentUser } = useUserStore();

  const suggestedUsers =
    data?.content?.filter((u) => u.id !== currentUser?.id).slice(0, 5) ?? [];

  // TODO: implement follow mutation
  const handleFollow = (userId: string) => {
    console.log("Follow:", userId);
  };

  return (
    <section
      className="rounded-xl bg-card border border-card-border p-4"
      aria-labelledby="suggested-users-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id="suggested-users-heading"
          className="text-sm font-heading font-semibold tracking-wide text-foreground"
        >
          Gợi ý theo dõi
        </h2>

        {isLoading && (
          <span className="text-xs text-foreground-faint animate-pulse">
            Đang tải...
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <UserSkeleton key={i} />)
        ) : suggestedUsers.length > 0 ? (
          suggestedUsers.map((user) => (
            <UserRow
              key={user.id}
              id={user.id}
              displayName={user.displayName}
              email={user.email}
              avatarUrl={user.avatarUrl}
              onFollow={handleFollow}
            />
          ))
        ) : (
          <p className="text-sm text-foreground-faint text-center py-4">
            Chưa có gợi ý nào
          </p>
        )}
      </div>

      {/* CTA */}
      {!isLoading && suggestedUsers.length > 0 && (
        <Link
          href="/explore"
          className="
            block text-center text-xs font-medium mt-4
            text-primary hover:text-primary-hover
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            rounded-sm transition-colors duration-150
          "
        >
          Xem thêm gợi ý →
        </Link>
      )}
    </section>
  );
}