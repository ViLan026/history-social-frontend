import { DashboardOverviewResponse } from '../dashboard.types';

type StatCardProps = {
  label: string;
  value: number;
  accent?: string;
  sub?: string;
};

function StatCard({ label, value, accent = 'from-amber-500/20 to-amber-600/5', sub }: StatCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-slate-700/50 bg-gradient-to-br ${accent} p-5 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-slate-900/60" />
      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">{label}</p>
        <p className="text-3xl font-bold text-white tabular-nums">
          {value.toLocaleString('vi-VN')}
        </p>
        {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
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
      accent: 'from-sky-500/20 to-sky-600/5',
      sub: `Hoạt động: ${overview.activeUsers.toLocaleString('vi-VN')}`,
    },
    {
      label: 'Người dùng hoạt động',
      value: overview.activeUsers,
      accent: 'from-emerald-500/20 to-emerald-600/5',
      sub: `Không hoạt động: ${overview.inactiveUsers.toLocaleString('vi-VN')}`,
    },
    {
      label: 'Tổng bài viết',
      value: overview.totalPosts,
      accent: 'from-violet-500/20 to-violet-600/5',
      sub: `Đã xuất bản: ${overview.publishedPosts.toLocaleString('vi-VN')}`,
    },
    {
      label: 'Đã xuất bản',
      value: overview.publishedPosts,
      accent: 'from-teal-500/20 to-teal-600/5',
      sub: `Bản nháp: ${overview.draftPosts.toLocaleString('vi-VN')}`,
    },
    {
      label: 'Báo cáo đang chờ',
      value: overview.pendingReports,
      accent: 'from-rose-500/20 to-rose-600/5',
      sub: `Đã xử lý: ${overview.resolvedReports.toLocaleString('vi-VN')}`,
    },
    {
      label: 'Bài viết bị gắn cờ',
      value: overview.flaggedPosts,
      accent: 'from-orange-500/20 to-orange-600/5',
      sub: `Bị ẩn: ${overview.hiddenPosts.toLocaleString('vi-VN')}`,
    },
    {
      label: 'Tổng bình luận',
      value: overview.totalComments,
      accent: 'from-blue-500/20 to-blue-600/5',
    },
    {
      label: 'Tổng tương tác',
      value: overview.totalReactions,
      accent: 'from-pink-500/20 to-pink-600/5',
      sub: `Bookmark: ${overview.totalBookmarks.toLocaleString('vi-VN')} · Follow: ${overview.totalFollows.toLocaleString('vi-VN')}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}