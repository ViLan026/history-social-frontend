// components/layout/MainLayout.tsx
"use client";

import { useState, useEffect } from "react";

interface MainLayoutProps {
    leftSidebar: React.ReactNode;
    rightSidebar?: React.ReactNode;
    children: React.ReactNode;
    isDetailOpen?: boolean;
}

export default function MainLayout({
    leftSidebar,
    rightSidebar,
    children,
    isDetailOpen = false
}: MainLayoutProps) {
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

    useEffect(() => {
        if (isDetailOpen) {
            setShowMobileMenu(false);
        }
    }, [isDetailOpen]);

    return (
        <>
            <div className="min-h-dvh bg-background">
                <div className="mx-auto w-full max-w-[1280px]">
                    <div className="grid md:mx-10 md:grid-cols-[100px_1fr] lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_minmax(0,700px)_320px] min-h-screen">
                        {/* LEFT SIDEBAR - Full (lg+) */}
                        <aside
                            className="hidden lg:block sticky top-14 h-screen overflow-y-auto no-scrollbar bg-background"
                            aria-label="Navigation"
                        >
                            <div className="p-4 pb-20">{leftSidebar}</div>
                        </aside>

                        <aside
                            className="hidden md:block lg:hidden sticky top-14 h-screen bg-background "
                            aria-label="Compact Navigation"
                        >
                            <div>{leftSidebar}</div>
                        </aside>
                        {/* MAIN FEED */}
                        <main
                            className="w-full min-h-screen flex flex-col bg-background"
                            aria-label="Main feed"
                        >
                            {/* Mobile Menu Bar - Fixed dưới Header */}
                            <div
                                className={`
                                    md:hidden fixed top-14 left-0 right-0 z-40
                                    flex items-center justify-between
                                    bg-background/95 backdrop-blur-sm
                                    px-1 md:px-1 h-12
                                    transition-transform duration-300 ease-in-out
                                    ${showMobileMenu && !isDetailOpen ? "translate-y-0" : "-translate-y-full"}
                                `}
                            >
                                {leftSidebar}
                            </div>

                            {/* Feed Container - Padding top để tránh bị che bởi fixed menu */}
                            <div className="flex-1 w-full flex justify-center px-0 sm:px-3 md:px-2 lg:px-2 pt-10 xl:pt-3 md:pt-2 xl:md:pt-2 pb-3 md:pb-4 lg:pb-6">
                                <div className="w-full max-w-[720px]">
                                    {children}
                                </div>
                            </div>
                        </main>

                        {/* RIGHT SIDEBAR */}
                        {rightSidebar && (
                            <aside
                                className="hidden xl:block sticky top-14 h-screen overflow-y-auto no-scrollbar bg-background"
                                aria-label="Suggestions"
                            >
                                <div className="p-4 pb-20">{rightSidebar}</div>
                            </aside>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
