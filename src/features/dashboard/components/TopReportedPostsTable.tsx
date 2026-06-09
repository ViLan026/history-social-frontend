// features/dashboard/components/TopReportedPostsTable.tsx

import { TopReportedPostResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';
import { formatDateTime } from '@/lib/utils';

type Props = {
  data: TopReportedPostResponse[];
};

const STATUS_BADGE: Record<string, string> = {
  PUBLISHED: 'bg-primary/10 text-primary border border-primary/20',
  DRAFT: 'bg-foreground-muted/10 text-foreground-muted border border-foreground-muted/20',
  HIDDEN: 'bg-surface text-foreground border border-border',
  FLAGGED: 'bg-foreground text-primary-fg',
  REJECTED: 'bg-border text-foreground-muted',
};

export function TopReportedPostsTable({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Bài viết bị báo cáo nhiều nhất">
        <EmptyState />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Bài viết bị báo cáo nhiều nhất">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-muted/50">
              <th className="text-left py-2 pr-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="text-left py-2 pr-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider whitespace-nowrap">
                Trạng thái
              </th>
              <th className="text-right py-2 pr-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider whitespace-nowrap">
                Report
              </th>
              <th className="text-right py-2 text-xs font-semibold text-foreground-muted uppercase tracking-wider whitespace-nowrap">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.postId}
                className="border-b border-border-muted/30 hover:bg-surface/50 transition-colors duration-150"
              >
                <td className="py-2.5 pr-3 text-foreground font-serif max-w-[180px] truncate" title={row.title}>
                  {row.title}
                </td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      STATUS_BADGE[row.status] ?? 'bg-border/30 text-foreground-muted'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right font-semibold text-foreground">
                  {row.reportCount}
                </td>
                <td className="py-2.5 text-right text-foreground-muted whitespace-nowrap">
                  {formatDateTime(row.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardSection>
  );
}