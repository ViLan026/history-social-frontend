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
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color: '#38bdf8' }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#38bdf8' }}
            name="Người dùng"
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardSection>
  );
}