"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LoadingCardProps {
  className?: string;
  lines?: number;
}

export default function LoadingCard({ className, lines = 3 }: LoadingCardProps) {
  try {
    return (
      <div
        className={cn(
          "animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm",
          className
        )}
      >
        {/* Avatar + title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-gray-200" />
            <div className="h-3 w-1/4 rounded bg-gray-200" />
          </div>
        </div>

        {/* Content lines */}
        <div className="mt-4 space-y-2">
          {Array.from({ length: lines }).map((_, idx) => (
            <div
              key={idx}
              className="h-3 w-full rounded bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  } catch {
    return null;
  }
}