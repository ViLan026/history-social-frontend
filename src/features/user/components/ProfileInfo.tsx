// src/features/user/components/ProfileInfo.tsx
"use client";

import { Settings } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useCurrentUser } from "@/features/user/useUser";
import { useUIStore } from "@/features/ui/ui.store";
import { UserResponse } from "@/features/user/user.types";

interface ProfileInfoProps {
    user?: UserResponse;
    isOwner?: boolean;
}

interface ProfileStatsProps {
    followerCount?: number;
    followingCount?: number;
    className?: string;
}

export default function ProfileInfo({
    user,
    isOwner = true,
}: ProfileInfoProps) {
    const { data: currentUser, isLoading } = useCurrentUser();
    const openEditProfile = useUIStore((state) => state.openEditProfile);

    if (!user && isLoading) {
        return <ProfileInfoSkeleton />;
    }

    const profileUser = user ?? currentUser;

    if (!profileUser?.profile) {
        return null;
    }

    const { profile } = profileUser;

    const displayName = profile.displayName || profile.username || "Người dùng";
    const avatarUrl = profile.avatarUrl || null;
    const followerCount = profile.followerCount ?? 0;
    const followingCount = profile.followingCount ?? 0;

    return (
        <div className="bg-surface">
            <div className="mx-auto px-4 py-6">
                <div className="flex items-start gap-6 mb-6">
                    <div className="relative w-20 h-20 md:w-[150px] md:h-[150px] rounded-full overflow-hidden bg-surface flex-shrink-0 ring-1 ring-border">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={displayName}
                                fill
                                sizes="(max-width: 768px) 72px, 150px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary text-primary-fg font-bold text-3xl md:text-5xl select-none">
                                {displayName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-3">
                            <div className="min-w-0">
                                <h1 className="text-2xl font-bold text-foreground mb-1 truncate">
                                    {displayName}
                                </h1>

                                {profile.username && (
                                    <p className="text-sm text-foreground-muted">
                                        @{profile.username}
                                    </p>
                                )}
                            </div>

                            {isOwner && (
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
                            )}
                        </div>

                        <ProfileStats
                            followerCount={followerCount}
                            followingCount={followingCount}
                            className="hidden sm:flex"
                        />
                    </div>
                </div>

                <ProfileStats
                    followerCount={followerCount}
                    followingCount={followingCount}
                    className="sm:hidden mb-4"
                />

                {profile.bio && (
                    <div className="mt-4">
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                            {profile.bio}
                        </p>
                    </div>
                )}

                {isOwner && (
                    <div className="sm:hidden mt-4">
                        <Button
                            variant="secondary"
                            onClick={openEditProfile}
                            className="w-full"
                        >
                            Edit Profile
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProfileStats({
    followerCount = 0,
    followingCount = 0,
    className = "",
}: ProfileStatsProps) {
    const stats = [
        { label: "Followers", value: followerCount },
        { label: "Following", value: followingCount },
    ];

    return (
        <div className={`flex items-center gap-6 ${className}`}>
            {stats.map((stat) => (
                <button
                    key={stat.label}
                    type="button"
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

function ProfileInfoSkeleton() {
    return (
        <div className="bg-surface border-b border-border">
            <div className="max-w-feed mx-auto px-4 py-6">
                <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-surface-muted animate-pulse" />

                    <div className="flex-1 space-y-3">
                        <div className="h-7 w-48 bg-surface-muted rounded animate-pulse" />
                        <div className="h-4 w-32 bg-surface-muted rounded animate-pulse" />
                        <div className="flex gap-6 mt-4">
                            {[1, 2].map((i) => (
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