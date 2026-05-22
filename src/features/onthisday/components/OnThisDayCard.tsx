import { OnThisDayEvent } from "../onthisday.types";

interface OnThisDayCardProps {
  event: OnThisDayEvent;
  compact?: boolean;
}

function formatEventDate(eventDate: string) {
  const date = new Date(eventDate);

  if (Number.isNaN(date.getTime())) {
    return eventDate;
  }

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}

export default function OnThisDayCard({
  event,
  compact = false,
}: OnThisDayCardProps) {
  return (
    <article
      className={`bg-card border border-border rounded-xl p-4 transition-all duration-300 hover:border-primary/30 ${
        compact ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-1.5 shrink-0">
          <div className="text-sm font-bold text-foreground-muted leading-none">
            {formatEventDate(event.eventDate)}
          </div>

          <div className="text-[13px] tracking-wider text-foreground-muted">
            • Sự kiện lịch sử
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm md:text-base font-normal leading-relaxed text-foreground-muted whitespace-pre-line ${
              compact ? "line-clamp-2" : "line-clamp-3"
            }`}
          >
            {event.description}
          </h4>

          {!compact && event.note && (
            <p className="mt-1.5 text-xs text-foreground-muted line-clamp-4 leading-relaxed">
              {event.note}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
