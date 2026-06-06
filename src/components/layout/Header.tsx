// components/layout/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
// eslint-disable-next-line boundaries/element-types
import AuthArea from "../../features/user/components/AuthArea";
import BrandLogo from "../ui/BrandLogo";
// eslint-disable-next-line boundaries/element-types
import NotificationBell from "@/features/notification/components/NotificationBell";

export default function Header() {
    const router = useRouter();


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
                <NotificationBell />

                <AuthArea />
            </div>
        </header>
    );
}
