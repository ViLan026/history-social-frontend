"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
// import { ThemeProvider } from './ThemeContext'; 

export function Providers({ children }: { children: ReactNode }) {
  // Tạo QueryClient instance một lần duy nhất cho mỗi user session
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2, // Dữ liệu cache sống 2 phút trước khi refetch
        refetchOnWindowFocus: false, // Tắt tự gọi API lại khi user tab ra tab vào
        retry: 1, // Chỉ thử lại 1 lần nếu API lỗi
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider> */}
        {children}
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}