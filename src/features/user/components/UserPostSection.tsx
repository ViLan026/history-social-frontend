'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserPostTabs } from './UserPostTabs';
import PostCard from '@/features/post/components/PostCard';
import UserDraftCard from './UserDraftCard';

interface UserPostSectionProps {
  userId: string;
}

export const UserPostSection = ({ userId }: UserPostSectionProps) => {
  const [activeTab, setActiveTab] = useState<'published' | 'draft'>('published');

  // Assuming usePost hook exists or we extend it
  const { data: publishedPosts = [], isLoading: publishedLoading } = useQuery({
    queryKey: ['user-posts', userId, 'published'],
    queryFn: async () => {
      // Call your post service with status filter
      // return postService.getUserPosts({ userId, status: 'published' });
      return [];
    },
  });

  const { data: draftPosts = [], isLoading: draftLoading } = useQuery({
    queryKey: ['user-posts', userId, 'draft'],
    queryFn: async () => {
      // return postService.getUserPosts({ userId, status: 'draft' });
      return [];
    },
  });

  const isLoading = activeTab === 'published' ? publishedLoading : draftLoading;

  return (
    <div className="w-full">
      <UserPostTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl p-4 animate-pulse"
              style={{ backgroundColor: '#F2F1ED' }}
            >
              <div className="h-12 bg-gray-300 rounded-full mb-4 w-12" />
              <div className="h-4 bg-gray-300 rounded mb-3 w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-full" />
            </div>
          ))}
        </div>
      ) : activeTab === 'published' ? (
        /* Published Posts - Grid */
        publishedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publishedPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState message="No posts yet. Start sharing your thoughts!" />
        )
      ) : (
        /* Draft Posts - List */
        draftPosts.length > 0 ? (
          <div className="space-y-3">
            {draftPosts.map((post: any) => (
              <UserDraftCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState message="No drafts yet. Create your first draft!" />
        )
      )}
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div
    className="text-center py-12 rounded-xl"
    style={{ backgroundColor: '#F2F1ED' }}
  >
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);