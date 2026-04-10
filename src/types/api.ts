
export interface ApiResponse<T> {
  success: boolean;
  code: number; // business code
  message: string;
  errors?: string[];
  data: T;
  timestamp: string; // ISO String từ LocalDateTime
}

export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}