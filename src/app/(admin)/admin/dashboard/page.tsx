'use client';

import { useState } from 'react';
import { useAdminDashboard } from '@/features/dashboard/useDashboard';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';
import { DashboardStatCards } from '@/features/dashboard/components/DashboardStatCards';
import { NewUsersChart } from '@/features/dashboard/components/NewUsersChart';
import { NewPostsChart } from '@/features/dashboard/components/NewPostsChart';
import { EngagementChart } from '@/features/dashboard/components/EngagementChart';
import { PostStatusChart } from '@/features/dashboard/components/PostStatusChart';
import { ReportStatusChart } from '@/features/dashboard/components/ReportStatusChart';
import { ReportReasonChart } from '@/features/dashboard/components/ReportReasonChart';
import { TopReportedPostsTable } from '@/features/dashboard/components/TopReportedPostsTable';
import { LatestPendingReportsTable } from '@/features/dashboard/components/LatestPendingReportsTable';
import { TopTagsTable } from '@/features/dashboard/components/TopTagsTable';

const DAY_OPTIONS = [
  { label: '7 ngày', value: 7 },
  { label: '30 ngày', value: 30 },
  { label: '90 ngày', value: 90 },
] as const;

type DayOption = (typeof DAY_OPTIONS)[number]['value'];

export default function AdminDashboardPage() {
  const [days, setDays] = useState<DayOption>(7);
  const { data, isLoading, isError } = useAdminDashboard(days, 10);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Dashboard quản trị
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tổng quan hoạt động và kiểm duyệt của hệ thống lịch sử.
          </p>
        </div>

        {/* Days selector */}
        <div className="flex items-center gap-1 bg-slate-800/70 border border-slate-700/50 rounded-xl p-1">
          {DAY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDays(opt.value)}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
                days === opt.value
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && <DashboardSkeleton />}

      {/* Error */}
      {isError && !isLoading && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-center">
          <p className="text-rose-400 font-semibold text-lg mb-1">
            Không thể tải dữ liệu dashboard
          </p>
          <p className="text-slate-500 text-sm">
            Vui lòng thử lại sau hoặc kiểm tra kết nối với server.
          </p>
        </div>
      )}

      {/* Content */}
      {data && !isLoading && (
        <div className="space-y-8">
          {/* Stat Cards */}
          <DashboardStatCards overview={data.overview} />

          {/* Charts grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <NewUsersChart data={data.newUsers ?? []} />
            <NewPostsChart data={data.newPosts ?? []} />
            <EngagementChart data={data.engagementStats ?? []} />
            <PostStatusChart data={data.postStatusStats ?? []} />
            <ReportStatusChart data={data.reportStatusStats ?? []} />
            <ReportReasonChart data={data.reportReasonStats ?? []} />
          </div>

          {/* Tables grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <LatestPendingReportsTable data={data.latestPendingReports ?? []} />
            <TopReportedPostsTable data={data.topReportedPosts ?? []} />
            <TopTagsTable data={data.topTags ?? []} />
          </div>
        </div>
      )}
    </main>
  );
}