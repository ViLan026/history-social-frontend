'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CountByTypeResponse } from '../dashboard.types';
import { DashboardSection, EmptyState } from './DashboardSection';

type Props = {
  data: CountByTypeResponse[];
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

export function ReportReasonChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <DashboardSection title="Lý do báo cáo" className="xl:col-span-2">
        <EmptyState />
      </DashboardSection>
    );
  }

  const chartData = data
    .map((d) => ({ ...d, label: REASON_LABELS[d.name] ?? d.name }))
    .sort((a, b) => b.count - a.count);

  return (
    <DashboardSection title="Lý do báo cáo" className="xl:col-span-2">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 4, right: 24, left: 8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="label"
            width={120}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color: '#f87171' }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="count" fill="#f87171" radius={[0, 4, 4, 0]} name="Số báo cáo" />
        </BarChart>
      </ResponsiveContainer>
    </DashboardSection>
  );
}