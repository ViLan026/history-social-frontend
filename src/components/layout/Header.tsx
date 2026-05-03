// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/auth.store";

// ─── Brand Logo ───────────────────────────────────────────────────────────────

function BrandLogo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 shrink-0 select-none"
      aria-label="Trang chủ Historia">
      <span
        className="text-primary text-lg leading-none opacity-80 group-hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      > ⌖ </span>

      <span className="font-heading font-semibold text-xl tracking-[0.12em] uppercase text-foreground group-hover:text-primary transition-colors duration-200" >
        Historia
      </span>
    </Link>
  );
}


interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && query.trim()) {
        onSearch(query.trim());
        inputRef.current?.blur();
      }
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    },
    [query, onSearch]
  );

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-6 lg:mx-10">
      <label className="sr-only" htmlFor="header-search">
        Tìm kiếm sự kiện lịch sử
      </label>

      <div
        className="relative w-full flex items-center bg-surface border border-border rounded-full transition-all duration-200 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring/30 focus-within:bg-surface-raised"
      >
        {/* Search icon */}
        <span
          className=" absolute left-3.5 pointer-events-none text-foreground-faint text-[18px] leading-none" aria-hidden="true"
        >
          {/* Simple inline SVG — không phụ thuộc Material Symbols */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          id="header-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm sự kiện, thời kỳ..."
          autoComplete="off"
          spellCheck={false}
          className="
            w-full bg-transparent
            pl-9 pr-10 py-2
            text-sm text-foreground
            placeholder:text-foreground-faint
            border-none outline-none
            [&::-webkit-search-cancel-button]:hidden
          "
        />

        {/* Enter hint / clear button */}
        {query.length > 0 && (
          <button
            onClick={handleClear}
            className="
              absolute right-3 p-0.5
              text-foreground-faint hover:text-foreground
              transition-colors duration-150
            "
            aria-label="Xóa tìm kiếm"
            tabIndex={-1}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Icon Button ──────────────────────────────────────────────────────────────

interface IconButtonProps {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

function IconButton({ onClick, label, icon, badge }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="
        relative flex items-center justify-center
        w-9 h-9 rounded-full
        text-foreground-muted
        hover:text-foreground hover:bg-surface-raised
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        transition-colors duration-150
      "
    >
      {icon}

      {badge != null && badge > 0 && (
        <span
          className="
            absolute -top-0.5 -right-0.5
            min-w-[16px] h-[16px]
            flex items-center justify-center
            text-[9px] font-bold leading-none
            bg-destructive text-destructive-fg
            rounded-full px-0.5
            pointer-events-none
          "
          aria-label={`${badge} thông báo chưa đọc`}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      onClick={() => setTheme(isDark ? "light" : "dark")}
      label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      icon={
        isDark ? (
          // Sun
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          // Moon
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )
      }
    />
  );
}

// ─── Auth Area ────────────────────────────────────────────────────────────────

interface AuthAreaProps {
  isAuthenticated: boolean;
  user: {
    profile?: { displayName?: string; avatarUrl?: string };
    email?: string;
  } | null;
}

function AuthArea({ isAuthenticated, user }: AuthAreaProps) {
  const displayName = user?.profile?.displayName ?? user?.email ?? "User";
  const avatarUrl = user?.profile?.avatarUrl;
  const initial = displayName.charAt(0).toUpperCase();

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="
          hidden sm:inline-flex items-center justify-center
          h-9 px-5 rounded-full
          text-sm font-medium font-heading tracking-wide
          text-primary border border-primary/40
          hover:bg-primary-subtle hover:border-primary/70
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          transition-all duration-150
        "
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <Link
      href="/profile"
      aria-label={`Trang cá nhân của ${displayName}`}
      title={displayName}
      className="
        relative w-9 h-9 rounded-full shrink-0 overflow-hidden
        border border-border hover:border-primary/50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        transition-all duration-150
      "
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={displayName}
          fill
          sizes="36px"
          className="object-cover"
        />
      ) : (
        <span
          className="
            w-full h-full flex items-center justify-center
            bg-primary-subtle text-primary
            text-sm font-heading font-semibold
            select-none
          "
        >
          {initial}
        </span>
      )}
    </Link>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  // Notification count — thay bằng real data sau
  const notificationCount = 2;

  const handleSearch = useCallback(
    (query: string) => {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    },
    [router]
  );

  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        flex items-center justify-between
        px-4 md:px-6 lg:px-8
        h-14
        bg-surface/90 backdrop-blur-md
        border-b border-border-muted
      "
      role="banner"
    >
      {/* ── Left: Brand ── */}
      <BrandLogo />

      {/* ── Center: Search ── */}
      <SearchBar onSearch={handleSearch} />

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggleButton />

        <IconButton
          onClick={() => router.push("/notifications")}
          label="Thông báo"
          badge={notificationCount}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        />

        {/* <IconButton
          onClick={() => router.push("/bookmarks")}
          label="Lưu trữ"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          }
        /> */}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-border-muted mx-1" aria-hidden="true" />

        <AuthArea isAuthenticated={isAuthenticated} user={user} />
      </div>
    </header>
  );
}