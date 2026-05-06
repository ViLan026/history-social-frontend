// Định nghĩa các loại Reaction (Bạn có thể điều chỉnh dựa theo Enum thực tế ở Backend)
export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY' | string;

export interface ReactionRequest {
  postId: string;
  type: ReactionType;
}

export interface ReactionCount {
  type: ReactionType;
  count: number;
}

export interface ReactionDetailResponse {
  userId: string;
  displayName: string;
  avatarUrl: string;
  type: ReactionType;
}

export interface ReactionStatsResponse {
  totalReactions: number;
  counts: ReactionCount[];
}

// Params cho API getReactionDetails
export interface GetReactionDetailsParams {
  type?: ReactionType;
  page?: number;
  size?: number;
}