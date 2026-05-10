// components/layout/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import AuthArea from "../../features/user/components/AuthArea";
import BrandLogo from "../ui/BrandLogo";


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
            className="relative flex items-center justify-center w-9 h-9 rounded-full text-white hover:text-foreground hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-150  "
        >
            {icon}

            {badge != null && badge > 0 && (
                <span
                    className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] font-bold leading-none bg-destructive text-destructive-fg rounded-full px-0.5 pointer-events-none"
                    aria-label={`${badge} thông báo chưa đọc`}
                >
                    {badge > 99 ? "99+" : badge}
                </span>
            )}
        </button>
    );
}

export default function Header() {
    const router = useRouter();

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
            className=" fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 py-2 md:px-6 lg:px-8 h-14  "
            role="banner"
            style={{
                backgroundColor: "var(--primary)",
                // color: "var(--primary-fg)"
                color: "white"
            }}
        >
            <BrandLogo />

            <SearchBar onSearch={handleSearch} />

            <div className="flex items-center gap-1 sm:gap-2">
                <ThemeToggle />

                <IconButton
                    onClick={() => router.push("/notifications")}
                    label="Thông báo"
                    badge={notificationCount}
                    icon={
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    }
                />

                {/* Divider */}
                <span
                    className="hidden sm:block w-px h-5 bg-border-muted mx-1"
                    aria-hidden="true"
                />

                <AuthArea />
            </div>
        </header>
    );
}
