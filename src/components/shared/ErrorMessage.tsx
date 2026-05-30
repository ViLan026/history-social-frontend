import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export default function ErrorMessage({
  message = "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive-subtle p-4 text-destructive",
        className
      )}
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="font-body text-sm leading-6 text-current">{message}</p>
    </div>
  );
}
