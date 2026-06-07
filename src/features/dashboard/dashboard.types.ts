export type DashboardOverviewResponse = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  hiddenPosts: number;
  flaggedPosts: number;
  rejectedPosts: number;
  pendingReports: number;
  resolvedReports: number;
  dismissedReports: number;
  totalComments: number;
  totalReactions: number;
  totalBookmarks: number;
  totalFollows: number;
};

export type CountByStatusResponse = {
  name: string;
  count: number;
};

export type CountByTypeResponse = {
  name: string;
  count: number;
};

export type TimeSeriesStatResponse = {
  date: string;
  count: number;
};

export type EngagementStatResponse = {
  date: string;
  comments: number;
  reactions: number;
  bookmarks: number;
  follows: number;
};

export type TopReportedPostResponse = {
  postId: string;
  title: string;
  authorId: string;
  status: string;
  reportCount: number;
  // qualityScore: number;
  createdAt: string;
};

export type LatestPendingReportResponse = {
  reportId: string;
  targetType: 'POST' | 'COMMENT' | string;
  targetId: string;
  reasonType: string;
  reasonText?: string;
  reporterId: string;
  createdAt: string;
};

export type TopTagResponse = {
  tagId: string;
  name: string;
  usageCount: number;
};

export type ReactionStatResponse = {
  name: string;
  count: number;
};

export type AdminDashboardData = {
  overview: DashboardOverviewResponse;
  postStatusStats: CountByStatusResponse[];
  reportStatusStats: CountByStatusResponse[];
  reportReasonStats: CountByTypeResponse[];
  newUsers: TimeSeriesStatResponse[];
  newPosts: TimeSeriesStatResponse[];
  engagementStats: EngagementStatResponse[];
  topReportedPosts: TopReportedPostResponse[];
  latestPendingReports: LatestPendingReportResponse[];
  topTags: TopTagResponse[];
  reactionStats: ReactionStatResponse[];
};