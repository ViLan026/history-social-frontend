// features/dashboard/components/DashboardStatCards.tsx

import { DashboardOverviewResponse } from '../dashboard.types';

type StatCardProps = {
  label: string;
  value: number;
  sub?: string;
};

function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="relative rounded-lg border border-border bg-card p-5 overflow-hidden neu-raised transition-all duration-200 hover:border-border-muted">
      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted mb-2">
          {label}
        </p>
        <p className="text-2xl md:text-3xl font-bold text-foreground font-serif tabular-nums tracking-tight">
          {value.toLocaleString('vi-VN')}
        </p>
        {sub && <p className="text-xs text-foreground-muted mt-2 border-t border-border-muted/30 pt-1.5">{sub}</p>}
      </div>
    </div>
  );
}

type Props = {
  overview: DashboardOverviewResponse;
};

export function DashboardStatCards({ overview }: Props) {
  const cards: StatCardProps[] = [
    {
      label: 'Tổng người dùng',
      value: overview.totalUsers,
      sub: `Hoạt động: ${overview.activeUsers.toLocaleString('vi-VN')}`,
    },
    // {
    //   label: 'Người dùng hoạt động',
    //   value: overview.activeUsers,
    //   sub: `Không hoạt động: ${overview.inactiveUsers.toLocaleString('vi-VN')}`,
    // },
    {
      label: 'Tổng bài viết',
      value: overview.totalPosts,
      sub: `Đã xuất bản: ${overview.publishedPosts.toLocaleString('vi-VN')}`,
    },
    // {
    //   label: 'Đã xuất bản',
    //   value: overview.publishedPosts,
    //   sub: `Bản nháp: ${overview.draftPosts.toLocaleString('vi-VN')}`,
    // },
    {
      label: 'Báo cáo đang chờ',
      value: overview.pendingReports,
      sub: `Đã xử lý: ${overview.resolvedReports.toLocaleString('vi-VN')}`,
    },
    // {
    //   label: 'Bài viết bị gắn cờ',
    //   value: overview.flaggedPosts,
    //   sub: `Bị ẩn: ${overview.hiddenPosts.toLocaleString('vi-VN')}`,
    // },
    // {
    //   label: 'Tổng bình luận',
    //   value: overview.totalComments,
    // },
    {
      label: 'Tổng tương tác',
      value: overview.totalReactions,
      sub: `Bookmark: ${overview.totalBookmarks.toLocaleString('vi-VN')} · Follow: ${overview.totalFollows.toLocaleString('vi-VN')}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}