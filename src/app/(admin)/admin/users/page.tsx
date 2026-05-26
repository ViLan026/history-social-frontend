"use client";

import { useState } from "react";
import AdminUserTable from "@/features/user/components/admin/AdminUserTable";
import AdminUserTableSkeleton from "@/features/user/components/admin/AdminUserTableSkeleton";
import {
  useLockUser,
  useUnlockUser,
  useUsers,
} from "@/features/user/useUser";
import { UserSummaryResponse } from "@/features/user/user.types";

const PAGE_SIZE = 10;

type AdminUserSummary = UserSummaryResponse & {
  username?: string | null;
  createdAt?: string | null;
};

export default function AdminUsersPage() {
  const [page, setPage] = useState(0);

  const params = {
    page,
    size: PAGE_SIZE,
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useUsers(params);

  const lockUserMutation = useLockUser();
  const unlockUserMutation = useUnlockUser();

  const isMutating =
    lockUserMutation.isPending || unlockUserMutation.isPending;

  const users = (data?.content ?? []) as AdminUserSummary[];
  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((currentPage) => {
      if (totalPages <= 0) return currentPage;
      return Math.min(currentPage + 1, totalPages - 1);
    });
  };

  const handleEdit = (_user: AdminUserSummary) => {
    window.alert("Chức năng sửa tài khoản không nằm trong phạm vi hiện tại.");
  };

  const handleLock = (id: string) => {
    lockUserMutation.mutate(id);
  };

  const handleUnlock = (id: string) => {
    unlockUserMutation.mutate(id);
  };

  const getErrorMessage = () => {
    if (error instanceof Error) return error.message;
    return "Không thể tải danh sách người dùng.";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Quản lý người dùng
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Xem danh sách, khóa hoặc mở khóa tài khoản người dùng.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-muted-foreground">
          Tổng số:{" "}
          <span className="font-semibold text-foreground">
            {totalElements}
          </span>
        </div>
      </div>

      {lockUserMutation.isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Khóa tài khoản thất bại. Vui lòng thử lại.
        </div>
      )}

      {unlockUserMutation.isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Mở khóa tài khoản thất bại. Vui lòng thử lại.
        </div>
      )}

      {isLoading ? (
        <AdminUserTableSkeleton />
      ) : isError ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <h2 className="text-base font-semibold text-foreground">
            Đã xảy ra lỗi
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {getErrorMessage()}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Tải lại
          </button>
        </div>
      ) : (
        <>
          <AdminUserTable
            data={users}
            onEdit={handleEdit}
            onLock={handleLock}
            onUnlock={handleUnlock}
            isMutating={isMutating}
          />

          <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Trang{" "}
              <span className="font-semibold text-foreground">
                {totalPages === 0 ? 0 : page + 1}
              </span>{" "}
              /{" "}
              <span className="font-semibold text-foreground">
                {totalPages}
              </span>
              {isFetching && (
                <span className="ml-2 text-xs text-muted-foreground">
                  Đang cập nhật...
                </span>
              )}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 0 || isFetching}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Trước
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={
                  totalPages === 0 ||
                  page >= totalPages - 1 ||
                  isFetching
                }
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}