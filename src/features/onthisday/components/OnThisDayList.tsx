"use client";

import OnThisDayCard from "./OnThisDayCard";
import LoadingCard from "@/components/shared/LoadingCard";
import { useTodayEvents } from "../useOnThisDay";

export default function OnThisDayList() {
  const { data: events = [], isLoading } = useTodayEvents();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={index} className="h-36" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.length > 0 ? (
        events.map((event) => (
          <OnThisDayCard key={event.id} event={event} />
        ))
      ) : (
        <div className="text-center py-20 text-foreground-muted">
          Hiện chưa có sự kiện lịch sử nào cho ngày hôm nay.
        </div>
      )}
    </div>
  );
}