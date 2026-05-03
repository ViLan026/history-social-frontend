// components/sidebar/TodayInHistory.tsx
// ============================================================
// "Ngày này năm xưa" widget
// Styling: 100% semantic tokens, zero hardcoded colors
// ============================================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HistoricalEvent {
  year: number;
  title: string;
  description: string;
  href?: string;
}

// ─── Data (thay bằng API call sau) ───────────────────────────────────────────

const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    year: 1975,
    title: "Giải phóng miền Nam",
    description: "Chiến dịch Hồ Chí Minh kết thúc với thắng lợi hoàn toàn",
  },
  {
    year: 1945,
    title: "Cách mạng tháng Tám",
    description: "Nhân dân Việt Nam giành chính quyền",
  },
  {
    year: 1954,
    title: "Chiến thắng Điện Biên Phủ",
    description: "Thắng lợi lịch sử chấn động địa cầu",
  },
];

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ event }: { event: HistoricalEvent }) {
  const inner = (
    <div className="flex items-start gap-3">
      {/* Year badge */}
      <div
        className="
          w-12 h-12 rounded-lg shrink-0
          flex items-center justify-center
          bg-primary-subtle border border-primary/20
        "
        aria-hidden="true"
      >
        <span className="text-xs font-heading font-bold text-primary leading-tight text-center">
          {event.year}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-0.5 leading-snug">
          {event.title}
        </h3>
        <p className="text-xs leading-relaxed text-foreground-muted line-clamp-2">
          {event.description}
        </p>
      </div>
    </div>
  );

  const sharedClass = `
    block rounded-lg p-3
    bg-surface border border-border-muted
    hover:border-border hover:bg-surface-raised
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    transition-all duration-150
  `;

  if (event.href) {
    return (
      <Link href={event.href} className={sharedClass}>
        {inner}
      </Link>
    );
  }

  return <div className={sharedClass}>{inner}</div>;
}

// ─── TodayInHistory ───────────────────────────────────────────────────────────

export default function TodayInHistory() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
      })
    );
  }, []);

  return (
    <section
      className="rounded-xl bg-card border border-card-border p-4"
      aria-labelledby="today-history-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id="today-history-heading"
          className="text-sm font-heading font-semibold tracking-wide text-foreground"
        >
          Ngày này năm xưa
        </h2>

        {currentDate && (
          <span className="text-xs text-foreground-faint tabular-nums">
            {currentDate}
          </span>
        )}
      </div>

      {/* Events */}
      <ul className="flex flex-col gap-2" role="list">
        {HISTORICAL_EVENTS.map((event) => (
          <li key={`${event.year}-${event.title}`}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/timeline"
        className="
          block w-full mt-4 px-4 py-2 rounded-lg
          text-xs font-medium text-center
          text-primary border border-primary/30
          hover:bg-primary-subtle hover:border-primary/60
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          transition-all duration-150
        "
      >
        Xem thêm sự kiện →
      </Link>
    </section>
  );
}