// components/layout/admin/AdminHeader.tsx

"use client";

import ThemeToggle from "../ThemeToggle";
// eslint-disable-next-line boundaries/element-types
import AuthArea from "@/features/user/components/AuthArea";
import BrandLogo from "../../ui/BrandLogo";
// eslint-disable-next-line boundaries/element-types
import NotificationBell from "@/features/notification/components/NotificationBell";


export default function Header() {

    return (
        <header
            className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 bg-primary text-primary-fg border-b border-border-muted/20sticky top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 bg-primary text-primary-fg border-b border-border-muted/20"
            role="banner"
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <BrandLogo />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <NotificationBell />
                <AuthArea />
            </div>
        </header>
    );
}
