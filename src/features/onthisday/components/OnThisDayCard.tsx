// src/features/onthisday/components/OnThisDayCard.tsx
import { OnThisDayEvent } from '../onthisday.types';

interface OnThisDayCardProps {
  event: OnThisDayEvent;
  compact?: boolean;
}

export default function OnThisDayCard({ event, compact = false }: OnThisDayCardProps) {
  return (
    <div className={`neu-raised bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:border-primary/30 ${compact ? 'cursor-pointer' : ''}`}>
      <div className="flex gap-5">
        {/* Year */}
        <div className="text-right shrink-0">
          <div className="text-3xl font-bold text-primary leading-none">
            {event.year}
          </div>
          <div className="text-xs text-foreground-muted mt-1">
            {event.date}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-foreground leading-snug ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
            {event.title}
          </h4>
          
          {!compact && (
            <p className="mt-3 text-sm text-foreground-muted line-clamp-4 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}