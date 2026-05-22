export interface FollowResponse {
  userId: string; // Mapping với UUID bên Java
  username: string;
  displayName: string;
  avatarUrl: string | null;
  // Bổ sung thuộc tính Client-side để dễ xử lý UI nút bấm
  isFollowing?: boolean; 
}

export interface GetFollowsParams {
  page?: number;
  size?: number;
}

export type FollowTabType = 'suggestions' | 'followers' | 'following';