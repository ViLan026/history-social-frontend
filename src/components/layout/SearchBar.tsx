"use client";

import { useCallback, useRef, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
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

      <div className="relative w-full flex items-center bg-surface border border-border rounded-full transition-all duration-200 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring/30 focus-within:bg-surface-raised">
        {/* Search icon */}
        <span
          className="absolute left-3.5 pointer-events-none text-foreground-faint text-[18px] leading-none"
          aria-hidden="true"
        >
          {/* Simple inline SVG */}
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
          className="w-full bg-transparent pl-9 pr-10 py-2 text-sm text-foreground placeholder:text-foreground-faint border-none outline-none [&::-webkit-search-cancel-button]:hidden"
        />

        {/* Enter hint / clear button */}
        {query.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-0.5 text-foreground-faint hover:text-foreground transition-colors duration-150"
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