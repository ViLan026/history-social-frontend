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
  { key: 'comments', label: 'Bình luận', color: '#34d399' },
  { key: 'reactions', label: 'Tương tác', color: '#f472b6' },
  { key: 'bookmarks', label: 'Bookmark', color: '#fbbf24' },
  { key: 'follows', label: 'Follow', color: '#60a5fa' },
] as const;

export function EngagementChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Tương tác theo ngày" className="xl:col-span-2">
        <EmptyState />
      </DashboardSection>
    );
  }

  const chartData = data.map((d) => ({ ...d, date: formatDateShort(d.date) }));

  return (
    <DashboardSection title="Tương tác theo ngày" className="xl:col-span-2">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 8 }}
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