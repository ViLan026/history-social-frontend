// src/features/notification/components/NotificationListSkeleton.tsx

export default function NotificationListSkeleton() {
    return (
        <div className="divide-y divide-border-muted">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="flex gap-3 px-4 py-3 animate-pulse"
                >
                    <div className="h-9 w-9 rounded-full bg-surface-raised" />

                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 rounded bg-surface-raised" />
                        <div className="h-3 w-1/3 rounded bg-surface-raised" />
                    </div>
                </div>
            ))}
        </div>
    );
}