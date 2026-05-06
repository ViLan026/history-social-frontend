// components/layout/Footer.tsx
// ============================================================
// Footer — Historical Social Platform
// Tone: academic archive, editorial, calm, refined
// Styling: 100% semantic tokens, zero hardcoded colors
// ============================================================

import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
    { label: "Về chúng tôi", href: "/about" },
    { label: "Điều khoản sử dụng", href: "/terms" },
    { label: "Chính sách bảo mật", href: "/privacy" },
    { label: "Liên hệ", href: "/contact" }
] as const;

const SOCIAL_LINKS = [
    {
        label: "Facebook",
        href: "https://facebook.com",
        icon: (
            // Facebook "f"
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        )
    },
    {
        label: "X / Twitter",
        href: "https://x.com",
        icon: (
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        )
    },
    {
        label: "YouTube",
        href: "https://youtube.com",
        icon: (
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon
                    points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                    fill="var(--background)"
                />
            </svg>
        )
    }
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Tiêu đề section trong footer */
function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="font-heading font-semibold text-sm tracking-widest uppercase text-foreground-muted mb-4">
            {children}
        </h3>
    );
}

/** Link trong footer */
function FooterLink({
    href,
    children
}: {
    href: string;
    children: React.ReactNode;
}) {
    const isExternal = href.startsWith("http");
    return (
        <Link
            href={href}
            {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            className=" text-sm text-foreground-muted hover:text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-150 rounded-sm"
        >
            {children}
        </Link>
    );
}

/** Social icon button */
function SocialButton({
    href,
    label,
    icon
}: {
    href: string;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Theo dõi Historia trên ${label}`}
            title={label}
            className="flex items-center justify-center w-8 h-8 rounded-md text-foreground-faint bg-surface border border-border-muted hover:text-foreground hover:border-border hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-150"
        >
            {icon}
        </a>
    );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="border-t border-border-muted bg-surface mt-auto"
            role="contentinfo"
            aria-label="Footer"
        >
            <div className="mx-auto max-w-layout px-4 md:px-6 lg:px-8">
                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
                    {/* Brand column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        {/* Wordmark */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-4 font-heading font-semibold text-base tracking-[0.1em] uppercase text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm transition-colors duration-150"
                        >
                            <span
                                className="text-primary opacity-70"
                                aria-hidden="true"
                            >
                                ⌖
                            </span>
                            Historia
                        </Link>

                        <p className="text-sm text-foreground-muted leading-relaxed max-w-[28ch]">
                            Nền tảng chia sẻ và khám phá kiến thức lịch sử — nơi
                            quá khứ được kể lại bằng ngôn ngữ của hiện tại.
                        </p>
                    </div>

                    {/* Nav column */}
                    <div>
                        <FooterHeading>Khám phá</FooterHeading>
                        <ul className="space-y-2.5" role="list">
                            {[
                                { label: "Dòng thời gian", href: "/timeline" },
                                { label: "Nhân vật lịch sử", href: "/figures" },
                                { label: "Sự kiện nổi bật", href: "/events" },
                                { label: "Chủ đề", href: "/topics" }
                            ].map(({ label, href }) => (
                                <li key={href}>
                                    <FooterLink href={href}>{label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info column */}
                    <div>
                        <FooterHeading>Thông tin</FooterHeading>
                        <ul className="space-y-2.5" role="list">
                            {NAV_LINKS.map(({ label, href }) => (
                                <li key={href}>
                                    <FooterLink href={href}>{label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social column */}
                    <div>
                        <FooterHeading>Theo dõi</FooterHeading>

                        <div className="flex items-center gap-2">
                            {SOCIAL_LINKS.map(({ label, href, icon }) => (
                                <SocialButton
                                    key={label}
                                    href={href}
                                    label={label}
                                    icon={icon}
                                />
                            ))}
                        </div>

                        {/* Tagline nhỏ */}
                        <p className="mt-5 text-xs text-foreground-faint leading-relaxed">
                            Cập nhật nội dung lịch sử
                            <br />
                            mỗi ngày.
                        </p>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 border-t border-border-muted">
                    <p className="text-xs text-foreground-faint">
                        © {currentYear} Historia. Nội dung thuộc quyền sở hữu
                        của tác giả.
                    </p>

                    <p className="text-xs text-foreground-faint">
                        Xây dựng vì{" "}
                        <span className="text-primary" aria-label="tình yêu">
                            ♡
                        </span>{" "}
                        với lịch sử Việt Nam
                    </p>
                </div>
            </div>
        </footer>
    );
}
