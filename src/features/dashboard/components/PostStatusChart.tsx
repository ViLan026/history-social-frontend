// features/dashboard/components/PostStatusChart.tsx

'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CountByStatusResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';

type Props = {
  data: CountByStatusResponse[];
};

const STATUS_COLORS: Record<string, string> = {
  PUBLISHED: 'var(--primary)',
  DRAFT: 'var(--foreground-muted)',
  HIDDEN: 'var(--border)',
  FLAGGED: 'var(--border-muted)',
  REJECTED: 'var(--foreground)',
};

const STATUS_LABELS: Record<string, string> = {
  PUBLISHED: 'Đã đăng',
  DRAFT: 'Nháp',
  HIDDEN: 'Ẩn',
  FLAGGED: 'Gắn cờ',
  REJECTED: 'Từ chối',
};

export function PostStatusChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Trạng thái bài viết">
        <EmptyState />
      </DashboardSection>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    label: STATUS_LABELS[d.name] ?? d.name,
  }));

  return (
    <DashboardSection title="Trạng thái bài viết">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-muted)" />
          <XAxis dataKey="label" tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4 }}
            labelStyle={{ color: 'var(--foreground-muted)' }}
            cursor={{ fill: 'var(--surface)' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Số lượng">
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={STATUS_COLORS[entry.name] ?? 'var(--border)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </DashboardSection>
  );
}