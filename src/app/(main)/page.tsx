import LeftSidebar from '@/components/sidebar/LeftSidebar';
import Feed from '@/components/feed/Feed';
import RightSidebar from '@/components/sidebar/RightSidebar';

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      
      {/* Cột trái: sticky - cách top một khoảng an toàn (28 ~ 112px) qua khỏi Header */}
      <aside className="hidden md:block md:col-span-3">
        <div className="sticky top-28 flex flex-col gap-6">
          <LeftSidebar />
        </div>
      </aside>

      {/* Cột giữa: Feed chính */}
      <section className="md:col-span-6 min-w-0 space-y-8">
        <Feed />
      </section>

      {/* Cột phải: sticky */}
      <aside className="hidden md:block md:col-span-3">
        <div className="sticky top-28 space-y-8">
          <RightSidebar />
        </div>
      </aside>

    </div>
  );
}