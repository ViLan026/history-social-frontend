"use client";

import { useFollowStore } from "../follow.store";
import { FollowTabType } from "../follow.types";


export default function FollowTabs() {
  const { activeTab, setActiveTab } = useFollowStore();

  const tabs: { id: FollowTabType; label: string }[] = [
    { id: 'suggestions', label: 'Gợi ý cho bạn' },
    { id: 'followers', label: 'Người theo dõi' },
    { id: 'following', label: 'Đang theo dõi' },
  ];

  return (
    <div className="flex border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-3 text-sm transition-colors relative  ${
            activeTab === tab.id
              ? " text-primary font-heading font-semibold"
              : "border-transparent text-foreground-faint font-body hover:text-foreground hover:bg-surface-raised"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}