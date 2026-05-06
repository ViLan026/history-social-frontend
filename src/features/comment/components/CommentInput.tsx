// components/comment/CommentInput.tsx

"use client";

import React, { memo, useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";


interface CommentInputProps {
  /** Callback khi Enter hoặc bấm nút gửi */
  onSubmit: (content: string) => void;
  /** Disable khi đang submit */
  isSubmitting?: boolean;
  /** Auto-focus khi section mở */
  autoFocus?: boolean;
}


export const CommentInput = memo<CommentInputProps>(
  ({ onSubmit, isSubmitting = false, autoFocus = false }) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-focus sau khi section animation xong
    useEffect(() => {
      if (!autoFocus) return;
      const timer = setTimeout(() => textareaRef.current?.focus(), 150);
      return () => clearTimeout(timer);
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
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }, [value, isSubmitting, onSubmit]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        {/* Textarea */}
        <div
          className="
            flex-1 overflow-hidden rounded-xl
            bg-surface border border-border
            focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring/30
            transition-all duration-150
          "
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Viết bình luận... (Enter để gửi, Shift+Enter xuống dòng)"
            rows={1}
            aria-label="Nội dung bình luận"
            className="
              w-full resize-none bg-transparent
              px-3.5 py-2.5
              text-sm leading-relaxed text-foreground
              placeholder:text-foreground-faint
              outline-none
              disabled:cursor-not-allowed disabled:opacity-50
              no-scrollbar overflow-y-auto
            "
            style={{ minHeight: "40px", maxHeight: "120px" }}
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          aria-label="Gửi bình luận"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            "border transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            canSubmit
              ? "bg-primary text-primary-fg border-primary/30 hover:bg-primary-hover"
              : "bg-surface text-foreground-faint border-border cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            // Spinner
            <span
              className="
                inline-block h-4 w-4 rounded-full animate-spin
                border-2 border-primary-fg/30 border-t-primary-fg
              "
              aria-hidden="true"
            />
          ) : (
            // Send icon
            <svg
              className="h-4 w-4 translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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