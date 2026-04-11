
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
  sort?: string; // Ví dụ: "createdAt,desc"
}

export function buildPaginationQuery(params?: PaginationParams): string {
  try {
    if (!params) return "";

    const query = new URLSearchParams();

    if (params.page !== undefined) query.append("page", String(params.page));
    if (params.size !== undefined) query.append("size", String(params.size));
    if (params.sort) query.append("sort", params.sort);

    return query.toString();
  } catch {
    return "";
  }
}