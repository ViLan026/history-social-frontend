// features/dashboard/components/NewUsersChart.tsx

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

export function NewUsersChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Người dùng mới">
        <EmptyState />
      </DashboardSection>
    );
  }

  const chartData = data.map((d) => ({ ...d, date: formatDateShort(d.date) }));

  return (
    <DashboardSection title="Người dùng mới">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-muted)" />
          <XAxis dataKey="date" tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--foreground-muted)', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ 
              background: 'var(--card)', 
              border: '1px solid var(--border)', 
              borderRadius: '4px' 
            }}
            labelStyle={{ color: 'var(--foreground-muted)' }}
            itemStyle={{ color: 'var(--primary)' }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--primary)' }}
            name="Người dùng"
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardSection>
  );
}