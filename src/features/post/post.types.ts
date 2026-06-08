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
  title: string; 
  content: string; 
  status?: PostStatus; 
  tagNames?: string[];
  sources?: PostSourceRequest[]; 
}

export interface PostUpdateRequest {
  title?: string;
  content?: string;
  status?: PostStatus;
  tagNames?: string[];
  sources?: PostSourceRequest[];
  removeMediaPublicIds?: string[]; 
}

// Responses (Dữ liệu nhận từ Backend)

export interface TagResponse {
  id: string; 
  name: string;
}

export interface PostSourceResponse {
  id: string; 
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
  // viewCount: number;
  status: PostStatus;
  tags: TagResponse[]; // Set<TagResponse>
  createdAt: string; // LocalDateTime
}

export interface FeedPostResponse extends PostResponse {
  // Bỏ các trường userId, displayName ở đây vì chúng nằm trong author
  author: {
    userId: string;
    displayName: string;
    avatarUrl?: string;
  };
  reactionCount: number;
  commentCount: number;
  hasFactCheck?: boolean;
} 








export interface FactCheckSummaryResponse {
  supportedCount: number;
  refutedCount: number;
  notEnoughEvidenceCount: number;
}

export interface PostFactCheckClaimResponse {
  id: string;
  claimText: string;
  label: "SUPPORTED" | "REFUTED" | "NOT_ENOUGH_EVIDENCE";
  explanation?: string;
  evidence?: unknown;
  displayOrder: number;
}

export interface AdminPostResponse {
  id: string;
  title: string;
  contentPreview: string;

  authorId: string;
  authorName: string;

  status: PostStatus;

  commentCount: number;
  reactionCount: number;
  bookmarkCount: number;
  reportCount: number;

  factCheckSummary: FactCheckSummaryResponse;

  createdAt: string;
  updatedAt?: string;
}

export interface AdminPostDetailResponse {
  id: string;
  title: string;
  content: string;

  authorId: string;
  authorName: string;

  status: PostStatus;

  commentCount: number;
  reactionCount: number;
  bookmarkCount: number;
  reportCount: number;

  factCheckClaims: PostFactCheckClaimResponse[];
  factCheckSummary: FactCheckSummaryResponse;

  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface AdminUpdatePostStatusRequest {
  status: PostStatus;
}




export interface PostFactCheckPreviewResponse {
  postId: string;
  claims: PostFactCheckClaimPreviewResponse[];
}

export interface PostFactCheckClaimPreviewResponse {
  id: string;
  claimText: string;
  label: "SUPPORTED" | "REFUTED" | "NOT_ENOUGH_EVIDENCE";
  explanation?: string;
  displayOrder: number;
}

export interface PostFactCheckDetailResponse {
  postId: string;
  summary: FactCheckSummaryResponse;
  claims: PostFactCheckClaimResponse[];
}