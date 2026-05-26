"use client";

import React, { useState } from "react";
import { 
  useAdminOnThisDayList, 
  useCreateOnThisDay, 
  useUpdateOnThisDay, 
  useDeleteOnThisDay 
} from "@/features/onthisday/useOnThisDay";
import { OnThisDay, OnThisDayRequest } from "@/features/onthisday/onthisday.types";
import { AdminOnThisDayTable } from "@/features/onthisday/components/admin/AdminOnThisDayTable";
import { AdminOnThisDayForm } from "@/features/onthisday/components/admin/AdminOnThisDayForm";
import { AdminOnThisDayTableSkeleton } from "@/features/onthisday/components/admin/AdminOnThisDayTableSkeleton";

export default function AdminOnThisDayPage() {
  const [page, setPage] = useState(0);
  const size = 20;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OnThisDay | null>(null);

  const { data, isLoading, isError } = useAdminOnThisDayList({ page, size });
  const createMutation = useCreateOnThisDay();
  const updateMutation = useUpdateOnThisDay();
  const deleteMutation = useDeleteOnThisDay();

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: OnThisDay) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleSubmitForm = (formData: OnThisDayRequest) => {
    if (editingItem) {
      updateMutation.mutate(
        { id: editingItem.id, data: formData },
        { onSuccess: handleCloseForm }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: handleCloseForm });
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const isMutating = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="w-full max-w-feed mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-muted pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Quản lý Ngày này năm xưa
          </h1>
          <p className="text-sm text-foreground-muted">
            Cấu hình và cập nhật hệ thống dữ liệu các cột mốc lịch sử diễn ra theo ngày.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-fg shadow hover:opacity-90 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary whitespace-nowrap self-start sm:self-auto"
        >
          Thêm sự kiện
        </button>
      </div>

      {isError && (
        <div className="p-4 border border-destructive/20 text-sm font-medium text-destructive bg-destructive/10 rounded-xl animate-fade-in">
          Hệ thống gặp sự cố khi đồng bộ danh sách dữ liệu lịch sử. Vui lòng thử lại sau.
        </div>
      )}

      {isLoading ? (
        <AdminOnThisDayTableSkeleton />
      ) : (
        <AdminOnThisDayTable
          data={data?.content || []}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border-muted pt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors disabled:opacity-40 disabled:pointer-events-none select-none"
          >
            Trước
          </button>
          <span className="text-xs font-medium text-foreground-muted tracking-wider uppercase">
            Trang {data.currentPage + 1} / {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={data.last || page >= data.totalPages - 1}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors disabled:opacity-40 disabled:pointer-events-none select-none"
          >
            Sau
          </button>
        </div>
      )}

      {isFormOpen && (
        <AdminOnThisDayForm
          key={editingItem?.id || "create-new-modal"}
          initialData={editingItem}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isMutating}
        />
      )}
    </div>
  );
}