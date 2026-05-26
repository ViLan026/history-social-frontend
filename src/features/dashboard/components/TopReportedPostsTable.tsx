import { TopReportedPostResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';
import { formatDateTime } from '@/lib/utils';

type Props = {
  data: TopReportedPostResponse[];
};

const STATUS_BADGE: Record<string, string> = {
  PUBLISHED: 'bg-emerald-500/15 text-emerald-400',
  DRAFT: 'bg-slate-500/15 text-slate-400',
  HIDDEN: 'bg-yellow-500/15 text-yellow-400',
  FLAGGED: 'bg-red-500/15 text-red-400',
  REJECTED: 'bg-rose-500/15 text-rose-400',
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
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-2 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="text-left py-2 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Trạng thái
              </th>
              <th className="text-right py-2 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Report
              </th>
              <th className="text-right py-2 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Điểm CL
              </th>
              <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.postId}
                className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-2.5 pr-3 text-slate-200 max-w-[180px] truncate" title={row.title}>
                  {row.title}
                </td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      STATUS_BADGE[row.status] ?? 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right font-semibold text-rose-400">
                  {row.reportCount}
                </td>
                <td className="py-2.5 pr-3 text-right text-slate-300">
                  {row.qualityScore != null ? row.qualityScore.toFixed(2) : '—'}
                </td>
                <td className="py-2.5 text-right text-slate-500 whitespace-nowrap">
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