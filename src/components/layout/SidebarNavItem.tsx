// ============================================================
// components/layout/SidebarNavItem.tsx
// Reusable nav item cho sidebar
// ============================================================

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavItemProps {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  badge?: number;
}

export function SidebarNavItem({ href, icon: Icon, label, badge }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
      style={{
        backgroundColor: isActive ? "var(--sidebar-item-active)" : undefined,
        color: isActive ? "var(--primary)" : "var(--foreground-muted)",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--sidebar-item-hover)";
          e.currentTarget.style.color = "var(--foreground)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "";
          e.currentTarget.style.color = "var(--foreground-muted)";
        }
      }}
    >
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
      {badge && badge > 0 && (
        <span
          className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-fg)",
          }}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );
}