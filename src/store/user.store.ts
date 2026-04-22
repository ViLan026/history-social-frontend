import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserResponse, ProfileResponse, UserSummaryResponse } from '@/types/user';

interface UserStore {
  // Current logged-in user (thường đồng bộ với auth store)
  currentUser: UserResponse | null;
  isLoading: boolean;

  // Danh sách users (dùng cho Admin page)
  users: UserSummaryResponse[];
  totalElements: number;
  totalPages: number;
  currentPage: number;

  // UI States
  selectedUser: UserResponse | null;
  isUserModalOpen: boolean;
  isEditProfileModalOpen: boolean;

  // Actions
  setCurrentUser: (user: UserResponse | null) => void;
  updateCurrentUser: (updatedData: Partial<UserResponse>) => void;

  setUsers: (data: {
    content: UserSummaryResponse[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
  }) => void;

  setSelectedUser: (user: UserResponse | null) => void;
  
  openUserModal: (user?: UserResponse) => void;
  closeUserModal: () => void;

  openEditProfileModal: () => void;
  closeEditProfileModal: () => void;

  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      // Initial State
      currentUser: null,
      isLoading: false,

      users: [],
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,

      selectedUser: null,
      isUserModalOpen: false,
      isEditProfileModalOpen: false,

      // Actions
      setCurrentUser: (user) =>
        set({
          currentUser: user,
          isLoading: false,
        }),

      updateCurrentUser: (updatedData) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updatedData }
            : null,
        })),

      setUsers: ({ content, totalElements, totalPages, currentPage }) =>
        set({
          users: content,
          totalElements,
          totalPages,
          currentPage,
        }),

      setSelectedUser: (user) => set({ selectedUser: user }),

      openUserModal: (user) =>
        set({
          selectedUser: user || null,
          isUserModalOpen: true,
        }),

      closeUserModal: () =>
        set({
          isUserModalOpen: false,
          selectedUser: null,
        }),

      openEditProfileModal: () => set({ isEditProfileModalOpen: true }),
      closeEditProfileModal: () => set({ isEditProfileModalOpen: false }),

      reset: () =>
        set({
          currentUser: null,
          users: [],
          selectedUser: null,
          isUserModalOpen: false,
          isEditProfileModalOpen: false,
          isLoading: false,
        }),
    }),
    {
      name: 'user-store',
    }
  )
);