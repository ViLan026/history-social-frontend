import { create } from 'zustand';
// history-social-frontend\src\store\post.store.ts
interface PostStore {
  // Pagination state
  currentPage: number;
  pageSize: number;
  
  // UI state
  isCreatePostModalOpen: boolean;

  // Post đang được chọn (ví dụ: để edit hoặc xem chi tiết UI)
  selectedPostId: string | null;

  // Modal edit bài viết
  isEditPostModalOpen: boolean;
  
    // Search UI
  keyword: string;

  isAdminPostDrawerOpen: boolean;
  selectedAdminPostId: string | null;

  openAdminPostDrawer: (postId: string) => void;
  closeAdminPostDrawer: () => void;
  
  // Actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
  setKeyword: (keyword: string) => void;
  resetFilters: () => void; 

// Modal actions
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;

  openEditPostModal: (postId: string) => void;
  closeEditPostModal: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  
  // Initial state
  currentPage: 0, // Spring Boot Pageable starts at 0
  pageSize: 10,
  isCreatePostModalOpen: false,
    isEditPostModalOpen: false,
  selectedPostId: null,
  keyword: '',
  // Pagination actions
  setPage: (page) => set({ currentPage: page }),
  
  setPageSize: (size) => set({ pageSize: size, currentPage: 0 }), // Reset to first page when changing size
  
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  
  previousPage: () => set((state) => ({ 
    currentPage: Math.max(0, state.currentPage - 1) 
  })),
  
  resetPage: () => set({ currentPage: 0 }),

  setKeyword: (keyword) =>
  set({
    keyword,
    currentPage: 0,
  }),
  
  resetFilters: () =>
    set({
      currentPage: 0,
      keyword: '',
    }),
  
  // Modal actions
  openCreatePostModal: () => set({ isCreatePostModalOpen: true }),
  closeCreatePostModal: () => set({ isCreatePostModalOpen: false }),


  openEditPostModal: (postId) =>
    set({
      isEditPostModalOpen: true,
      selectedPostId: postId,
    }),

    closeEditPostModal: () =>
    set({
      isEditPostModalOpen: false,
      selectedPostId: null,
    }),

    isAdminPostDrawerOpen: false,
    selectedAdminPostId: null,

    openAdminPostDrawer: (postId) =>
  set({
    isAdminPostDrawerOpen: true,
    selectedAdminPostId: postId,
  }),

closeAdminPostDrawer: () =>
  set({
    isAdminPostDrawerOpen: false,
    selectedAdminPostId: null,
  }),
      
}));