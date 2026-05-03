import LeftSidebar from "@/components/sidebar/LeftSidebar";
import Feed from "@/components/social/Feed";
import RightSidebar from "@/components/sidebar/RightSidebar";
import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout
      leftSidebar={<LeftSidebar />} 
      rightSidebar={<RightSidebar />}>
        <Feed />
    </MainLayout>
  );
}