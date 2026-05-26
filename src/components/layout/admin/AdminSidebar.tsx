// components/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Tooltip from "@radix-ui/react-tooltip";


function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function PostsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <path d="M3.3 7a10 10 0 1 0 4.5-3.4" />
    </svg>
  );
}


const ADMIN_NAV_ITEMS = [
  { label: "Tổng quan", href: "/admin/dashboard", icon: <DashboardIcon /> },
  { label: "Quản lý Báo cáo", href: "/admin/reports", icon: <ReportsIcon /> },
  { label: "Quản lý Bài viết", href: "/admin/posts", icon: <PostsIcon /> },
  { label: "Quản lý Người dùng", href: "/admin/users", icon: <UsersIcon /> },
  { label: "Ngày này năm xưa", href: "/admin/on-this-day", icon: <HistoryIcon /> },
] as const;

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <li>
          <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`
              group flex items-center justify-center lg:justify-start gap-3
              px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }
            `}
          >
            {/* Icon Box */}
            <span
              className={`shrink-0 transition-colors duration-150 ${
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {icon}
            </span>

            {/* Label - Ẩn trên tablet, hiện trên màn hình lớn (lg) */}
            <span className="hidden lg:block overflow-hidden text-ellipsis whitespace-nowrap">
              {label}
            </span>

            {/* Active Indicator cho màn hình lớn */}
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground/80 hidden lg:block" />
            )}
          </Link>
        </li>
      </Tooltip.Trigger>

      {/* Tooltip khi Sidebar co nhỏ lại ở chế độ tablet */}
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={10}
          className="hidden md:block lg:hidden px-3 py-1.5 text-xs font-semibold bg-popover text-popover-foreground border border-border rounded-md shadow-md z-50 animate-in fade-in-50 duration-100"
        >
          {label}
          <Tooltip.Arrow className="fill-border" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}


export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Tooltip.Provider delayDuration={100}>
      <nav
        className="w-full h-full flex flex-col gap-4 bg-card px-2 py-4 border-r border-border"
        aria-label="Admin Navigation"
      >
        {/* Phần Header nhỏ của Sidebar trên Desktop */}
        <div className="hidden lg:flex px-3 py-2 flex-col gap-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
            Hệ thống quản trị
          </p>
        </div>

        {/* Danh sách Menu */}
        <ul className="flex flex-row md:flex-col justify-around md:justify-start gap-1 w-full" role="list">
          {ADMIN_NAV_ITEMS.map((item) => {
            // Check active chính xác cho hệ thống route /admin
            const isActive = pathname.startsWith(item.href);

            return (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
              />
            );
          })}
        </ul>
      </nav>
    </Tooltip.Provider>
  );
}