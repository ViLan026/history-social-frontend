import { create } from 'zustand';

interface PostDraftState {
  content: string;
  tags: string[];
  setDraft: (data: Partial<{ content: string; tags: string[] }>) => void;
  clearDraft: () => void;
}

export const usePostStore = create<PostDraftState>((set) => ({
  content: '',
  tags: [],
  setDraft: (data) => set((state) => ({ ...state, ...data })),
  clearDraft: () => set({ content: '', tags: [] }),
}));