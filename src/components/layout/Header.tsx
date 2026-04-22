'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useTheme } from '@/contexts/ThemeContext';

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Brand wordmark — left section */
function BrandLogo() {
  return (
    <Link
      href="/"
      className="group flex items-center shrink-0 select-none"
      aria-label="Trang chủ Mạng xã hội Lịch Sử"
    >
      <div className="text-2xl font-headline tracking-widest text-white uppercase transition-transform group-hover:scale-105 duration-300">
        HISTORY
      </div>
    </Link>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && query.trim()) {
        onSearch(query.trim());
        inputRef.current?.blur();
      }
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
      }
    },
    [query, onSearch],
  );

  return (
    <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
      <div className="neu-inset w-full flex items-center px-4 py-2 rounded-full focus-within:ring-2 focus-within:ring-white/20 transition-all duration-300">
        <span className="material-symbols-outlined text-slate-300 mr-2 pointer-events-none">
          search
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm sự kiện..."
          autoComplete="off"
          spellCheck={false}
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-slate-300 text-white outline-none [&::-webkit-search-cancel-button]:hidden"
          aria-label="Tìm kiếm sự kiện lịch sử"
        />

        {/* Subtle right hint on focus */}
        {query.length > 0 && (
          <kbd className="hidden sm:inline-flex items-center text-[10px] text-slate-300 px-1.5 py-0.5 rounded border border-white/20 bg-white/5 font-mono tracking-wide pointer-events-none absolute right-4">
            ↵
          </kbd>
        )}
      </div>
    </div>
  );
}

// ─── Icon Button ──────────────────────────────────────────────────────────────

interface IconButtonProps {
  onClick: () => void;
  label: string;
  icon: string;
  badge?: number;
}

function IconButton({ onClick, label, icon, badge }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative flex items-center justify-center hover:bg-[#123756] transition-all duration-300 p-2 rounded-full text-white"
    >
      <span className="material-symbols-outlined">{icon}</span>
      {badge != null && badge > 0 && (
        <span className="absolute top-0 right-0 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] font-bold text-white bg-red-500 rounded-full shadow-sm pointer-events-none">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
}

// ─── Auth Area ────────────────────────────────────────────────────────────────

interface AuthAreaProps {
  isAuthenticated: boolean;
  user: { profile?: { displayName?: string; avatarUrl?: string }; email?: string } | null;
}

function AuthArea({ isAuthenticated, user }: AuthAreaProps) {
  const displayName = user?.profile?.displayName ?? user?.email ?? 'User';
  const avatarUrl   = user?.profile?.avatarUrl;
  const fallback    = displayName.charAt(0).toUpperCase();

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full font-headline font-bold text-white neu hover:bg-[#123756] transition-all duration-300 active:scale-95"
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
      className="w-10 h-10 rounded-full neu overflow-hidden border-2 border-white/20 shrink-0 hover:scale-105 active:scale-95 transition-transform duration-300 relative"
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={displayName}
          fill
          sizes="40px"
          className="object-cover"
        />
      ) : (
        <span className="w-full h-full flex items-center justify-center text-lg font-headline font-bold text-white bg-tertiary-container select-none">
          {fallback}
        </span>
      )}
    </Link>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const router = useRouter();
  // Giả định bạn có store này, nếu chưa cứ để mặc định
  const { isAuthenticated, user } = useAuthStore();
  const { theme, toggleTheme }    = useTheme();

  // Notification count — replace with real data from React Query as needed
  const notificationCount = 2;

  const handleSearch = useCallback(
    (query: string) => {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    },
    [router],
  );

  // Memoise the right-section to avoid re-renders from search state
  const rightSection = useMemo(
    () => (
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Theme toggle */}
        <IconButton
          onClick={toggleTheme}
          label={theme === 'dark' ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
          icon={theme === 'dark' ? 'light_mode' : 'dark_mode'}
        />

        {/* Notifications */}
        <IconButton
          onClick={() => router.push('/notifications')}
          label="Thông báo"
          icon="notifications"
          badge={notificationCount}
        />
        
        {/* Bookmarks */}
        <IconButton
          onClick={() => router.push('/bookmarks')}
          label="Lưu trữ"
          icon="bookmarks"
        />

        {/* Auth */}
        {/* <AuthArea isAuthenticated={isAuthenticated} user={user} /> */}
      </div>
    ),
    [isAuthenticated, user, theme, toggleTheme, router, notificationCount],
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#4f6f91] dark:bg-[#001427] flex justify-between items-center px-4 md:px-8 py-4 shadow-[8px_8px_16px_#3f5f80,-8px_-8px_16px_#5f89b5] transition-colors duration-300">
      {/*
       * Three-region layout: brand | search | actions
       * On mobile: brand stretches, search hidden, icons show
       */}
      <BrandLogo />

      <SearchBar onSearch={handleSearch} />

      {rightSection}
    </nav>
  );
}