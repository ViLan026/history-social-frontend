// src/app/(main)/notifications/page.tsx

import MainLayout from "@/components/layout/MainLayout";
import Navigation from "@/components/layout/Navigation";

import NotificationList from "@/features/notification/components/NotificationList";
import SuggestedUsers from "@/features/follow/components/SuggestedUsers";
import TodayInHistory from "@/features/onthisday/components/TodayInHistory";

export default function NotificationsPage() {
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
            <div className="max-w-feed mx-auto px-4 py-2 md:pt-5 lg:pt-7">
                <section className="overflow-hidden rounded-2xl border border-border bg-card neu-raised">
                    <NotificationList size={20} showLoadMore /> 
                </section>
            </div>
        </MainLayout>
    );
}
