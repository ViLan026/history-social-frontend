// Không có "use client"
import { notFound } from "next/navigation";

export default async function InThisDayPage() {
  // Dùng Next.js fetch, tự động cache 24h
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/today`, {
    next: { revalidate: 86400 } // 86400 giây = 24 giờ
  });

  if (!res.ok) return notFound();
  const events = await res.json();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ngày Này Năm Xưa</h1>
      <div className="space-y-4">
        {events.map((event: any) => (
          <article key={event.id} className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800">Năm {event.year}</h2>
            <p className="mt-2 text-gray-700">{event.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}