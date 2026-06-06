"use client";

import { useState, useEffect } from "react";

interface AdminMainLayoutProps {
    leftSidebar: React.ReactNode;
    children: React.ReactNode;
    isSidebarOpen?: boolean;
}

export default function AdminMainLayout({
    leftSidebar,
    children
}: AdminMainLayoutProps) {
    const [showMobileMenu, setShowMobileMenu] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const diff = currentScrollY - lastScrollY;

                    // Luôn hiển thị khi ở top
                    if (currentScrollY < 20) {
                        setShowMobileMenu(true);
                    }
                    // Ẩn khi scroll lên (diff > 0)
                    else if (diff > 5) {
                        setShowMobileMenu(false);
                    }
                    // Hiện khi scroll xuống (diff < 0)
                    else if (diff < -5) {
                        setShowMobileMenu(true);
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const shouldDisplayMobileMenu = showMobileMenu;

    return (
        <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex md:px-10 w-full relative">
                <aside
                    className="hidden lg:block fixed top-14 left-auto w-[270px] h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar  border-r border-border-muted/10 z-30"
                    aria-label="Navigation"
                >
                    <div className="p-6 pr-0 pb-20">{leftSidebar}</div>
                </aside>

                <aside
                    className="hidden md:block lg:hidden fixed top-14 left-auto w-[110px] h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar  border-r border-border-muted/10 z-30"
                    aria-label="Compact Navigation"
                >
                    <div className="p-4">{leftSidebar}</div>
                </aside>

                <main
                    className="flex-1 pt-6 md:pt-8 min-w-0 w-full bg-background md:ml-[110px] lg:ml-[270px]"
                    aria-label="Admin Main Content"
                >
                    <div
                        className={` md:hidden fixed top-14 left-0 right-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-sm px-1 md:px-1 h-12 transition-all duration-300 ease-in-out ${
                    shouldDisplayMobileMenu ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"} `}
                    >
                        {leftSidebar}
                    </div>

                    {/* Vùng đệm nội dung */}
                    <div className="pt-8 md:pt-0">{children}</div>
                </main>
            </div>
        </div>
    );
}
