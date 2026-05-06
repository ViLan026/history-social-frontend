// ================= FILE: components/sidebar/LeftSidebar.tsx =================
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Trang chủ",
    href: "/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Xu hướng",
    href: "/trending",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    label: "Sách",
    href: "/book-reviews",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    label: "Đang theo dõi",
    href: "/following",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Đã lưu",
    href: "/bookmarks",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
] as const;

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`
          group relative flex items-center gap-3
          px-3 py-2.5 rounded-lg
          text-sm font-medium
          transition-all duration-150 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-foreground-muted hover:text-foreground hover:bg-surface-raised"
          }
        `}
      >
        {/* Active left indicator */}
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-primary" />
        )}

        {/* Icon */}
        <span
          className={`
            shrink-0 transition-colors duration-150
            ${
              isActive
                ? "text-primary"
                : "text-foreground-faint group-hover:text-foreground-muted"
            }
          `}
        >
          {icon}
        </span>

        {/* Label */}
        <span className="truncate">{label}</span>

        {/* Subtle dot indicator */}
        {isActive && (
          <span
            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0"
            aria-hidden="true"
          />
        )}
      </Link>
    </li>
  );
}

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      className="
        h-full px-3 py-4 flex flex-col gap-6
        bg-sidebar-bg border-r border-border-muted
      "
      aria-label="Navigation chính"
    >
      <ul
        className="
          neu-raised
          flex flex-col gap-1
          p-3 rounded-xl
          bg-surface border border-border
          animate-fade-in
        "
        role="list"
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </ul>
    </nav>
  );
}