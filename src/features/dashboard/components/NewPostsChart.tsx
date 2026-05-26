'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesStatResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';
import { formatDateShort } from '@/lib/utils';

type Props = {
  data: TimeSeriesStatResponse[];
};

export function NewPostsChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Bài viết mới">
        <EmptyState />
      </DashboardSection>
    );
  }

  const chartData = data.map((d) => ({ ...d, date: formatDateShort(d.date) }));

  return (
    <DashboardSection title="Bài viết mới">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color: '#a78bfa' }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#a78bfa"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#a78bfa' }}
            name="Bài viết"
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardSection>
  );
}