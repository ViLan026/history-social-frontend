// src/types/post.ts

// ----------------------------------------------------------------------
// Enums (Được suy luận từ cấu trúc backend)
// ----------------------------------------------------------------------

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

// Requests (Dữ liệu gửi lên Backend)
export interface PostSourceRequest {
  title: string;
  url?: string;
  author?: string;
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

export interface PostResponse {
  id: string; // UUID
  title: string;
  content: string;
  authorId: string; // UUID
  status: PostStatus;
  viewCount: number;
  mediaList: PostMediaResponse[];
  sources: PostSourceResponse[]; // Set<PostSourceResponse>
  tags: TagResponse[]; // Set<TagResponse>
  createdAt: string; // LocalDateTime thường được parse thành ISO string (YYYY-MM-DDTHH:mm:ss)
  updatedAt: string;
}

export interface PostSummaryResponse {
  id: string; // UUID
  title: string;
  authorId: string; // UUID
  status: PostStatus;
  viewCount: number;
  thumbnailUrl?: string; // URL ảnh đại diện (media đầu tiên)
  tags: TagResponse[]; // Set<TagResponse>
  createdAt: string; // LocalDateTime
}

// Params (Hỗ trợ phân trang / Tìm kiếm)
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}