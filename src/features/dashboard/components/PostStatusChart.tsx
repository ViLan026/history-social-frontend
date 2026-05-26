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
  PUBLISHED: '#34d399',
  DRAFT: '#94a3b8',
  HIDDEN: '#fbbf24',
  FLAGGED: '#f87171',
  REJECTED: '#ef4444',
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
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#94a3b8' }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Số lượng">
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={STATUS_COLORS[entry.name] ?? '#64748b'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </DashboardSection>
  );
}