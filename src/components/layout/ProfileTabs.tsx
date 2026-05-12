"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type ProfileTab = "posts" | "bookmarks" | "reposts";

interface TabItem {
  id: ProfileTab;
  label: string;
  count?: number;
}

const tabs: TabItem[] = [
  { id: "posts", label: "Posts" },
  { id: "bookmarks", label: "Bookmarks" },
  { id: "reposts", label: "Reposts" },
];

/**
 * ProfileTabs Component
 * Tab navigation cho profile page (Posts, Bookmarks, Reposts)
 * Sử dụng URL search params để quản lý active tab
 */
export default function ProfileTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Lấy active tab từ URL, default là "posts"
  const activeTab = (searchParams.get("tab") as ProfileTab) || "posts";

  const handleTabChange = (tabId: ProfileTab) => {
    // Update URL với tab parameter
    const params = new URLSearchParams(searchParams);
    
    if (tabId === "posts") {
      // Remove tab param nếu là default
      params.delete("tab");
    } else {
      params.set("tab", tabId);
    }

    const newUrl = params.toString() 
      ? `${pathname}?${params.toString()}`
      : pathname;
    
    router.push(newUrl);
  };

  return (
    <div className=" bg-background sticky top-[60px] z-10">
      <div className="max-w-feed mx-auto border-b border-slate-200">
        <nav
          className="flex items-center"
          role="tablist"
          aria-label="Profile sections"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "relative flex-1 px-4 py-4 text-sm font-medium transition-colors",
                  "hover:bg-surface/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {/* Tab Label */}
                <span className="flex items-center justify-center gap-2 ">
                  {tab.label}
                  {tab.count !== undefined && (
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-surface text-foreground-muted"
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </span>

                {/* Active Indicator - Underline */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
