"use client";

import { Settings } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useCurrentUser } from "@/features/user/useUser";
import { useUIStore } from "@/features/ui/ui.store";

/**
 * ProfileInfo Component
 * Hiển thị thông tin profile của user bao gồm:
 * - Avatar, username, display name
 * - Stats (Posts, Followers, Following)
 * - Bio
 * - Edit Profile & Settings buttons
 */
export default function ProfileInfo() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const openEditProfile = useUIStore((state) => state.openEditProfile);

  if (isLoading) {
    return <ProfileInfoSkeleton />;
  }

  if (!currentUser) {
    return null;
  }

  const { profile } = currentUser;
  const displayName = profile.displayName || profile.username;

  return (
    <div className="bg-surface">
      <div className=" mx-auto px-4 py-6">
        {/* Avatar & Name Section */}
        <div className="flex items-start gap-6 mb-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar
              avatarUrl={profile.avatarUrl}
              displayName={displayName}
            />
          </div>

          {/* User Info & Actions */}
          <div className="flex-1 min-w-0">
            {/* Name & Actions Row */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-foreground mb-1 truncate">
                  {displayName}
                </h1>
                <p className="text-sm text-foreground-muted">
                  @{profile.username}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="secondary"
                  onClick={openEditProfile}
                  className="hidden sm:flex"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={openEditProfile}
                  className="sm:hidden p-2"
                  aria-label="Edit Profile"
                >
                  <Settings className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="p-2 hidden sm:flex"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stats Section - Desktop */}
            <ProfileStats className="hidden sm:flex" />
          </div>
        </div>

        {/* Stats Section - Mobile */}
        <ProfileStats className="sm:hidden mb-4" />

        {/* Bio Section */}
        {profile.bio && (
          <div className="mt-4">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Edit Profile Button - Mobile Only */}
        <div className="sm:hidden mt-4">
          <Button
            variant="secondary"
            onClick={openEditProfile}
            className="w-full"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * ProfileStats Component
 * Hiển thị thống kê Posts, Followers, Following
 */
function ProfileStats({ className = "" }: { className?: string }) {
  // TODO: Fetch real stats from API
  const stats = [
    { label: "Posts", value: "120" },
    { label: "Followers", value: "1.2k" },
    { label: "Following", value: "850" },
  ];

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <button
          key={stat.label}
          className="group flex items-center gap-1.5 hover:opacity-80 transition-opacity"
        >
          <span className="font-semibold text-foreground">
            {stat.value}
          </span>
          <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
            {stat.label}
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * ProfileInfoSkeleton
 * Loading state cho ProfileInfo
 */
function ProfileInfoSkeleton() {
  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-feed mx-auto px-4 py-6">
        <div className="flex items-start gap-6 mb-6">
          {/* Avatar Skeleton */}
          <div className="w-24 h-24 rounded-full bg-surface-muted animate-pulse" />

          {/* Info Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-7 w-48 bg-surface-muted rounded animate-pulse" />
            <div className="h-4 w-32 bg-surface-muted rounded animate-pulse" />
            <div className="flex gap-6 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-4 w-24 bg-surface-muted rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}