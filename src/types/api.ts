//  history-social-frontend\src\types\api.ts
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


// Request Parameters (Khớp với Spring Boot Pageable)
export interface PaginationParams {
  page?: number; // Spring Boot Pageable mặc định trang đầu tiên là 0
  size?: number;
  sort?: string; 
}
