// providers/Providers.tsx
// ============================================================
// Tất cả providers tập trung ở đây — 1 file duy nhất
// Thứ tự wrap: QueryClient → Theme → (Toaster nếu cần)
// ============================================================

"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // uncomment để dev

// ============================================================
// QueryClient config — tối ưu cho social media feed
// ============================================================
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Feed data stale sau 60s — balance giữa freshness và bandwidth
        staleTime: 1000 * 60 ,
        // Giữ cache 5 phút sau khi component unmount
        gcTime: 1000 * 60 * 5,
        // Retry 1 lần nếu fail
        retry: 1,
        // Không refetch khi switch tab 
        refetchOnWindowFocus: false,
      },
      // các mutations nếu lỗi thì không thử lại mà bbaso lỗi luôn  (post, put, delete)
      mutations: {
        retry: 0,
      },
    },
  });
}

// Singleton pattern — tránh tạo QueryClient mới mỗi render
// Ref: TanStack docs recommended pattern cho Next.js
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: luôn tạo client mới (không share giữa requests)
    return makeQueryClient();
  }
  // Browser: tạo 1 lần, reuse
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

// Props
interface ProvidersProps {
  children: React.ReactNode;
}

// Providers component
export default function Providers({ children }: ProvidersProps) {
  // Dùng useState để ổn định QueryClient instance
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"       // Tailwind dùng class strategy
        defaultTheme="dark"     
        enableSystem            // nếu mặc định của người dùng là light thì sẽ dùng light còn không thì hệ thống mặc định là dark 
        disableTransitionOnChange={false} // Cho phép smooth transition
        storageKey="historia-theme"       // localStorage key. đặt tên khác để tráng đụng với các site khác nếu user dùng chung browser 
      >
        {children}
      </ThemeProvider>

      {/* React Query Devtools — chỉ load trong development */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}