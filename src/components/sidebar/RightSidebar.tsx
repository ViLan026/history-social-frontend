// components/sidebar/RightSidebar.tsx
"use client";

import SuggestedUsers from "../../features/user/components/SuggestedUsers";
import TodayInHistory from "../../features/onthisday/components/TodayInHistory";

export default function RightSidebar() {
    return (
        <div className="h-full relative space-y-6">
            <SuggestedUsers />

            <div className="sticky top-20 pb-8">
                <TodayInHistory />
            </div>
        </div>
    );
}
