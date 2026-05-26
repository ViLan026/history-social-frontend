"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCurrentUser } from "@/features/user/useUser";
import { useLogout } from "@/features/auth/useAuth"; // <-- Import Hook này
import Avatar from "@/components/ui/Avatar";

export default function AuthArea() {
    const { isAuthenticated } = useAuthStore();
    const { data: currentUser } = useCurrentUser();
    
    // Sử dụng mutation để đăng xuất qua API
    const { mutate: serverLogout, isPending } = useLogout(); 

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        serverLogout(); // Gọi API để xóa cookie ở Backend trước
        setIsOpen(false);
    };

    if (!isAuthenticated) {
        return (
            <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-medium text-primary border border-primary/40 hover:bg-primary-subtle transition-all"
            >
                Đăng nhập
            </Link>
        );
    }

    const displayName = currentUser?.profile?.displayName ?? currentUser?.email ?? "User";
    const avatarUrl = currentUser?.profile?.avatarUrl;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending} // Khóa nút khi đang đợi API logout chạy
                className="relative flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-white hover:border-primary/50 transition-all"
            >
                <Avatar avatarUrl={avatarUrl} displayName={displayName} />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg py-1.5 z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    <div className="px-4 py-2 border-b border-border mb-1">
                        <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                        {currentUser?.email && (
                            <p className="text-xs text-muted-foreground truncate mt-0.5">{currentUser.email}</p>
                        )}
                    </div>

                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors flex items-center gap-2.5"
                    >
                        Hồ sơ cá nhân
                    </Link>

                    <button
                        onClick={handleLogout}
                        disabled={isPending}
                        className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2.5 disabled:opacity-50"
                    >
                        {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
                    </button>
                </div>
            )}
        </div>
    );
}