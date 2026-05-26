// history-social-frontend\src\app\(admin)\admin\page.tsx

import { redirect } from "next/navigation";

export default function AdminPage() {
    // Tự động điều hướng người dùng từ /admin sang /admin/dashboard
    redirect("/admin/dashboard");
}