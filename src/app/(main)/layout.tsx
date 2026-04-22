'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const setHydrated = () => setIsHydrated(true);
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated();
    } else {
      const unsub = useAuthStore.persist.onFinishHydration(setHydrated);
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router, isHydrated]);

  if (!isHydrated || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#4f6f91] text-white">
        <div className="neu px-8 py-5 rounded-2xl">
          <p className="text-lg font-semibold animate-pulse tracking-wide font-headline">
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#4f6f91] text-white transition-all duration-300">
      <Header />
      <main className="pt-24 pb-12 px-8 max-w-screen-2xl mx-auto w-full flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}