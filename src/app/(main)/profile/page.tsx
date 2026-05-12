import { Suspense } from "react";
import ProfileInfo from "@/features/user/components/ProfileInfo";
import ProfileTabs from "@/components/layout/ProfileTabs";
import PostList from "@/features/post/components/PostList";
// import BookmarkList from "@/features/bookmark/components/BookmarkList";

export type ProfileTab = "posts" | "bookmarks" | "reposts";

interface ProfilePageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function ProfilePage({
  searchParams,
}: ProfilePageProps) {
  
const params = await searchParams;

  const activeTab: ProfileTab =
    params.tab === "bookmarks" || params.tab === "reposts"
      ? params.tab
      : "posts";

  return (
    <div className="min-h-screen bg-background max-w-7xl w-4/5 mx-auto">
      {/* Profile Info Section */}
      <ProfileInfo />

      {/* Profile Tabs Navigation */}
      <ProfileTabs />

      {/* Tab Content */}
      <Suspense fallback={<ContentSkeleton />}>
        <ProfileContent activeTab={activeTab} />
      </Suspense>
    </div>
  );
}


interface ProfileContentProps {
  activeTab: ProfileTab;
}

function ProfileContent({ activeTab }: ProfileContentProps) {
  return (
    <div className="max-w-feed mx-auto">
      {activeTab === "posts" && <div><PostList/></div>}

      {activeTab === "bookmarks" && <div>Bookmarks</div>}

      {activeTab === "reposts" && <div>Reposts</div>}
    </div>
  );
}


function ContentSkeleton() {
  return (
    <div className=" w-full max-w-[720px] mx-auto p-4 space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface border border-b-neutral-900 rounded-2xl p-6 space-y-4"
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