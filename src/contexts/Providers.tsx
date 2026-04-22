"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ThemeProvider } from './ThemeContext'; //  Bật lại

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {/*  ThemeProvider bao QueryClientProvider để useTheme dùng được ở mọi nơi */}
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}