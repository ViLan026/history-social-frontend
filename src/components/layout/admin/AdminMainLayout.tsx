"use client";

interface AdminMainLayoutProps {
    leftSidebar: React.ReactNode;
    children: React.ReactNode;
    isSidebarOpen?: boolean; 
}

export default function AdminMainLayout({
    leftSidebar,
    children,
}: AdminMainLayoutProps) {
    return (
        <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex md:px-10 w-full relative">
                
                <aside
                    className="hidden lg:block fixed top-14 left-auto w-[270px] h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar  border-r border-border-muted/10 z-30"
                    aria-label="Navigation"
                >
                    <div className="p-6 pr-0 pb-20">
                        {leftSidebar}
                    </div>
                </aside>

                <aside
                    className="hidden md:block lg:hidden fixed top-14 left-auto w-[110px] h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar  border-r border-border-muted/10 z-30"
                    aria-label="Compact Navigation"
                >
                    <div className="p-4">
                        {leftSidebar}
                    </div>
                </aside>

                <main
                    className="flex-1 min-w-0 w-full bg-background md:ml-[110px] lg:ml-[270px]"
                    aria-label="Admin Main Content"
                >
                    {children}
                </main>
                
            </div>
        </div>
    );
}
