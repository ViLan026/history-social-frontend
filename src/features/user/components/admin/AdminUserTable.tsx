"use client";

import { UserSummaryResponse } from "@/features/user/user.types";
import AdminUserActions from "./AdminUserActions";
import Avatar from "@/components/ui/Avatar";

type AdminUserTableProps = {
  data: UserSummaryResponse[];
  onEdit: (user: UserSummaryResponse) => void;
  onLock: (id: string) => void;
  onUnlock: (id: string) => void;
  isMutating?: boolean;
};

function getStatusLabel(status: string) {
  if (status === "ACTIVE") return "Hoạt động";
  if (status === "INACTIVE") return "Đã khóa";
  return status;
}

function formatDate(value?: string) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function AdminUserTable({
  data,
  onEdit,
  onLock,
  onUnlock,
  isMutating = false,
}: AdminUserTableProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-background p-8 text-center">
        <h3 className="text-base font-semibold text-foreground">
          Chưa có người dùng
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Danh sách người dùng hiện đang trống.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Người dùng
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Username
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Ngày tạo
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {data.map((user) => {
              const status = user.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";
              const displayName = user.displayName || user.email || "User";

              return (
                <tr
                  key={user.id}
                  className="transition hover:bg-surface/60"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface text-sm font-semibold text-foreground">
                        <Avatar avatarUrl={user.avatarUrl} displayName={displayName} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {displayName}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-foreground">
                    <span className="text-muted-foreground">
                      Không có trong UserSummary
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={
                        status === "ACTIVE"
                          ? "inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : "inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      }
                    >
                      {getStatusLabel(status)}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {"createdAt" in user
                      ? formatDate((user as UserSummaryResponse & { createdAt?: string }).createdAt)
                      : "-"}
                  </td>

                  <td className="px-4 py-4">
                    <AdminUserActions
                      status={status}
                      onEdit={() => onEdit(user)}
                      onLock={() => onLock(user.id)}
                      onUnlock={() => onUnlock(user.id)}
                      disabled={isMutating}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}