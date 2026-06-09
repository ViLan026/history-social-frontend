"use client";

import { useUIStore } from "../ui.store";

import PostDetailModal from "../../post/components/PostDetailModal";
import EditProfileModal from "../../user/components/EditProfileModal";
import { FollowListModal } from "../../follow/components/FollowListModal";
import NotificationDropdown from "../../notification/components/NotificationDropdown";
import ReportModal from "@/features/report/components/ReportModal";
import FactCheckPreviewModal from "@/features/post/components/fact-check/FactCheckPreviewModal";

export default function GlobalModals() {
    const {
        postDetailModal,
        editProfileModal,
        followListModal,
        notificationModal,
        reportModal,
        factCheckPreviewModal,
    } = useUIStore();

    return (
        <>
            {postDetailModal.isOpen && <PostDetailModal />}

            {editProfileModal.isOpen && <EditProfileModal />}

            {followListModal.isOpen && <FollowListModal />}

            {notificationModal.isOpen && <NotificationDropdown />}

            {reportModal.isOpen && <ReportModal />}

            {factCheckPreviewModal.isOpen && <FactCheckPreviewModal />}
        </>
    );
}
