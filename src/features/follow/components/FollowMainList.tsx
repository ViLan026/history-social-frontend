"use client";

import { useState } from "react";
import { useFollowStore } from "../follow.store";
import { useFollowSuggestions, useFollowers, useFollowingList } from "../useFollow";
import { useUserStore } from "@/features/user/user.store";
import FollowItem from "./FollowItem";
import Button from "@/components/ui/Button";
import LoadingCard from "@/components/shared/LoadingCard";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FollowMainList() {
  const { activeTab, suggestionLimit } = useFollowStore();
  const { currentUser } = useUserStore();
  const [page, setPage] = useState(0);

  const currentUserId = currentUser?.id || "";

  const suggestionsQuery = useFollowSuggestions(suggestionLimit);
  const followersQuery = useFollowers(currentUserId, { page, size: 8 });
  const followingQuery = useFollowingList(currentUserId, { page, size: 8 });

  const isLoading = suggestionsQuery.isLoading || followersQuery.isLoading || followingQuery.isLoading;
  const isError = suggestionsQuery.isError || followersQuery.isError || followingQuery.isError;

  if (isLoading) return <LoadingCard />;
  if (isError) return <ErrorMessage message="Không thể đồng bộ dữ liệu mạng lưới bạn bè." />;

  return (
    <div className="bg-card rounded-xl mt-4 overflow-hidden animate-slide-up">
      {activeTab === 'suggestions' && (
        <div className=" divide-border-muted">
          {suggestionsQuery.data && suggestionsQuery.data.length > 0 ? (
            suggestionsQuery.data.map((user) => (
              <FollowItem key={user.userId} user={user} isFollowingByDefault={false} />
            ))
          ) : (
            <div className="p-8 text-center font-body text-foreground-faint text-sm">
              Hệ thống hết gợi ý mới cho bạn.
            </div>
          )}
        </div>
      )}

      {activeTab === 'followers' && (
        <div className=" divide-border-muted">
          {followersQuery.data?.content && followersQuery.data.content.length > 0 ? (
            followersQuery.data.content.map((user) => (
              <FollowItem key={user.userId} user={user} isFollowingByDefault={user.isFollowing ?? false} />
            ))
          ) : (
            <div className="p-8 text-center font-body text-foreground-faint text-sm">
              Chưa có ai theo dõi tài khoản của bạn.
            </div>
          )}
          {renderPagination(followersQuery.data?.totalPages || 0, page, setPage)}
        </div>
      )}

      {activeTab === 'following' && (
        <div className="divide-border-muted">
          {followingQuery.data?.content && followingQuery.data.content.length > 0 ? (
            followingQuery.data.content.map((user) => (
              <FollowItem key={user.userId} user={user} isFollowingByDefault={true} />
            ))
          ) : (
            <div className="p-8 text-center font-body text-foreground-faint text-sm">
              Bạn chưa nhấn theo dõi bất cứ ai.
            </div>
          )}
          {renderPagination(followingQuery.data?.totalPages || 0, page, setPage)}
        </div>
      )}
    </div>
  );
}

function renderPagination(totalPages: number, currentPage: number, setPage: (p: number) => void) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between p-3 bg-surface">
      <span className="text-xs font-body text-foreground-muted">Trang {currentPage + 1} / {totalPages}</span>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>
        <Button variant="secondary" disabled={currentPage >= totalPages - 1} onClick={() => setPage(currentPage + 1)}>
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
