// components/layout/SidebarDrawer.tsx
// ============================================================
// Mobile/Tablet Sidebar Drawer
// 
// Dùng cho mobile + tablet (<1024px)
// Pattern: Overlay + Sheet từ trái slide vào
// Không dùng lib ngoài — tự build đơn giản
// ============================================================

"use client";

import { useEffect, useRef } from "react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SidebarDrawer({
  isOpen,
  onClose,
  children,
}: SidebarDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap — accessibility
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    /*
      Portal-like: render fixed, z-50 để overlay lên toàn bộ layout
      Không cần ReactDOM.createPortal vì Next.js App Router handle tốt
    */
    <div
      className="fixed inset-0 z-50 lg:hidden"
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
    >
      {/* Backdrop — click để đóng */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ backgroundColor: "oklch(0 0 0 / 0.6)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-[280px]
          max-w-[85vw]
          overflow-y-auto
          animate-slide-left
          focus:outline-none
          shadow-2xl
        "
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        {/* Header drawer với nút đóng */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b"
          style={{
            backgroundColor: "var(--sidebar-bg)",
            borderColor: "var(--sidebar-border)",
          }}
        >
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: "var(--foreground-muted)" }}
          >
            Menu
          </span>

          <button
            onClick={onClose}
            className="
              p-1.5
              rounded-md
              transition-colors duration-150
            "
            style={{ color: "var(--foreground-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--surface-raised)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "";
              (e.currentTarget as HTMLElement).style.color =
                "var(--foreground-muted)";
            }}
            aria-label="Đóng menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sidebar content */}
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
}