// components/layout/AdminMainLayout.tsx
"use client";

interface AdminMainLayoutProps {
    leftSidebar: React.ReactNode;
    children: React.ReactNode;
    isSidebarOpen?: boolean; // Nhận trạng thái đóng mở sidebar trên mobile từ Header công việc trước
}

export default function AdminMainLayout({
    leftSidebar,
    children,
    isSidebarOpen = false
}: AdminMainLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col pt-14">
            {/* Wrapper chính chia làm 2 phần: Sidebar trái và Nội dung chính */}
            <div className="flex flex-1 relative w-full">
                
                {/* 1. LEFT SIDEBAR */}
                {/* Trên Desktop (md+): Chiếm không gian cố định ở cạnh trái */}
                {/* Trên Mobile (<md): Ẩn đi hoặc hiện dạng Drawer đè lên màn hình dựa vào isSidebarOpen */}
                <aside
                    className={`
                        fixed md:sticky top-14 left-0 z-30
                        h-[calc(100vh-3.5rem)] w-64 md:w-16 lg:w-64
                        shrink-0 overflow-y-auto border-r border-border bg-card
                        transition-transform duration-200 ease-in-out
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    `}
                    aria-label="Admin Navigation"
                >
                    <div className="h-full">{leftSidebar}</div>
                </aside>

                {/* Lớp Overlay mờ nền khi bật Sidebar trên thiết bị di động */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 top-14 z-20 bg-background/80 backdrop-blur-sm md:hidden"
                        aria-hidden="true"
                    />
                )}

                {/* 2. NỘI DUNG CHÍNH (MAIN CONTENT AREA) */}
                {/* Sử dụng w-full và min-w-0 để tránh lỗi vỡ layout khi bọc các bảng dữ liệu lớn (Table) */}
                <main
                    className="flex-1 min-w-0 w-full bg-background p-4 sm:p-6 lg:p-8"
                    aria-label="Admin Main Content"
                >
                    <div className="mx-auto w-full max-w-screen-2xl space-y-6">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
}