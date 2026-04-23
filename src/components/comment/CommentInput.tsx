// src/components/comment/CommentInput.tsx
"use client";

import React, {
  memo,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { cn } from "@/lib/utils";

// ─── Props ───────────────────────────────────────────────────────────────────

interface CommentInputProps {
  /** Callback khi user nhấn Enter (không Shift) hoặc bấm nút gửi */
  onSubmit: (content: string) => void;
  /** Disable input khi đang submit */
  isSubmitting?: boolean;
  /** Auto-focus khi component mount (dùng khi mở comment section) */
  autoFocus?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const CommentInput = memo<CommentInputProps>(
  ({ onSubmit, isSubmitting = false, autoFocus = false }) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-focus khi prop thay đổi thành true
    useEffect(() => {
      if (autoFocus) {
        // Delay nhỏ để animation section mở xong mới focus
        const timer = setTimeout(() => {
          textareaRef.current?.focus();
        }, 150);
        return () => clearTimeout(timer);
      }
    }, [autoFocus]);

    // Auto-resize textarea
    useEffect(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }, [value]);

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || isSubmitting) return;
      onSubmit(trimmed);
      setValue("");
      // Reset height sau khi clear
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }, [value, isSubmitting, onSubmit]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Enter gửi / Shift+Enter xuống dòng
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      },
      [handleSubmit]
    );

    const canSubmit = value.trim().length > 0 && !isSubmitting;

    return (
      <div className="flex items-end gap-2">
        {/* Textarea wrapper với neu-inset */}
        <div
          className={cn(
            "flex-1 overflow-hidden rounded-2xl transition-all duration-200",
            "shadow-[inset_4px_4px_8px_#3f5f80,inset_-4px_-4px_8px_#5f89b5]"
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Viết bình luận... (Enter để gửi, Shift+Enter xuống dòng)"
            rows={1}
            className={cn(
              "w-full resize-none bg-transparent px-4 py-2.5",
              "text-sm leading-relaxed text-white",
              "placeholder:text-white/40 outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "scrollbar-thin overflow-y-auto"
            )}
            style={{ minHeight: "40px", maxHeight: "120px" }}
          />
        </div>

        {/* Nút gửi */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          aria-label="Gửi bình luận"
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
            "transition-all duration-200",
            "shadow-[4px_4px_8px_#3f5f80,-4px_-4px_8px_#5f89b5]",
            canSubmit
              ? "text-white hover:brightness-110 active:shadow-[inset_3px_3px_6px_#3f5f80,inset_-3px_-3px_6px_#5f89b5]"
              : "cursor-not-allowed text-white/30"
          )}
        >
          {isSubmitting ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <svg
              className="h-4 w-4 translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>
    );
  }
);

CommentInput.displayName = "CommentInput";