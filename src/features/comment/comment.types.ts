export interface CommentRequest {
  postId: string;
  content: string;
}

export interface CommentResponse {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string; // ISO String từ LocalDateTime
  updatedAt: string; // ISO String từ LocalDateTime
}