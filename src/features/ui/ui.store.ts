// features/ui/ui.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
    // Post Detail Modal
    isPostDetailOpen: boolean;
    selectedPostId: string | null;
    
    // Các modal khác...
    isEditProfileOpen: boolean;
    isChangePasswordOpen: boolean;
    isFollowListOpen: boolean;
    followListUserId: string | null;
    followListType: 'followers' | 'following' | null;

    // Actions
    openPostDetail: (postId: string) => void;
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
            selectedPostId: null,

            // Các modal khác...
            isEditProfileOpen: false,
            isChangePasswordOpen: false,
            isFollowListOpen: false,
            followListUserId: null,
            followListType: null,

            openPostDetail: (postId: string) => 
                set({ isPostDetailOpen: true, selectedPostId: postId }),

            closePostDetail: () => 
                set({ isPostDetailOpen: false, selectedPostId: null }),

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