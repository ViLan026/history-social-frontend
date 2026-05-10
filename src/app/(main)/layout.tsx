// app/(main)/layout.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/auth.store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalModals from "@/features/ui/components/GlobalModals";

function LoadingScreen() {
    return (
        <div
            className=" min-h-dvh flex items-center justify-center bg-background"
            role="status"
            aria-label="Đang tải"
        >
            <div className=" flex flex-col items-center gap-4 px-8 py-6 rounded-xl bg-background border border-border-muted">
                {/* Spinner */}
                <span
                    className=" block w-6 h-6 rounded-full border-2 border-border border-t-primary animate-spin"
                    aria-hidden="true"
                />

                <p className=" text-sm font-heading tracking-wide text-foreground-muted">
                    Đang xác thực...
                </p>
            </div>
        </div>
    );
}

export default function MainLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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

    // Redirect nếu chưa đăng nhập
    // useEffect(() => {
    //     if (!isHydrated) return;

    //     if (!isAuthenticated) {
    //         router.replace("/login");
    //     } else {
    //         setIsChecking(false);
    //     }
    // }, [isAuthenticated, isHydrated, router]);

    // if (!isHydrated || isChecking) {
    //     return <LoadingScreen />;
    // }

    return (
        <div className="min-h-dvh flex flex-col">
            <Header />

            <main className="flex-1 pt-14 mx-auto w-full" id="main-content">
                {children}
                <GlobalModals /> {/* Mount 1 lần duy nhất */}
            </main>

            <Footer />
        </div>
    );
}
