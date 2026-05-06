// components/layout/MainLayout.tsx
"use client";

import { useState, useEffect } from "react";
import SidebarDrawer from "../ui/SidebarDrawer";

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
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  // Responsive đóng drawer tự động
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsLeftDrawerOpen(false); // lg
      if (window.innerWidth >= 1280) setIsRightDrawerOpen(false); // xl
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isLeftDrawerOpen || isRightDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isLeftDrawerOpen, isRightDrawerOpen]);

  return (
    <>
      <div className="min-h-dvh bg-background">
        <div className="mx-auto w-full max-w-[1280px] px-0 md:px-4 lg:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 ">
            
            {/* 1. LEFT SIDEBAR */}
            <aside
              className="hidden lg:block lg:col-span-3 sticky top-[60px] h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar py-4"
              aria-label="Left sidebar"
            >
              {leftSidebar}
            </aside>

            {/* 2. MAIN FEED */}
            <main
              className="col-span-1 lg:col-span-9 xl:col-span-6 w-full min-h-dvh  py-2 "
              aria-label="Main feed"
            >
              {/*  Chỉ ẩn hẳn Header này khi lên màn hình xl (đủ 3 cột) */}
              <div className="xl:hidden flex items-center border-b border-[var(--border-muted)] px-2 bg-surface min-h-[3.5rem]">
                
                {/* Nút Left Menu: Chỉ hiện dưới màn lg (<1024px) */}
                <div className="lg:hidden">
                  <MobileMenuButton onClick={() => setIsLeftDrawerOpen(true)} label="Menu" />
                </div>

                {/* Nút Right Menu: Dùng ml-auto để luôn bám sang góc phải */}
                <div className="ml-auto">
                  {rightSidebar && (
                    <MobileMenuButton onClick={() => setIsRightDrawerOpen(true)} label="Khám phá" isRight />
                  )}
                </div>
                
              </div>

              {/* Khu vực chứa bài viết */}
              <div className="p-0 sm:p-4   border-x border-[var(--border-muted)]        
">
                {children}
              </div>
            </main>

            {/* 3. RIGHT SIDEBAR */}
            {rightSidebar && (
              <aside
                className="hidden xl:block xl:col-span-3 py-4 "
                aria-label="Right sidebar"
              >
                {rightSidebar}
              </aside>
            )}

          </div>
        </div>
      </div>

      {/* Drawer Trái */}
      <SidebarDrawer
        isOpen={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)}
        side="left"
        title="Menu chính"
      >
        {leftSidebar}
      </SidebarDrawer>

      {/* Drawer Phải */}
      {rightSidebar && (
        <SidebarDrawer
          isOpen={isRightDrawerOpen}
          onClose={() => setIsRightDrawerOpen(false)}
          side="right"
          title="Khám phá"
        >
          {rightSidebar}
        </SidebarDrawer>
      )}
    </>
  );
}

// Giữ nguyên MobileMenuButton
interface MobileMenuButtonProps {
  onClick: () => void;
  label: string;
  isRight?: boolean;
}

function MobileMenuButton({ onClick, label, isRight }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-3 text-sm font-medium transition-colors text-[var(--foreground-muted)] hover:text-foreground hover:bg-[var(--surface-raised)] rounded-lg ${isRight ? 'flex-row-reverse' : ''}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isRight ? (
          <>
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="12" x2="9" y2="12" />
            <line x1="21" y1="18" x2="7" y2="18" />
          </>
        ) : (
          <>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </>
        )}
      </svg>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}