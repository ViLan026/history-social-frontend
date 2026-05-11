// src/features/onthisday/components/OnThisDayList.tsx
'use client';

import { useEffect, useState } from 'react';
import OnThisDayCard from './OnThisDayCard';
import { OnThisDayEvent } from '../onthisday.types';
import { onThisDayService } from '../onthisday.service';
import LoadingCard from '@/components/shared/LoadingCard';

export default function OnThisDayList() {
  const [events, setEvents] = useState<OnThisDayEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await onThisDayService.getAllEvents();
        setEvents(data.events);
      } catch (error) {
        console.error('Failed to fetch on this day events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingCard key={i} className="h-36" />
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