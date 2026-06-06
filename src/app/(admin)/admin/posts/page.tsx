import AdminPostTable from "@/features/post/components/admin/AdminPostTable";

export default function AdminPostsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold">Quản lý Bài viết</h1>
                <p className="text-sm text-foreground-muted mt-1">
                    Xem danh sách bài viết, kiểm tra kết quả fact-check và xử lý trạng thái.
                </p>
            </div>

            <AdminPostTable />
        </div>
    );
}