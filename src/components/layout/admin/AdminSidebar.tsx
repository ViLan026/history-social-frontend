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

function NotificationIcon(){
  return (                        
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /> <path d="M13.73 21a2 2 0 0 1-3.46 0" /> </svg>)
}


const ADMIN_NAV_ITEMS = [
  { label: "Tổng quan", href: "/admin/dashboard", icon: <DashboardIcon /> },
  { label: "Quản lý Báo cáo", href: "/admin/reports", icon: <ReportsIcon /> },
  { label: "Quản lý Bài viết", href: "/admin/posts", icon: <PostsIcon /> },
  { label: "Quản lý Người dùng", href: "/admin/users", icon: <UsersIcon /> },
  { label: "Ngày này năm xưa", href: "/admin/on-this-day", icon: <HistoryIcon /> },
  { label: "Thông báo", href: "/admin/notifications", icon: <NotificationIcon /> },
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
              group relative flex items-center justify-center lg:justify-start gap-3
              px-3 py-2.5 rounded-lg
              text-sm font-medium
              transition-all duration-150 ease-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              text-foreground
              hover:bg-[#7f0716]
              hover:text-[#ffffff]
              hover:text-primary-fg
              active:bg-[#5f0510]
              active:text-[#ffffff]
            `}
          >
            <span
              className={`
                shrink-0 transition-colors duration-150
                ${isActive
                  ? "text-primary  mx-3"
                  : "text-foreground group-hover:text-primary-fg"}
              `}
            >
              {icon}
            </span>

            <span className="hidden lg:block">{label}</span>

            {/* Active dot */}
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-fg/70 hidden lg:block" />
            )}
          </Link>
        </li>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={8}
          // Sử dụng lg:hidden để ẩn tooltip đi khi label đã được hiển thị trên màn hình lớn
          className="hidden md:block lg:hidden px-3 py-2 text-sm font-medium bg-surface border border-border rounded-lg shadow-lg z-50 bg-white text-black dark:bg-gray-800 dark:text-white"
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
        className="w-[90%] sticky top-10 flex flex-col gap-6 bg-sidebar-bg"
        aria-label="Admin Navigation"
      >
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