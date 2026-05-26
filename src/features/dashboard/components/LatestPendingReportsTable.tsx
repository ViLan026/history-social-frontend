// features/dashboard/components/LatestPendingReportsTable.tsx

import { LatestPendingReportResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';
import { formatDateTime } from '@/lib/utils';

type Props = {
  data: LatestPendingReportResponse[];
};

const REASON_LABELS: Record<string, string> = {
  MISINFORMATION: 'Sai thông tin',
  FAKE_HISTORY: 'Lịch sử giả',
  HATE_SPEECH: 'Ngôn ngữ thù địch',
  VIOLENCE: 'Bạo lực',
  HARASSMENT: 'Quấy rối',
  SPAM: 'Spam',
  INAPPROPRIATE: 'Không phù hợp',
  OTHER: 'Khác',
};

const TARGET_BADGE: Record<string, string> = {
  POST: 'bg-primary/10 text-primary border border-primary/20',
  COMMENT: 'bg-foreground-muted/10 text-foreground-muted border border-foreground-muted/20',
};

export function LatestPendingReportsTable({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Báo cáo mới nhất đang chờ">
        <EmptyState />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Báo cáo mới nhất đang chờ">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-muted/50">
              <th className="text-left py-2 pr-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider whitespace-nowrap">
                Loại
              </th>
              <th className="text-left py-2 pr-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider whitespace-nowrap">
                Lý do
              </th>
              <th className="text-left py-2 pr-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                Mô tả
              </th>
              <th className="text-right py-2 text-xs font-semibold text-foreground-muted uppercase tracking-wider whitespace-nowrap">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.reportId}
                className="border-b border-border-muted/30 hover:bg-surface/50 transition-colors duration-150"
              >
                <td className="py-2.5 pr-3">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      TARGET_BADGE[row.targetType] ?? 'bg-border/30 text-foreground-muted'
                    }`}
                  >
                    {row.targetType}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-foreground whitespace-nowrap">
                  {REASON_LABELS[row.reasonType] ?? row.reasonType}
                </td>
                <td className="py-2.5 pr-3 text-foreground-muted max-w-[160px] truncate" title={row.reasonText}>
                  {row.reasonText ?? '—'}
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