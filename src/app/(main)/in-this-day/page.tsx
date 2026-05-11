// app/(main)/in-this-day/page.tsx
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "@/components/layout/Navigation";

import OnThisDayHeader from "@/features/onthisday/components/OnThisDayHeader";
import OnThisDayList from "@/features/onthisday/components/OnThisDayList";
import SuggestedUsers from "@/features/user/components/SuggestedUsers";

export default function InThisDayPage() {
  return (
    <MainLayout
      leftSidebar={<Navigation />}
      rightSidebar={
              <div className="h-full relative space-y-6">
                <SuggestedUsers />
      
                <div className="sticky top-20 pb-8">
                  {/* <TodayInHistory /> */}
                </div>
              </div>
            }
    >
      <div className="max-w-feed mx-auto px-4 py-2">
        <OnThisDayHeader />
        <OnThisDayList />
      </div>
    </MainLayout>
  );
}