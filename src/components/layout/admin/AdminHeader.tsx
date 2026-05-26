// components/layout/admin/AdminHeader.tsx

"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
// eslint-disable-next-line boundaries/element-types
import AuthArea from "@/features/user/components/AuthArea";
import BrandLogo from "../../ui/BrandLogo";

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
            className="relative flex items-center justify-center w-9 h-9 rounded-lg text-primary-fg/80 hover:text-primary-fg hover:bg-surface/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-150"
        >
            {icon}
            {badge != null && badge > 0 && (
                <span
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold leading-none bg-surface text-foreground rounded-full px-1 pointer-events-none"
                    aria-label={`${badge} thông báo hệ thống hoặc báo cáo chưa xử lý`}
                >
                    {badge > 99 ? "99+" : badge}
                </span>
            )}
        </button>
    );
}

export default function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
    const router = useRouter();
    const reportPendingCount = 5; 

    return (
        <header
            className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 bg-primary text-primary-fg border-b border-border-muted/20sticky top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 bg-primary text-primary-fg border-b border-border-muted/20"
            role="banner"
        >
            <div className="flex items-center gap-4">
                {/* Nút Toggle Sidebar cho Admin Layout */}
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-lg text-primary-fg/80 hover:bg-surface/20 hover:text-primary-fg lg:hidden"
                    aria-label="Toggle Sidebar"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </button>
                
                <div className="flex items-center gap-2">
                    <BrandLogo />
                    <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider bg-surface/20 text-primary-fg px-2 py-0.5 rounded">
                        Admin
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />

                <IconButton
                    onClick={() => router.push("/admin/reports")}
                    label="Danh sách báo cáo vi phạm"
                    badge={reportPendingCount}
                    icon={
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                            <line x1="4" x2="4" y1="22" y2="15" />
                        </svg>
                    }
                />

                {/* Divider */}
                <span className="w-px h-5 bg-border-muted/30 mx-1" aria-hidden="true" />

                <AuthArea />
            </div>
        </header>
    );
}