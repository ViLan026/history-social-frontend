// features/ui/ui.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FeedPostResponse } from '@/features/post/post.types';

interface ModalState<T = null> {
    isOpen: boolean;
    data: T | null;
}

interface UIState {

    postDetailModal: ModalState<FeedPostResponse>;

    editProfileModal: ModalState;

    followListModal: ModalState<{
        userId: string;
        type: 'followers' | 'following';
    }>;

    // Post Detail
    openPostDetail: (post: FeedPostResponse) => void;
    closePostDetail: () => void;

    // Edit Profile
    openEditProfile: () => void;
    closeEditProfile: () => void;

    openFollowList: (
        userId: string,
        type: 'followers' | 'following'
    ) => void;

    closeFollowList: () => void;

    // Global
    closeAllModals: () => void;
}

const initialModalState = {
    isOpen: false,
    data: null,
};

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            postDetailModal: initialModalState,

            editProfileModal: initialModalState,

            followListModal: initialModalState,

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

            closeAllModals: () =>
                set({
                    postDetailModal: initialModalState,
                    editProfileModal: initialModalState,
                    followListModal: initialModalState,
                }),
        }),
        {
            name: 'ui-storage',

            /**
             * Không persist modal state
             * vì UI state không nên survive refresh
             */
            partialize: () => ({}),
        }
    )
);