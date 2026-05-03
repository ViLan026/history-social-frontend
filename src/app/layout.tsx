// app/layout.tsx

import type { Metadata } from "next";
import { Literata, Crimson_Pro } from "next/font/google";

import Providers from "@/providers/Providers";
import "@/styles/globals.css";

// ============================================================
// Fonts
// ============================================================

const literata = Literata({
    subsets: ["latin", "vietnamese"],
    variable: "--font-body",
    display: "swap",
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"]
});

const crimsonPro = Crimson_Pro({
    subsets: ["latin", "vietnamese"],
    variable: "--font-heading",
    display: "swap",
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"]
});

// ============================================================
// Metadata
// ============================================================

export const metadata: Metadata = {
    title: {
        default: "Historia — Mạng xã hội lịch sử",
        template: "%s | Historia"
    },

    description: "Nền tảng thảo luận và chia sẻ kiến thức lịch sử."
};

// ============================================================
// Root Layout
// ============================================================

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body
                className={`
          ${literata.variable}
          ${crimsonPro.variable}

          min-h-dvh
          bg-background
          text-foreground
          antialiased
        `}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
