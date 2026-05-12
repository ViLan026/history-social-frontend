import { Suspense } from "react";
import ProfileInfo from "@/features/user/components/ProfileInfo";
import ProfileTabs, { useProfileTab } from "@/components/layout/navUser/ProfileTabs";
import PostList from "@/features/post/components/PostList";
import BookmarkList from "@/features/bookmark/components/BookmarkList";

/**
 * Profile Page
 * Hiển thị thông tin profile và các tab content
 * - ProfileInfo: Avatar, stats, bio, edit button
 * - ProfileTabs: Navigation (Posts, Bookmarks, Reposts)
 * - Content: Posts/Bookmarks/Reposts theo tab active
 */
export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Profile Info Section */}
      <ProfileInfo />

      {/* Profile Tabs Navigation */}
      <ProfileTabs />

      {/* Tab Content */}
      <Suspense fallback={<ContentSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}

/**
 * ProfileContent Component
 * Render nội dung tương ứng với active tab
 */
function ProfileContent() {
  const activeTab = useProfileTab();

  return (
    <div className="max-w-feed mx-auto">
      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div role="tabpanel" id="posts-panel" aria-labelledby="posts-tab">
          <PostList 
            filters={{ 
              // TODO: Filter posts by current user
              // userId: currentUser?.id 
            }}
          />
        </div>
      )}

      {/* Bookmarks Tab */}
      {activeTab === "bookmarks" && (
        <div role="tabpanel" id="bookmarks-panel" aria-labelledby="bookmarks-tab">
          <BookmarkList />
        </div>
      )}

      {/* Reposts Tab */}
      {activeTab === "reposts" && (
        <div role="tabpanel" id="reposts-panel" aria-labelledby="reposts-tab">
          <RepostsContent />
        </div>
      )}
    </div>
  );
}

/**
 * RepostsContent Component
 * TODO: Implement reposts functionality
 * Hiển thị các bài post mà user đã repost
 */
function RepostsContent() {
  return (
    <div className="p-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
          <svg
            className="w-8 h-8 text-foreground-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No reposts yet
        </h3>
        <p className="text-sm text-foreground-muted">
          When you repost historical insights and discussions, they'll appear here.
        </p>
      </div>
    </div>
  );
}

/**
 * ContentSkeleton
 * Loading state cho tab content
 */
function ContentSkeleton() {
  return (
    <div className="max-w-feed mx-auto p-4 space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-2xl p-6 space-y-4"
        >
          {/* Header Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-surface-muted rounded animate-pulse" />
              <div className="h-3 w-24 bg-surface-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-surface-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-surface-muted rounded animate-pulse" />
            <div className="h-4 w-3/5 bg-surface-muted rounded animate-pulse" />
          </div>

          {/* Actions Skeleton */}
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div
                key={j}
                className="h-8 w-16 bg-surface-muted rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}