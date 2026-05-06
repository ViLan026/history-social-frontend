import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserResponse, UserSummaryResponse } from '@/features/user/user.types';

interface UserStore {
  currentUser: UserResponse | null;
  isLoading: boolean;

  users: UserSummaryResponse[];
  totalElements: number;
  totalPages: number;
  currentPage: number;

  selectedUser: UserResponse | null;
  isUserModalOpen: boolean;
  isEditProfileModalOpen: boolean;

  // actions
  setCurrentUser: (user: UserResponse | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;

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
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      currentUser: null,
      isLoading: false,

      users: [],
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,

      selectedUser: null,
      isUserModalOpen: false,
      isEditProfileModalOpen: false,

      setCurrentUser: (user) =>
        set({
          currentUser: user,
          isLoading: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      clearUser: () =>
        set({
          currentUser: null,
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
    }),
    { name: 'user-store' }
  )
);