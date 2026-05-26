// features/dashboard/components/EngagementChart.tsx

'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EngagementStatResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';
import { formatDateShort } from '@/lib/utils';

type Props = {
  data: EngagementStatResponse[];
};

const LINES = [
  { key: 'comments', label: 'Bình luận', color: 'var(--foreground)' },
  { key: 'reactions', label: 'Tương tác', color: 'var(--primary)' },
  { key: 'bookmarks', label: 'Bookmark', color: 'var(--foreground-muted)' },
  { key: 'follows', label: 'Follow', color: 'var(--border)' },
] as const;

export function EngagementChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Tương tác theo ngày">
        <EmptyState />
      </DashboardSection>
    );
  }

  const chartData = data.map((d) => ({ ...d, date: formatDateShort(d.date) }));

  return (
    <DashboardSection title="Tương tác theo ngày" >
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-muted)" />
          <XAxis dataKey="date" tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4 }}
            labelStyle={{ color: 'var(--foreground-muted)' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'var(--foreground-muted)', paddingTop: 8 }}
            formatter={(value) => LINES.find((l) => l.key === value)?.label ?? value}
          />
          {LINES.map(({ key, color, label }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              name={label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </DashboardSection>
  );
}