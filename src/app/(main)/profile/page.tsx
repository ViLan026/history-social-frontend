// src/app/(main)/profile/page.tsx

"use client";

import { Suspense, useEffect, useState } from "react";
import ProfileLayout from "@/features/user/components/ProfileLayout";
import ProfileInfo from "@/features/user/components/ProfileInfo";
import ProfileTabs from "@/components/layout/ProfileTabs";
import PostList from "@/features/post/components/PostList";
import BookmarkList from "@/features/bookmark/components/BookmarkList";
import ReportList from "@/features/report/components/RepostList";
import { useCurrentUser } from "@/features/user/useUser";
import { useAuthStore } from "@/features/auth/auth.store";

export type ProfileTab = "posts" | "bookmarks" | "reposts";

interface ProfilePageProps {
    searchParams: Promise<{
        tab?: string;
    }>;
}

export default function ProfilePage({ searchParams }: ProfilePageProps) {
    const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

    const { isAuthenticated } = useAuthStore();
    const { data: currentUser } = useCurrentUser();
    const id = isAuthenticated ? currentUser?.id : undefined;

    useEffect(() => {
        searchParams.then((params) => {
            if (params.tab === "bookmarks" || params.tab === "reposts") {
                setActiveTab(params.tab);
            } else {
                setActiveTab("posts");
            }
        });
    }, [searchParams]);

    return (
        <ProfileLayout>
            <div className="w-full space-y-4">
                <ProfileInfo />

                <div className="sticky top-14 z-20 bg-surface-raised">
                    <ProfileTabs />
                </div>

                <Suspense fallback={<ContentSkeleton />}>
                    <ProfileContent activeTab={activeTab} id={id} />
                </Suspense>
            </div>
        </ProfileLayout>
    );
}

interface ProfileContentProps {
    activeTab: ProfileTab;
    id?: string;
}

function ProfileContent({ activeTab, id }: ProfileContentProps) {
    return (
        <div className="w-full mx-auto">
            {activeTab === "posts" && (
                <div>
                    {id ? <PostList mode="me" showOwnerActions /> : <ContentSkeleton />}
                </div>
            )}

            {activeTab === "bookmarks" && (
                <div className="p-4 text-foreground/70">
                    <BookmarkList />
                </div>
            )}

            {activeTab === "reposts" && (
                <div className="p-4 text-foreground/70">
                    <ReportList />
                </div>
            )}
        </div>
    );
}

function ContentSkeleton() {
    return (
        <div className="w-full space-y-4 pointer-events-none select-none">
            {[1, 2, 3].map((i) => (
                <div
                    key={`skeleton-item-${i}`}
                    className="bg-surface border border-border rounded-2xl p-6 space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}
