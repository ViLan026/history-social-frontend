"use client";

export default function AdminUserTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface">
            <tr>
              {["Người dùng", "Username", "Trạng thái", "Ngày tạo", "Hành động"].map(
                (item) => (
                  <th
                    key={item}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-surface" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded bg-surface" />
                      <div className="h-3 w-44 rounded bg-surface" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-24 rounded bg-surface" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-20 rounded-full bg-surface" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-28 rounded bg-surface" />
                </td>
                <td className="px-4 py-4">
                  <div className="ml-auto h-8 w-32 rounded bg-surface" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}