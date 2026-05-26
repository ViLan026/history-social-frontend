"use client"; // Chuyển sang Client Component để xử lý logic ẩn hiện menu khi cuộn chuột giống MainLayout

import { Suspense, useState, useEffect } from "react";
import ProfileInfo from "@/features/user/components/ProfileInfo";
import ProfileTabs from "@/components/layout/ProfileTabs";
import PostList from "@/features/post/components/PostList";
import Navigation from "@/components/layout/Navigation";
import BookmarkList from "@/features/bookmark/components/BookmarkList";
import ReportList from "@/features/report/components/RepostList";

export type ProfileTab = "posts" | "bookmarks" | "reposts";

interface ProfilePageProps {
    searchParams: Promise<{
        tab?: string;
    }>;
}

export default function ProfilePage({ searchParams }: ProfilePageProps) {
    // 1. Unpack searchParams trong Client Component
    const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

    useEffect(() => {
        searchParams.then((params) => {
            if (params.tab === "bookmarks" || params.tab === "reposts") {
                setActiveTab(params.tab);
            } else {
                setActiveTab("posts");
            }
        });
    }, [searchParams]);

    // 2. Logic ẩn/hiện Mobile Menu sao chép chính xác từ MainLayout
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
                        <div>
                            <Navigation />
                        </div>
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
                            <div className="w-full space-y-4">
                                <ProfileInfo />
                                
                                <div className="sticky top-14 z-20 bg-surface-raised">
                                    <ProfileTabs />
                                </div>

                                <Suspense fallback={<ContentSkeleton />}>
                                    <ProfileContent activeTab={activeTab} />
                                </Suspense>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

interface ProfileContentProps {
    activeTab: ProfileTab;
}

function ProfileContent({ activeTab }: ProfileContentProps) {
    return (
        <div className="w-full mx-auto">
            {activeTab === "posts" && (
                <div>
                    <PostList />
                </div>
            )}
            {activeTab === "bookmarks" && (
                <div className="p-4 text-foreground/70"><BookmarkList /></div>
            )}
            {activeTab === "reposts" && (
                <div className="p-4 text-foreground/70"><ReportList /></div>
            )}
        </div>
    );
}
function ContentSkeleton() {
    return (
        <div className="w-full space-y-4 pointer-events-none select-none">
            {[1, 2, 3].map((i) => (
                <div
                    key={`skeleton-item-${i}`} // Đặt key tường minh để React giải phóng DOM sạch sẽ
                    className="bg-surface border border-border rounded-2xl p-6 space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}
