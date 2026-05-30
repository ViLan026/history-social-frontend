import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LoadingCardProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export default function LoadingCard({
  className,
  lines = 3,
  ...props
}: LoadingCardProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl border border-card-border bg-card p-4",
        className
      )}
      aria-label="Đang tải dữ liệu"
      role="status"
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-surface-raised" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded bg-surface-raised" />
          <div className="h-3 w-1/2 rounded bg-surface-raised" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-3 rounded bg-surface-raised",
              index === lines - 1 ? "w-2/3" : "w-full"
            )}
          />
        ))}
      </div>
    </div>
  );
}
