// components/layout/ThemeToggle.tsx
// ============================================================
// Theme toggle button dùng next-themes
// ============================================================

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Tránh hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-lg animate-pulse"
        style={{ backgroundColor: "var(--surface-raised)" }}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        flex items-center justify-center
        w-9 h-9
        rounded-lg
        transition-colors duration-150
      "
      style={{
        color: "var(--foreground-muted)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "var(--surface-raised)";
        (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "";
        (e.currentTarget as HTMLElement).style.color = "var(--foreground-muted)";
      }}
      aria-label={isDark ? "Chuyển sang light mode" : "Chuyển sang dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        // Sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

// ============================================================
// components/layout/SidebarNavItem.tsx
// Reusable nav item cho sidebar
// ============================================================

// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
//
// interface SidebarNavItemProps {
//   href: string;
//   icon: React.ComponentType<{ size?: number }>;
//   label: string;
//   badge?: number;
// }
//
// export function SidebarNavItem({ href, icon: Icon, label, badge }: SidebarNavItemProps) {
//   const pathname = usePathname();
//   const isActive = pathname === href || pathname.startsWith(href + "/");
//
//   return (
//     <Link
//       href={href}
//       className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
//       style={{
//         backgroundColor: isActive ? "var(--sidebar-item-active)" : undefined,
//         color: isActive ? "var(--primary)" : "var(--foreground-muted)",
//       }}
//       onMouseEnter={(e) => {
//         if (!isActive) {
//           e.currentTarget.style.backgroundColor = "var(--sidebar-item-hover)";
//           e.currentTarget.style.color = "var(--foreground)";
//         }
//       }}
//       onMouseLeave={(e) => {
//         if (!isActive) {
//           e.currentTarget.style.backgroundColor = "";
//           e.currentTarget.style.color = "var(--foreground-muted)";
//         }
//       }}
//     >
//       <Icon size={18} aria-hidden="true" />
//       <span>{label}</span>
//       {badge && badge > 0 && (
//         <span
//           className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
//           style={{
//             backgroundColor: "var(--primary)",
//             color: "var(--primary-fg)",
//           }}
//         >
//           {badge > 99 ? "99+" : badge}
//         </span>
//       )}
//     </Link>
//   );
// }