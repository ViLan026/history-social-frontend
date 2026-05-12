"use client";

import { useUIStore } from "../ui.store";

import PostDetailModal from "./PostDetailModal";
import EditProfileModal from "./EditProfileModal";
import { FollowListModal } from "./FollowListModal";

export default function GlobalModals() {
    const {
        postDetailModal,
        editProfileModal,
        followListModal,
    } = useUIStore();

    return (
        <>
            {postDetailModal.isOpen && <PostDetailModal />}

            {editProfileModal.isOpen && <EditProfileModal />}

            {followListModal.isOpen && <FollowListModal />}

        </>
    );
}
