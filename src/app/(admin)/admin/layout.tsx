// src/app/(admin)/admin/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import Header from "@/components/layout/admin/AdminHeader";
import Footer from "@/components/layout/admin/AdminFooter";
import GlobalModals from "@/features/ui/components/GlobalModals";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import AdminMainLayout from "@/components/layout/admin/AdminMainLayout";

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
