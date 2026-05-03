"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TodayInHistory from "./TodayInHistory";
import { useUsers } from "@/features/user/useUser";
import { useUserStore } from "@/store/user.store";

export default function RightSidebar() {

  // Lấy gợi ý người dùng (không lấy current user)
  const { data, isLoading } = useUsers({
    page: 0,
    size: 5,
    keyword: "",
  });

  const { currentUser } = useUserStore();

  // Lọc bỏ chính user đang đăng nhập
  const suggestedUsers =
    data?.content?.filter((user) => user.id !== currentUser?.id) || [];

  return (
    <div className="sticky top-20 space-y-6">
      <TodayInHistory />

      {/* Gợi ý theo dõi */}
      <div
        className={`rounded-2xl p-6 transition-all duration-300 bg-gradient-to-br from-[#e8f0f7] to-[#d4e3f0] shadow-[8px_8px_24px_rgba(79,111,145,0.1),-4px_-4px_16px_rgba(255,255,255,0.5)]`}
      > 
        <h2
          className={`font-semibold text-lg mb-4 flex items-center justify-between transition-colors duration-300 text-[#4f6f91]`}
        >
          Gợi ý theo dõi
          {isLoading && (
            <span
              className={`text-xs transition-colors duration-300 text-gray-400`}
            >
              Đang tải...
            </span>
          )}
        </h2>

        <div className="space-y-4">
          {isLoading ? (
            // Skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div
                  className={`w-10 h-10 rounded-full bg-[#d4e3f0]`}
                />
                <div className="flex-1 space-y-2">
                  <div
                    className={`h-4 rounded w-3/4 bg-[#d4e3f0]`}
                  />
                  <div
                    className={`h-3 rounded w-1/2 bg-[#d4e3f0]`}
                  />
                </div>
              </div>
            ))
          ) : suggestedUsers.length > 0 ? (
            suggestedUsers.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between group"
              >
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center space-x-3 flex-1"
                >
                  <div
                    className={`relative w-10 h-10 rounded-full overflow-hidden ring-2 transition-all duration-300 ring-[#4f6f91]/20`}
                  >
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={user.displayName || user.email}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center font-medium transition-all duration-300 bg-gradient-to-br from-[#a0cafa]/40 to-[#6b8ab8]/40 text-[#4f6f91]`}
                      >
                        {(
                          user.displayName ||
                          user.email
                        )[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div>
                    <p
                      className={`font-medium text-sm transition-colors duration-300 mb-1 text-[#4f6f91] group-hover:text-[#6b8ab8]`}
                    >
                      {user.displayName || user.email.split("@")[0]}
                    </p>
                    <p
                      className={`text-xs line-clamp-1 transition-colors duration-300 text-gray-600`}
                    >
                      {user.email}
                    </p>
                  </div>
                </Link>

                <button
                  className={`px-4 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 bg-gradient-to-br from-[#a0cafa] to-[#6b8ab8] text-white shadow-[3px_3px_8px_rgba(79,111,145,0.15),-1px_-1px_4px_rgba(255,255,255,0.3)] hover:shadow-[inset_2px_2px_6px_rgba(79,111,145,0.2)]`}
                >
                  Theo dõi
                </button>
              </div>
            ))
          ) : (
            <p
              className={`text-sm py-4 text-center transition-colors duration-300 text-gray-600`}
            >
              Chưa có gợi ý nào
            </p>
          )}
        </div>

        <Link
          href="/explore"
          className={`block text-center text-sm mt-4 font-medium transition-colors duration-300 text-[#4f6f91] hover:text-[#6b8ab8]`}
        >
          Xem thêm gợi ý →
        </Link>
      </div>
    </div>
  );
}