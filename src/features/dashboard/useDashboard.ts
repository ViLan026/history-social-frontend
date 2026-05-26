import { useQuery } from '@tanstack/react-query';
import { dashboardService } from './dashboard.service';
import { AdminDashboardData } from './dashboard.types';

export const DASHBOARD_QUERY_KEY = 'admin-dashboard';

export function useAdminDashboard(days = 7, limit = 10) {
  return useQuery<AdminDashboardData>({
    queryKey: [DASHBOARD_QUERY_KEY, days, limit],
    queryFn: async (): Promise<AdminDashboardData> => {
      const [
        overview,
        postStatusStats,
        reportStatusStats,
        reportReasonStats,
        newUsers,
        newPosts,
        engagementStats,
        topReportedPosts,
        latestPendingReports,
        topTags,
        reactionStats,
      ] = await Promise.all([
        dashboardService.getOverview(),
        dashboardService.getPostStatusStats(),
        dashboardService.getReportStatusStats(),
        dashboardService.getReportReasonStats(),
        dashboardService.getNewUsers(days),
        dashboardService.getNewPosts(days),
        dashboardService.getEngagementStats(days),
        dashboardService.getTopReportedPosts(limit),
        dashboardService.getLatestPendingReports(limit),
        dashboardService.getTopTags(limit),
        dashboardService.getReactionStats(),
      ]);

      return {
        overview,
        postStatusStats,
        reportStatusStats,
        reportReasonStats,
        newUsers,
        newPosts,
        engagementStats,
        topReportedPosts,
        latestPendingReports,
        topTags,
        reactionStats,
      };
    },
    staleTime: 1000 * 60 * 2, // 2 phút
  });
}