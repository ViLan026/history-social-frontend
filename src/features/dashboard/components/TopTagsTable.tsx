// features/dashboard/components/TopTagsTable.tsx

import { TopTagResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';

type Props = {
  data: TopTagResponse[];
};

export function TopTagsTable({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Tag phổ biến">
        <EmptyState />
      </DashboardSection>
    );
  }

  const max = Math.max(...data.map((d) => d.usageCount), 1);

  return (
    <DashboardSection title="Tag phổ biến">
      <div className="space-y-4">
        {data.map((tag, index) => (
          <div key={tag.tagId} className="flex items-center gap-3 group">
            <span className="text-xs font-mono text-foreground-muted w-5 text-right shrink-0">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground font-medium truncate">{tag.name}</span>
                <span className="text-xs text-foreground-muted shrink-0 ml-2 tabular-nums">
                  {tag.usageCount.toLocaleString('vi-VN')}
                </span>
              </div>
              <div className="h-1 rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(tag.usageCount / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}