// app/(main)/page.tsx

import MainLayout from "@/components/layout/MainLayout";
import Navigation from "@/components/layout/Navigation";

import Feed from "@/features/post/components/Feed";
import SuggestedUsers from "@/features/user/components/SuggestedUsers";
import TodayInHistory from "@/features/onthisday/components/TodayInHistory";

export default function HomePage() {
  return (
    <MainLayout
      leftSidebar={<Navigation />}
      rightSidebar={
        <div className="h-full relative space-y-6">
          <SuggestedUsers />

          <div className="sticky top-20 pb-8">
            <TodayInHistory />
          </div>
        </div>
      }
    >
      <Feed />
    </MainLayout>
  );
}