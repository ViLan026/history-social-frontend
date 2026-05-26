// components/layout/admin/AdminFooter.tsx
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="border-t border-border bg-card text-muted-foreground mt-auto"
            role="contentinfo"
            aria-label="Admin Footer"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                {/* Copyright hệ thống quản trị */}
                <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">Historia Dashboard</span>
                    <span className="text-muted-foreground/60">|</span>
                    <p>© {currentYear} Toàn quyền quản trị hệ thống.</p>
                </div>

                {/* Các liên kết hỗ trợ kỹ thuật vận hành nội bộ */}
                <div className="flex items-center gap-6">
                    <Link 
                        href="/admin/docs" 
                        className="hover:text-foreground transition-colors duration-150 underline-offset-4 hover:underline"
                    >
                        Tài liệu hệ thống
                    </Link>
                    <Link 
                        href="/admin/support" 
                        className="hover:text-foreground transition-colors duration-150 underline-offset-4 hover:underline"
                    >
                        Hỗ trợ kỹ thuật
                    </Link>
                    <span className="text-muted-foreground/40 italic hidden md:inline">
                        &quot;Historia Magistra Vitae Est&quot;
                    </span>
                </div>
            </div>
        </footer>
    );
}