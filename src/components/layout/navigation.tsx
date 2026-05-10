"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Tooltip from "@radix-ui/react-tooltip";

// 1. Tách các icon thành hàm riêng theo yêu cầu
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
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

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function FollowingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// 2. Sử dụng NAV_ITEMS với các hàm gọi Icon
const NAV_ITEMS = [
  { label: "Trang chủ", href: "/", icon: <HomeIcon /> },
  { label: "Xu hướng", href: "/trending", icon: <TrendingIcon /> },
  { label: "Ngày này năm xưa", href: "/timeline", icon: <HistoryIcon /> },
  { label: "Sách", href: "/book-reviews", icon: <BookIcon /> },
  { label: "Đang theo dõi", href: "/following", icon: <FollowingIcon /> },
  { label: "Đã lưu", href: "/bookmarks", icon: <BookmarkIcon /> },
] as const;

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

// 3. Component NavItem tích hợp cả Tooltip của CompactSidebar và Label
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
              text-foreground-muted
              hover:bg-[#7f0716]
              hover:text-[#ffffff]
              hover:text-primary-fg
              active:bg-[#5f0510]
              active:text-[#ffffff]
            `}
          >
            {/* Icon */}
            <span
              className={`
                shrink-0 transition-colors duration-150
                ${isActive
                  ? "text-primary-fg"
                  : "text-foreground-faint group-hover:text-primary-fg"}
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

// 4. Component chính kết hợp cấu trúc Navigation và Tooltip.Provider
export default function Navigation() {
  const pathname = usePathname();

  return (
    <Tooltip.Provider delayDuration={200}>
      <nav
        className="w-full sticky top-10 flex flex-col gap-6 bg-sidebar-bg"
        aria-label="Navigation chính"
      >
        <ul
          className="flex flex-row md:flex-col justify-around md:justify-start gap-2 w-full md:p-2 p-0 md:gap-4 md:mt-6 rounded-xl bg-card shadow-sm"
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
    </Tooltip.Provider>
  );
}