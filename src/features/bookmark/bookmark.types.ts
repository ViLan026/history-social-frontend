// @/features/bookmark/bookmark.types.ts

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

// Ánh xạ từ UserReactionResponse
export interface UserReactionResponse {
  userId: string;
  displayName: string;
  avatarUrl: string;
}

// Ánh xạ từ TagResponse
export interface TagResponse {
  id: string;
  name: string;
}

// Ánh xạ từ PostMediaResponse
export interface PostMediaResponse {
  id: string;
  mediaUrl: string;
  publicId: string;
  mediaType: string; // Thường là 'IMAGE' hoặc 'VIDEO'
  displayOrder: number;
}

// Ánh xạ từ PostSourceResponse
export interface PostSourceResponse {
  id: string;
  title: string;
  url: string;
  authorName: string;
  publishedYear: number;
}

// Ánh xạ từ FeedPostResponse chính thức của hệ thống
export interface FeedPostResponse {
  postId: string;
  title: string;
  content: string;
  reactionCount: number; // Đổi từ Long sang number
  commentCount: number;  // Đổi từ Long sang number
  status: string;        // PostStatus enum
  createdAt: string;     // ISO string từ LocalDateTime
  updatedAt: string;     // ISO string từ LocalDateTime
  author: UserReactionResponse;
  mediaList: PostMediaResponse[];
  sources: PostSourceResponse[];
  tags: TagResponse[];
}

// Ánh xạ từ BookmarkResponse lớn nhất
export interface BookmarkResponse {
  bookmarkId: string;   // UUID từ Backend
  bookmarkedAt: string; // LocalDateTime từ Backend
  post: FeedPostResponse;
}