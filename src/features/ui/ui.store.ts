import { create } from "zustand";
import { FeedPostResponse } from "@/features/post/post.types";

interface ModalState<T = null> {
    isOpen: boolean;
    data: T | null;
}

interface UIState {
    postDetailModal: ModalState<FeedPostResponse>;
    editProfileModal: ModalState;
    followListModal: ModalState<{
        userId: string;
        type: "followers" | "following";
    }>;

    notificationModal: ModalState;

    openPostDetail: (post: FeedPostResponse) => void;
    closePostDetail: () => void;

    openEditProfile: () => void;
    closeEditProfile: () => void;

    openFollowList: (
        userId: string,
        type: "followers" | "following"
    ) => void;
    closeFollowList: () => void;

    openNotification: () => void;
    closeNotification: () => void;

    closeAllModals: () => void;
}

const initialModalState = {
    isOpen: false,
    data: null,
};

export const useUIStore = create<UIState>((set) => ({
    postDetailModal: initialModalState,
    editProfileModal: initialModalState,
    followListModal: initialModalState,
    notificationModal: initialModalState,

    openPostDetail: (post) =>
        set({
            postDetailModal: {
                isOpen: true,
                data: post,
            },
        }),

    closePostDetail: () =>
        set({
            postDetailModal: initialModalState,
        }),

    openEditProfile: () =>
        set({
            editProfileModal: {
                isOpen: true,
                data: null,
            },
        }),

    closeEditProfile: () =>
        set({
            editProfileModal: initialModalState,
        }),

    openFollowList: (userId, type) =>
        set({
            followListModal: {
                isOpen: true,
                data: {
                    userId,
                    type,
                },
            },
        }),

    closeFollowList: () =>
        set({
            followListModal: initialModalState,
        }),

    openNotification: () =>
        set({
            notificationModal: {
                isOpen: true,
                data: null,
            },
        }),

    closeNotification: () =>
        set({
            notificationModal: initialModalState,
        }),

    closeAllModals: () =>
        set({
            postDetailModal: initialModalState,
            editProfileModal: initialModalState,
            followListModal: initialModalState,
            notificationModal: initialModalState,
        }),
}));