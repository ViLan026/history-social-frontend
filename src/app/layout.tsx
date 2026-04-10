import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/contexts/Providers";

export const metadata = {
  title: "Mạng xã hội Lịch Sử",
  description: "Khám phá và chia sẻ kiến thức lịch sử",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}