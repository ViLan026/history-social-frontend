// src/types/post.ts

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
  FLAGGED = 'FLAGGED',
  REJECTED = 'REJECTED',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT'
}


export interface PostSourceRequest {
  title: string;
  url?: string;
  authorName?: string;
  publishedYear?: number;
}

export interface PostCreationRequest {
  title: string; // @NotBlank, @Size(max = 500)
  content: string; // @NotBlank
  status?: PostStatus; // Mặc định là DRAFT ở backend
  tagNames?: string[]; // Set<String>
  sources?: PostSourceRequest[]; // List<PostSourceRequest>
}

export interface PostUpdateRequest {
  title?: string; // @Size(max = 500)
  content?: string;
  status?: PostStatus;
  tagNames?: string[];
  sources?: PostSourceRequest[];
  removeMediaPublicIds?: string[]; // publicId của các media cần xóa
}

// Responses (Dữ liệu nhận từ Backend)

export interface TagResponse {
  id: string; // UUID
  name: string;
}

export interface PostSourceResponse {
  id: string; // UUID
  title: string;
  url?: string;
  author?: string;
  publishedYear?: number;
}

export interface PostMediaResponse {
  id: string; // UUID
  mediaUrl: string;
  publicId: string;
  mediaType: MediaType;
  displayOrder: number;
}

export interface PostResponse extends PostSummaryResponse {
  mediaList: PostMediaResponse[];
  sources: PostSourceResponse[]; // Set<PostSourceResponse>
  updatedAt: string;
}

export interface PostSummaryResponse {
  postId: string; // UUID
  content: string;
  title: string;
  viewCount: number;
  status: PostStatus;
  tags: TagResponse[]; // Set<TagResponse>
  createdAt: string; // LocalDateTime
}

export interface FeedPostResponse extends PostResponse{
  userId: string;
  displayName: string;
  avatarUrl?: string;
  reactionCount: number;
  commentCount: number;

}
