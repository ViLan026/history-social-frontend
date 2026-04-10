"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Trang không tồn tại</p>

      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white text-black"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}