// components/sidebar/SuggestedUsers.tsx
"use client";

import Link from "next/link";
import { useUsers } from "@/features/user/useUser";
import { useUserStore } from "@/features/user/user.store";
import UserRow from "./UserRow";

function UserSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-9 h-9 rounded-full bg-surface shrink-0" />
      {/* Info skeleton */}
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-surface rounded w-2/3" />
        <div className="h-3 bg-surface rounded w-1/2" />
      </div>
      {/* Button skeleton */}
      <div className="w-16 h-7 rounded-lg bg-surface shrink-0" />
    </div>
  );
}


export default function SuggestedUsers() {
  // Lấy gợi ý người dùng (không lấy current user)
  const { data, isLoading } = useUsers({
    page: 0,
    size: 5,
    keyword: "",
  });

  const { currentUser } = useUserStore();

  // Lọc bỏ chính user đang đăng nhập
  const suggestedUsers =
    data?.content?.filter((user) => user.id !== currentUser?.id) || [];

  // TODO: implement follow mutation
  const handleFollow = (userId: string) => {
    console.log("Follow:", userId);
  };

  return (
    <section
      className="rounded-xl  p-4  shadow-sm bg-surface"
      aria-labelledby="suggested-users-heading"
    //   style ={{
    //   backgroundColor: "background"
    // }}
    >

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
          suggestedUsers.slice(0, 5).map((user) => (
            <UserRow
              key={user.id}
              id={user.id}
              displayName={user.displayName || "anonymous"}
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
          href="/follow"
          className="
            block text-center text-xs font-medium mt-4 px-4 py-2 rounded-lg
            text-primary border border-primary/30
          hover:bg-primary-subtle hover:border-primary/60
             hover:text-primary-hover
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
             transition-colors duration-150
          "
        >
          Xem thêm gợi ý →
        </Link>
      )}
    </section>
  );
}