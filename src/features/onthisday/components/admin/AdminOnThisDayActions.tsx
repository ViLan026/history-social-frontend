"use client";

import React from "react";

type AdminOnThisDayActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
};

export const AdminOnThisDayActions: React.FC<AdminOnThisDayActionsProps> = ({
  onEdit,
  onDelete,
  disabled,
}) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        onClick={onEdit}
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none"
      >
        Sửa
      </button>
      <button
        onClick={onDelete}
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-destructive disabled:opacity-50 disabled:pointer-events-none"
      >
        Xóa
      </button>x
    </div>
  );
};