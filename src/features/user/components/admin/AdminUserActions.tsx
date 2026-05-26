"use client";

type AccountStatus = "ACTIVE" | "INACTIVE";

type AdminUserActionsProps = {
  status: AccountStatus;
  onEdit: () => void;
  onLock: () => void;
  onUnlock: () => void;
  disabled?: boolean;
};

export default function AdminUserActions({
  status,
  onEdit,
  onLock,
  onUnlock,
  disabled = false,
}: AdminUserActionsProps) {
  const handleLock = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn khóa người dùng này không?");
    if (confirmed) {
      onLock();
    }
  };

  const handleUnlock = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn mở khóa người dùng này không?");
    if (confirmed) {
      onUnlock();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">

      {status === "ACTIVE" ? (
        <button
          type="button"
          onClick={handleLock}
          disabled={disabled}
          className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
        >
          Khóa
        </button>
      ) : (
        <button
          type="button"
          onClick={handleUnlock}
          disabled={disabled}
          className="rounded-lg border border-emerald-300 px-3 py-1.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
        >
          Mở khóa
        </button>
      )}
    </div>
  );
}