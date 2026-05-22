import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FollowTabType } from './follow.types';

interface FollowStore {
  activeTab: FollowTabType;
  suggestionLimit: number;
  setActiveTab: (tab: FollowTabType) => void;
  setSuggestionLimit: (limit: number) => void;
}

export const useFollowStore = create<FollowStore>()(
  devtools(
    (set) => ({
      activeTab: 'suggestions',
      suggestionLimit: 10,
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSuggestionLimit: (limit) => set({ suggestionLimit: limit }),
    }),
    { name: 'follow-store' }
  )
);