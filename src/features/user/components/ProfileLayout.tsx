// src/features/user/components/ProfileLayout.tsx

"use client";

import { ReactNode, useEffect, useState } from "react";
import Navigation from "@/components/layout/Navigation";

interface ProfileLayoutProps {
    children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const [showMobileMenu, setShowMobileMenu] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const diff = currentScrollY - lastScrollY;

                    if (currentScrollY < 20) {
                        setShowMobileMenu(true);
                    } else if (diff > 5) {
                        setShowMobileMenu(false);
                    } else if (diff < -5) {
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

    return (
        <div className="min-h-dvh bg-background">
            <div className="mx-auto w-full max-w-[1280px]">
                <div className="grid md:mx-10 md:grid-cols-[100px_1fr] lg:grid-cols-[280px_1fr] min-h-screen">
                    <aside
                        className="hidden lg:block sticky top-14 h-screen overflow-y-auto no-scrollbar bg-background"
                        aria-label="Navigation"
                    >
                        <div className="p-4 pb-20">
                            <Navigation />
                        </div>
                    </aside>

                    <aside
                        className="hidden md:block lg:hidden sticky top-14 h-screen bg-background"
                        aria-label="Compact Navigation"
                    >
                        <Navigation />
                    </aside>

                    <main
                        className="w-full min-h-screen flex flex-col bg-background"
                        aria-label="Profile content"
                    >
                        <div
                            className={`
                                md:hidden fixed top-14 left-0 right-0 z-40
                                flex items-center justify-between
                                px-4 h-12
                                transition-transform duration-300 ease-in-out
                                ${showMobileMenu ? "translate-y-0" : "-translate-y-full"}
                            `}
                        >
                            <Navigation />
                        </div>

                        <div className="flex-1 w-full flex justify-center px-4 pt-16 md:pt-4 pb-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}