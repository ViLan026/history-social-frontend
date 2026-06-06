// app/(main)/layout.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalModals from "@/features/ui/components/GlobalModals";


export default function MainRouteLayout({ children }: { children: ReactNode }) {
    // const router = useRouter();
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


    return (
        <div className="min-h-dvh flex flex-col">
            <Header />

            <main className="flex-1 pt-14 mx-auto w-full" id="main-content">
                {children}
                <GlobalModals />
            </main>

            <Footer />  
        </div>
    );
}
