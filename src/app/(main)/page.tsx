// app/(main)/page.tsx
import LeftSidebar from "@/components/layout/navigation";
import Feed from "@/features/post/components/Feed";
import RightSidebar from "@/components/sidebar/RightSidebar";
import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
    return (
        <MainLayout
            leftSidebar={<LeftSidebar />}
            rightSidebar={<RightSidebar />}
        >
            <Feed />
        </MainLayout>
    );
}
