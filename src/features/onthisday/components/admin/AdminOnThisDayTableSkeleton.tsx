"use client";

import React from "react";

export const AdminOnThisDayTableSkeleton: React.FC = () => {
  return (
    <div className="w-full border border-border rounded-xl bg-surface overflow-hidden animate-fade-in">
      <div className="border-b border-border bg-muted/40 h-12 w-full flex items-center px-6 gap-4">
        <div className="h-4 bg-border rounded w-24 animate-pulse" />
        <div className="h-4 bg-border rounded w-48 animate-pulse" />
        <div className="h-4 bg-border rounded flex-1 animate-pulse" />
        <div className="h-4 bg-border rounded w-20 animate-pulse ml-auto" />
      </div>
      <div className="divide-y divide-border-muted">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 flex items-center gap-4 w-full">
            <div className="h-4 bg-border rounded w-24 animate-pulse" />
            <div className="h-4 bg-border rounded w-40 animate-pulse" />
            <div className="h-4 bg-border rounded flex-1 animate-pulse" />
            <div className="h-8 bg-border rounded w-28 animate-pulse ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};