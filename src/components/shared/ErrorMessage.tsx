"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export function ErrorMessage({
  message = "Something went wrong",
  className,
}: ErrorMessageProps) {
  try {
    if (!message) return null;

    return (
      <div
        role="alert"
        className={cn(
          "rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700",
          className
        )}
      >
        {message}
      </div>
    );
  } catch {
    return null;
  }
}