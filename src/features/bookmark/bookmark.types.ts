export interface BookmarkCountResponse {
  totalBookmarks: number;
}

export interface BookmarkStatusResponse {
  postId: string;
  bookmarked: boolean;
}

export interface BookmarkToggleResponse {
  action: string;
  bookmarked: boolean;
  message: string;
}

export interface BookmarkAuthorInfo {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface BookmarkPostInfo {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string; // ISO String từ LocalDateTime
  updatedAt: string; // ISO String từ LocalDateTime
  author: BookmarkAuthorInfo;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface BookmarkResponse {
  bookmarkId: string;
  bookmarkedAt: string; // ISO String từ LocalDateTime
  post: BookmarkPostInfo;
}