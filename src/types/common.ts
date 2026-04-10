
// Các type dùng chung cho UI

// Variant màu (dùng với Tailwind)
export type ColorType =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

// Size chuẩn cho UI component
export type SizeType = "sm" | "md" | "lg";

// Props cơ bản cho icon
export interface IconProps {
  size?: number;
  className?: string;
}

// Props cơ bản cho component
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Trạng thái loading chung
export interface LoadingState {
  isLoading: boolean;
}

// Trạng thái lỗi chung
export interface ErrorState {
  error: string | null;
}

// Trạng thái async tổng hợp
export interface AsyncState<T = unknown> extends LoadingState, ErrorState {
  data: T | null;
}

// Helper khởi tạo state async
export function createInitialAsyncState<T>(): AsyncState<T> {
  return {
    data: null,
    isLoading: false,
    error: null,
  };
}