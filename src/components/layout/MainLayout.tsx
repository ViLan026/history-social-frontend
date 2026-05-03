"use client";

import { useState, useEffect, useCallback } from "react";
import SidebarDrawer from "./SidebarDrawer";

interface MainLayoutProps {
  leftSidebar: React.ReactNode;
  rightSidebar?: React.ReactNode;
  children: React.ReactNode; // Feed
}


export default function MainLayout({
  leftSidebar,
  rightSidebar,
  children,
}: MainLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Đóng drawer khi resize lên desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Đóng drawer khi nhấn Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen]);

  // Lock body scroll khi drawer mở
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <>
      <div className="min-h-dvh" style={{ background: "var(--background)" }}>
        <div
          className="mx-auto w-full max-w-[1400px] px-0 lg:px-4 xl:px-6
          "
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr_300px] gap-0 items-start
            "
          >
            <aside
              className="hidden lg:block lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:no-scrollbar border-r "
              style={{ borderColor: "var(--sidebar-border)" }}
              aria-label="Left sidebar"
            >
              {leftSidebar}
            </aside>
            <main
              className="w-full min-w-0 mx-auto"
              aria-label="Main feed"
            >
              {/* Feed width container — centered trong main column */}
              <div
                className="mx-auto w-full max-w-[680px] xl:max-w-[680px] min-h-dvh border-x "
                style={{ borderColor: "var(--border-muted)" }}
              >
                {/* Hamburger button — chỉ hiện mobile/tablet */}
                <div className="lg:hidden">
                  <MobileMenuButton onClick={openDrawer} />
                </div>

                {/* Feed content */}
                {children}
                <div className="lg:hidden">
                  <MobileMenuButton onClick={openDrawer} />
                </div>
              </div>
            </main>
            {rightSidebar && (
              <aside
                className="hidden xl:block xl:sticky xl:top-4 xl:max-h-[calc(100dvh-2rem)] xl:overflow-y-auto xl:no-scrollbar xl:pb-4"
                aria-label="Right sidebar"
              >
                {rightSidebar}
              </aside>
            )}
          </div>
        </div>
      </div>

      <SidebarDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {leftSidebar}
      </SidebarDrawer>
    </>
  );
}

interface MobileMenuButtonProps {
  onClick: () => void;
}

function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <div
      className="flex items-center px-4 py-3 border-b"
      style={{ borderColor: "var(--border-muted)" }}
    >
      <button
        onClick={onClick}
        className="flex items-center gap-2 p-2 -ml-2 rounded-lg text-sm font-medium transition-colors duration-150"
        style={{ color: "var(--foreground-muted)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "var(--surface-raised)";
          (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "";
          (e.currentTarget as HTMLElement).style.color =
            "var(--foreground-muted)";
        }}
        aria-label="Mở menu"
        aria-expanded="false"
      >
        {/* Hamburger icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span className="sm:hidden">Menu</span>
      </button>
    </div>
  );
}