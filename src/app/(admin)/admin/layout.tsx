// src/app/(admin)/admin/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import Header from "@/components/layout/admin/AdminHeader";
import Footer from "@/components/layout/admin/AdminFooter";
import GlobalModals from "@/features/ui/components/GlobalModals";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import AdminMainLayout from "@/components/layout/admin/AdminMainLayout";

function AdminLoadingScreen() {
    return (
        <div
            className="min-h-dvh flex items-center justify-center bg-background"
            role="status"
            aria-label="Đang kiểm tra quyền quản trị"
        >
            <div className="flex flex-col items-center gap-4 px-8 py-6 rounded-xl bg-card border border-border-muted">
                <span
                    className="block w-6 h-6 rounded-full border-2 border-border border-t-primary animate-spin"
                    aria-hidden="true"
                />
                <p className="text-sm font-semibold tracking-wide text-foreground-muted">
                    Xác thực quyền Admin...
                </p>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    // Khởi tạo state dựa trên giá trị đồng bộ thực tế từ Zustand persist
    const [isHydrated, setIsHydrated] = useState(false);
    // const [isChecking, setIsChecking] = useState(true);

    // Chờ Zustand persist hydrate xong trước khi check auth
    useEffect(() => {
        const setHydrated = () => setIsHydrated(true);

        if (useAuthStore.persist.hasHydrated()) {
            setHydrated();
        } else {
            const unsub = useAuthStore.persist.onFinishHydration(setHydrated);
            return () => unsub();
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />

            <div className="flex-1 w-full pt-14 py-4 md:py-6">
                <AdminMainLayout leftSidebar={<AdminSidebar />}>
                    <div className="pt-4  md:pt-6">{children}</div>
                </AdminMainLayout>
            </div>

            <GlobalModals />

            <Footer />
        </div>
    );
}
