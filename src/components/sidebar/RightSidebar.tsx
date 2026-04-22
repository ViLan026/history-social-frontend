'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TodayInHistory from './TodayInHistory';
import { useUsers } from '@/features/user/useUser';   // Hook React Query
import { useUserStore } from '@/store/user.store';

export default function RightSidebar() {
  // Lấy gợi ý người dùng (không lấy current user)
  const { data, isLoading } = useUsers({
    page: 0,
    size: 5,
    keyword: '', // có thể thêm search sau
  });

  const { currentUser } = useUserStore();

  // Lọc bỏ chính user đang đăng nhập
  const suggestedUsers = data?.content?.filter(
    (user) => user.id !== currentUser?.id
  ) || [];

  return (
    <div className="sticky top-20 space-y-6">
      <TodayInHistory />

      {/* Gợi ý theo dõi */}
      <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1720] rounded-2xl p-6 shadow-[8px_8px_24px_rgba(0,0,0,0.4),-4px_-4px_16px_rgba(255,255,255,0.02)]">
        <h2 className="text-white font-semibold text-lg mb-4 flex items-center justify-between">
          Gợi ý theo dõi
          {isLoading && <span className="text-xs text-gray-500">Đang tải...</span>}
        </h2>

        <div className="space-y-4">
          {isLoading ? (
            // Skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-[#253549]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#253549] rounded w-3/4" />
                  <div className="h-3 bg-[#253549] rounded w-1/2" />
                </div>
              </div>
            ))
          ) : suggestedUsers.length > 0 ? (
            suggestedUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between group">
                <Link href={`/profile/${user.id}`} className="flex items-center space-x-3 flex-1">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#4f6f91]/30">
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={user.displayName || user.email}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#4f6f91] to-[#2c4a6b] flex items-center justify-center text-white font-medium">
                        {(user.displayName || user.email)[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm group-hover:text-[#4f6f91] transition-colors">
                      {user.displayName || user.email.split('@')[0]}
                    </p>
                    <p className="text-gray-400 text-xs line-clamp-1">
                      {user.email}
                    </p>
                  </div>
                </Link>

                <button className="px-4 py-1.5 rounded-xl bg-gradient-to-br from-[#4f6f91] to-[#2c4a6b] text-white text-xs font-medium shadow-[3px_3px_8px_rgba(0,0,0,0.3),-1px_-1px_4px_rgba(255,255,255,0.05)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3)] transition-all duration-200 whitespace-nowrap">
                  Theo dõi
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm py-4 text-center">
              Chưa có gợi ý nào
            </p>
          )}
        </div>

        <Link
          href="/explore"
          className="block text-center text-[#4f6f91] hover:text-[#6b8ab8] text-sm mt-4 font-medium transition-colors"
        >
          Xem thêm gợi ý →
        </Link>
      </div>

      {/* Tags phổ biến */}
      <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1720] rounded-2xl p-6 shadow-[8px_8px_24px_rgba(0,0,0,0.4),-4px_-4px_16px_rgba(255,255,255,0.02)]">
        <h2 className="text-white font-semibold text-lg mb-4">Tags phổ biến</h2>
        <div className="flex flex-wrap gap-2">
          {['Triều Nguyễn', 'Kháng chiến', 'Văn hóa', 'Kinh tế', 'Xã hội', 'Chiến tranh', 'Nhân vật'].map((tag) => (
            <Link
              key={tag}
              href={`/search?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1 rounded-lg bg-[#0d1720] text-gray-300 text-xs shadow-[inset_2px_2px_6px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.02)] hover:bg-[#253549] hover:text-white cursor-pointer transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}