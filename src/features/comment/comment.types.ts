// export interface CommentRequest {
//   postId: string;
//   content: string;
// }


export interface CommentRequest {
  postId: string;
  content: string;
  parentId?: string;
}

export interface CommentResponse {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string; 
  parentId?: string; 
  content: string;
  createdAt: string;  
  updatedAt: string; 
  isVisible: boolean;
  hiddenReason?: string;

}