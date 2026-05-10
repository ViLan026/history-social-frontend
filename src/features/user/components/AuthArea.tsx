"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCurrentUser } from "@/features/user/useUser";

export default function AuthArea() {
    // Lấy dữ liệu trực tiếp từ store
    const { isAuthenticated, logout } = useAuthStore();

    // gọi API lấy user
    const { data: currentUser } = useCurrentUser();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Hiệu ứng: Bấm ra ngoài vùng Dropdown thì tự động đóng menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        if (logout) logout(); // Gọi hàm đăng xuất từ zustand store
        setIsOpen(false);
    };

    // 1. Trạng thái chưa đăng nhập
    if (!isAuthenticated) {
        return (
            <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-medium font-heading tracking-wide text-primary border border-primary/40 hover:bg-primary-subtle hover:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-150"
            >
                Đăng nhập
            </Link>
        );
    }

    // 2. Trạng thái đã đăng nhập
    const displayName =
        currentUser?.profile?.displayName ?? currentUser?.email ?? "User";
    const avatarUrl = currentUser?.profile?.avatarUrl;
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="relative " ref={dropdownRef}>
            {/* Nút Avatar để bật/tắt menu */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                title={displayName}
                className="relative flex items-center justify-center w-9 h-9 rounded-full shrink-0 overflow-hidden border border-white hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-150"
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt={displayName}
                        fill
                        sizes="36px"
                        className="object-cover"
                    />
                ) : (
                    <span className="w-full h-full flex items-center justify-center bg-primary-subtle text-primary text-sm font-heading font-semibold select-none">
                        {initial}
                    </span>
                )}
            </button>

            {/* Menu Dropdown */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 border border-border-muted rounded-xl shadow-lg py-1.5 z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                        backgroundColor: "background" // backdropFilter: "blur(6px)"
                    }}
                >
                    {/* Thông tin vắn tắt (Tên + Email) */}
                    <div className="px-4 py-2 border-b border-border-muted mb-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                            {displayName}
                        </p>
                        {currentUser?.email && (
                            <p className="text-xs text-foreground-muted truncate mt-0.5">
                                {currentUser.email}
                            </p>
                        )}
                    </div>

                    {/* Link Hồ sơ cá nhân */}
                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 text-sm text-foreground hover:bg-surface-raised transition-colors flex items-center gap-2.5"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Hồ sơ cá nhân
                    </Link>

                    {/* Nút Đăng xuất */}
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2.5"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
}
