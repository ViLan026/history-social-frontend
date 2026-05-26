// features/dashboard/components/DashboardSection.tsx

import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function DashboardSection({ title, children, className = '' }: Props) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-5 neu-raised ${className}`}
    >
      <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function EmptyState({ message = 'Chưa có dữ liệu' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-40 text-foreground-muted text-sm">
      {message}
    </div>
  );
}