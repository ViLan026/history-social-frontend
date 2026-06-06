// src/app/(main)/profile/[userId]/OtherProfileClient.tsx

"use client";

import ProfileLayout from "@/features/user/components/ProfileLayout";
import ProfileInfo from "@/features/user/components/ProfileInfo";
import PostList from "@/features/post/components/PostList";
import { useUser } from "@/features/user/useUser";

interface OtherProfileClientProps {
    userId: string;
}

export default function OtherProfileClient({ userId }: OtherProfileClientProps) {
    const { data: user, isLoading } = useUser(userId);

    return (
        <ProfileLayout>
            <div className="w-full space-y-4">
                {isLoading ? (
                    <ProfileInfo />
                ) : (
                    <ProfileInfo user={user} isOwner={false} />
                )}

                <div className="sticky top-14 z-20 bg-surface-raised border-b border-border px-4 py-3">
                    <h2 className="text-sm font-semibold text-foreground">
                        Bài viết
                    </h2>
                </div>

                <PostList authorId={userId} />
            </div>
        </ProfileLayout>
    );
}