import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function DashboardSection({ title, children, className = '' }: Props) {
  return (
    <div
      className={`rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-sm p-5 ${className}`}
    >
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function EmptyState({ message = 'Chưa có dữ liệu' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
      {message}
    </div>
  );
}