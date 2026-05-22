"use client";

import FollowTabs from "@/features/follow/components/FollowTabs";
import FollowMainList from "@/features/follow/components/FollowMainList";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "@/components/layout/Navigation";
import TodayInHistory from "@/features/onthisday/components/TodayInHistory";

export default function FollowPage() {
    return (
        <MainLayout
            leftSidebar={<Navigation />}
            rightSidebar={
                <div className="h-full relative space-y-6">
                    {/* <SuggestedUsers /> */}

                    <div className="sticky top-20 pb-8">
                        <TodayInHistory />
                    </div>
                </div>
            }
        >
            <div className="max-w-xl mx-auto py-6 px-4">
                <FollowTabs />
                <FollowMainList />
            </div>
        </MainLayout>
    );
}
