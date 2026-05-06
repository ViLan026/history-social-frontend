'use client';

interface UserPostTabsProps {
  activeTab: 'published' | 'draft';
  onChange: (tab: 'published' | 'draft') => void;
}

export const UserPostTabs = ({ activeTab, onChange }: UserPostTabsProps) => {
  return (
    <div className="flex gap-0 border-b border-gray-300 mb-6">
      <button
        onClick={() => onChange('published')}
        className="px-6 py-3 font-medium transition-all relative"
        style={{
          color: activeTab === 'published' ? '#7F0716' : '#999',
          borderBottom: activeTab === 'published' ? '3px solid #7F0716' : 'none',
        }}
      >
        Published
      </button>
      <button
        onClick={() => onChange('draft')}
        className="px-6 py-3 font-medium transition-all relative"
        style={{
          color: activeTab === 'draft' ? '#7F0716' : '#999',
          borderBottom: activeTab === 'draft' ? '3px solid #7F0716' : 'none',
        }}
      >
        Drafts
      </button>
    </div>
  );
};