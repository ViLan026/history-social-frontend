"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { FollowResponse } from "../follow.types";
import { useFollowUserAction, useUnfollowUserAction } from "../useFollow";
import { UserMinus, UserPlus } from "lucide-react";

interface FollowItemProps {
  user: FollowResponse;
  isFollowingByDefault: boolean;
}

export default function FollowItem({ user, isFollowingByDefault }: FollowItemProps) {
  const followMutation = useFollowUserAction();
  const unfollowMutation = useUnfollowUserAction();

  const isPending = followMutation.isPending || unfollowMutation.isPending;

  const handleAction = async () => {
    if (isFollowingByDefault) {
      await unfollowMutation.mutateAsync(user.userId);
    } else {
      await followMutation.mutateAsync(user.userId);
    }
  };

  return (
    <div className="flex items-center justify-between p-3  hover:bg-surface-raised transition-colors animate-fade-in">
      <Link href={`/profile/${user.userId}`} className="flex items-center gap-3 flex-1 min-w-0 group">
        <Avatar avatarUrl={user.avatarUrl} displayName={user.displayName} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {user.displayName || "Thành viên mới"}
          </h4>
          <p className="text-xs font-body text-foreground-faint truncate">@{user.username}</p>
        </div>
      </Link>

      <Button
        variant={isFollowingByDefault ? "secondary" : "primary"}
        onClick={handleAction}
        disabled={isPending}
        className="min-w-[110px]"
      >
        {isFollowingByDefault ? (
          <>
            <UserMinus className="w-3.5 h-3.5 mr-1 inline" /> Hủy theo dõi
          </>
        ) : (
          <>
            <UserPlus className="w-3.5 h-3.5 mr-1 inline" /> Theo dõi
          </>
        )}
      </Button>
    </div>
  );
}