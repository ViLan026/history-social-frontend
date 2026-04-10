// Metadata cho phân trang
export interface PageMeta {
  page: number;        // Trang hiện tại
  limit: number;       // Số item mỗi trang
  totalItems: number;  // Tổng số item
  totalPages: number;  // Tổng số trang
}

// Response có phân trang
export interface PaginatedResponse<T = unknown> {
  data: T[];
  meta: PageMeta;
}

// Query params khi gọi API phân trang
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Helper để build query string
export function buildPaginationQuery(params?: PaginationParams): string {
  try {
    if (!params) return "";

    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));

    return query.toString();
  } catch {
    return "";
  }
}