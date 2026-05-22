"use client";

import FollowItem from "@/features/follow/components/FollowItem";
import { useFollowSuggestions } from "../useFollow";

function UserSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 border-b border-border-muted animate-pulse last:border-0">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-9 h-9 rounded-full bg-border-muted shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-border-muted rounded w-2/3" />
          <div className="h-3 bg-border-muted rounded w-1/2" />
        </div>
      </div>
      <div className="w-[110px] h-8 rounded-md bg-border-muted shrink-0" />
    </div>
  );
}

export default function SuggestedUsers() {
  // Thay vì dùng suggestionLimit từ store, bạn truyền thẳng số 5 vào đây
  const { data: suggestions, isLoading, isError } = useFollowSuggestions(5); 

  if (isLoading) {
    return (
      <div className="divide-border-muted">
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center font-body text-destructive text-sm bg-destructive-subtle/20 rounded-md">
        Không thể tải danh sách gợi ý lúc này.
      </div>
    );
  }

  return (
    <div className="">
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((user) => (
          <FollowItem
            key={user.userId}
            user={user}
            isFollowingByDefault={false}
          />
        ))
      ) : (
        <div className="p-8 text-center font-body text-foreground-faint text-sm">
          Hệ thống hết gợi ý mới cho bạn.
        </div>
      )}
    </div>
  );
}