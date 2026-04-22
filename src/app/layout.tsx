import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/contexts/Providers";
import { Inter, Newsreader } from 'next/font/google';

// Cấu hình Google Fonts tối ưu cho Next.js
const inter = Inter({ subsets: ['vietnamese'], variable: '--font-inter' });
const newsreader = Newsreader({ subsets: ['vietnamese'], style: ['normal', 'italic'], variable: '--font-newsreader' });

export const metadata = {
  title: "ChronicleHub - The Living Archive",
  description: "Mạng xã hội khám phá và chia sẻ kiến thức lịch sử",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${inter.variable} ${newsreader.variable} bg-[#4f6f91]`}>
      <head>
        {/* Tích hợp Material Symbols */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}