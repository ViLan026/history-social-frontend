"use client";

import { useEffect } from "react";

import { useUsers } from "@/features/user/useUser";
import { useUserStore } from "@/features/user/user.store";
import { useUIStore } from "@/features/ui/ui.store";

import UserRow from "@/features/user/components/UserRow";

function UserSkeleton() {
    return (
        <div className="flex animate-pulse items-center gap-3">
            {/* Avatar */}
            <div className="h-9 w-9 shrink-0 rounded-full bg-surface" />

            {/* User Info */}
            <div className="flex-1 space-y-2">
                <div className="h-3.5 w-2/3 rounded bg-surface" />

                <div className="h-3 w-1/2 rounded bg-surface" />
            </div>

            {/* Follow Button */}
            <div className="h-7 w-16 shrink-0 rounded-lg bg-surface" />
        </div>
    );
}

export const FollowListModal = () => {
    const { followListModal, closeFollowList } = useUIStore();

    const isOpen = followListModal.isOpen;

    const modalData = followListModal.data;

    const { currentUser } = useUserStore();

    const { data, isLoading } = useUsers({
        page: 0,
        size: 5,
        keyword: ""
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                closeFollowList();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, closeFollowList]);

    if (!isOpen || !modalData) {
        return null;
    }

    const { type } = modalData;

    const title = type === "followers" ? "Followers" : "Following";

    // Remove current user
    const suggestedUsers =
        data?.content?.filter((user) => user.id !== currentUser?.id) || [];

    const handleFollow = (userId: string) => {
        console.log("Follow:", userId);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            {/* Overlay */}
            <button
                type="button"
                aria-label="Close modal"
                onClick={closeFollowList}
                className="absolute inset-0 cursor-default"
            />

            {/* Modal */}
            <div className="relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <h2 className="text-xl font-bold text-foreground">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={closeFollowList}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    <div className="space-y-4">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <UserSkeleton key={index} />
                            ))
                        ) : suggestedUsers.length > 0 ? (
                            suggestedUsers.map((user) => (
                                <UserRow
                                    key={user.id}
                                    id={user.id}
                                    displayName={
                                        user.displayName || "anonymous"
                                    }
                                    email={user.email}
                                    avatarUrl={user.avatarUrl}
                                    onFollow={handleFollow}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center py-10">
                                <p className="text-sm text-foreground-faint">
                                    Chưa có dữ liệu
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
