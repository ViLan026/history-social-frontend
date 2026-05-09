// features/ui/ui.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FeedPostResponse } from '../post/post.types';

interface UIState {
    // Post Detail Modal
    isPostDetailOpen: boolean;
    selectedPost: FeedPostResponse | null;
    
    // Các modal khác...
    isEditProfileOpen: boolean;
    isChangePasswordOpen: boolean;
    isFollowListOpen: boolean;
    followListUserId: string | null;
    followListType: 'followers' | 'following' | null;

    // Actions
    openPostDetail: (post: FeedPostResponse) => void;
    closePostDetail: () => void;
    
    openEditProfile: () => void;
    closeEditProfile: () => void;
    // ... các action khác
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            // Post Detail
            isPostDetailOpen: false,
            selectedPost: null,

            // Các modal khác...
            isEditProfileOpen: false,
            isChangePasswordOpen: false,
            isFollowListOpen: false,
            followListUserId: null,
            followListType: null,

            openPostDetail: (post) =>
                set({
                    isPostDetailOpen: true,
                    selectedPost: post
                }),

            closePostDetail: () =>
            set({
                isPostDetailOpen: false,
                selectedPost: null
            }),

            openEditProfile: () => set({ isEditProfileOpen: true }),
            closeEditProfile: () => set({ isEditProfileOpen: false }),
            // ... các action khác
        }),
        {
            name: 'ui-storage',
            partialize: (state) => ({ /* chỉ persist những gì cần */ }),
        }
    )
);