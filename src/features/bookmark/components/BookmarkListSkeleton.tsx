// @/features/bookmark/components/BookmarkListSkeleton.tsx
import React from "react";

export default function BookmarkListSkeleton() {
    const skeletonItems = Array.from({ length: 3 });

    return (
        <div className="space-y-4 md:space-y-5 w-full">
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-2xl bg-card border border-border/40 p-4 md:p-5 lg:p-6 space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted" />
                            
                            <div className="space-y-2">
                                <div className="h-3.5 w-28 rounded bg-muted" />
                                <div className="h-2.5 w-44 rounded bg-muted/60" />
                            </div>
                        </div>

                        <div className="h-9 w-9 rounded-full bg-muted/40" />
                    </div>

                    <div className="space-y-2.5">
                        <div className="h-5 w-2/3 rounded-lg bg-muted" />
                        
                        <div className="space-y-2 pt-1">
                            <div className="h-3.5 w-full rounded bg-muted/70" />
                            <div className="h-3.5 w-full rounded bg-muted/70" />
                            <div className="h-3.5 w-3/4 rounded bg-muted/40" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 pt-3 border-t border-border/30">
                        <div className="h-4 w-20 rounded bg-muted/60" />
                        <div className="h-4 w-16 rounded bg-muted/60" />
                        <div className="h-4 w-24 rounded bg-muted/60" />
                    </div>
                </div>
            ))}
        </div>
    );
}