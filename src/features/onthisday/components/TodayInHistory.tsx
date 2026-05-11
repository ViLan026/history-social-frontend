// src/features/onthisday/components/TodayInHistory.tsx
'use client';

import { useEffect, useState } from 'react';
import OnThisDayCard from './OnThisDayCard';
import { OnThisDayEvent } from '../onthisday.types';
import { onThisDayService } from '../onthisday.service';

export default function TodayInHistory() {
  const [events, setEvents] = useState<OnThisDayEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayEvents = async () => {
      try {
        const data = await onThisDayService.getAllEvents();
        setEvents(data.events);
      } catch (error) {
        console.error('Failed to fetch today in history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayEvents();
  }, []);

  return (
    <div className="neu-raised bg-surface rounded-2xl p-5 border border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center text-xl">
          📜
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Ngày này năm xưa</h3>
          <p className="text-sm text-foreground-muted">Historical moments</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted/50 animate-pulse rounded-xl" />
          ))
        ) : events.length > 0 ? (
          events.map((event) => (
            <OnThisDayCard key={event.id} event={event} compact />
          ))
        ) : (
          <p className="text-sm text-foreground-muted py-4">Không có dữ liệu hôm nay.</p>
        )}
      </div>

      <a 
        href="/in-this-day" 
        className="mt-5 block text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        Xem tất cả sự kiện →
      </a>
    </div>
  );
}