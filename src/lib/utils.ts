import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Kết hợp className (Tailwind-safe)
 * - Gộp class trùng nhau
 * - Ưu tiên class phía sau
 */
export function cn(...inputs: ClassValue[]): string {
  try {
    return twMerge(clsx(inputs));
  } catch {
    return "";
  }
}

/**
 * Format thời gian (relative: "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  try {
    const target = new Date(date);
    const now = new Date();

    const diff = (now.getTime() - target.getTime()) / 1000; // seconds

    if (isNaN(diff)) return "";

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return formatDate(target);
  } catch {
    return "";
  }
}


export function formatRelativeTimeVi(date: Date | string | number): string {
  try {
    const target = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - target.getTime()) / 1000; // seconds
 
    if (isNaN(diff)) return "";
 
    if (diff < 45) return "vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`; // < 30 days
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} tháng trước`;
 
    return formatDate(target, "vi-VN");
  } catch {
    return "";
  }
}
 

/**
 * Format ngày giờ đầy đủ (Intl)
 */
export function formatDate(
  date: Date | string | number,
  locale: string = "vi-VN"
): string {
  try {
    const d = new Date(date);

    if (isNaN(d.getTime())) return "";

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

/**
 * Format số lượng (1000 -> 1K, 1_000_000 -> 1M)
 */
export function formatNumber(value: number): string {
  try {
    if (typeof value !== "number" || isNaN(value)) return "0";

    if (value < 1000) return value.toString();

    if (value < 1_000_000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
    }

    if (value < 1_000_000_000) {
      return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
    }

    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } catch {
    return "0";
  }
}

/**
 * Truncate text (giới hạn ký tự)
 */
export function truncate(text: string, maxLength: number): string {
  try {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    return text.slice(0, maxLength) + "...";
  } catch {
    return "";
  }
}

/**
 * Sleep utility (dùng cho retry / delay)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}