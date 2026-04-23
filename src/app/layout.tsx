import "./globals.css";
import type { ReactNode } from "react";
import { Providers } from "@/contexts/Providers";
import { Inter, Newsreader } from "next/font/google";

// Cấu hình Google Fonts tối ưu cho Next.js
const inter = Inter({
  subsets: ["vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata = {
  title: "ChronicleHub - The Living Archive",
  description: "Mạng xã hội khám phá và chia sẻ kiến thức lịch sử",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#4f6f91",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable}`}
    >
      <head>
        {/* Tích hợp Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Theme initialization script - chạy trước React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');
                  const theme = saved || 'light';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gradient-to-b dark:from-[#4f6f91] dark:to-[#3a526d] min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}