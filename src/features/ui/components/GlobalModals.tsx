// src/features/ui/components/GlobalModals.tsx
"use client";

import { useUIStore } from "../ui.store";
import PostDetailModal from "./PostDetailModal";
import { EditProfileModal } from "./EditProfileModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { FollowListModal } from "./FollowListModal";

export default function GlobalModals() {
    const {
        isPostDetailOpen,
        selectedPost,
        isEditProfileOpen,
        isChangePasswordOpen,
        isFollowListOpen,
        followListUserId,
        followListType,
    } = useUIStore();

    return (
        <>
            {/* Post Detail Modal */}
            {isPostDetailOpen && selectedPost && <PostDetailModal />}

            {/* Edit Profile Modal */}
            {isEditProfileOpen && <EditProfileModal isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.");
            } } />}

            {/* Change Password Modal */}
            {isChangePasswordOpen && <ChangePasswordModal isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.");
            } } />}

            {/* Follow List Modal */}
            {isFollowListOpen && followListUserId && (
                <FollowListModal
                    userId={followListUserId}
                    type={followListType || "followers"} isOpen={false} onClose={function (): void {
                        throw new Error("Function not implemented.");
                    } }                />
            )}
        </>
    );
}