export interface CommentRequest {
  postId: string;
  content: string;
}

export interface CommentResponse {
  id: string;
  postId: string;
  authorId: string;
  parentId?: string; // Thêm parentId để hỗ trợ comment reply trong tương lai
  content: string;
  createdAt: string; // ISO String từ LocalDateTime
  updatedAt: string; // ISO String từ LocalDateTime
}