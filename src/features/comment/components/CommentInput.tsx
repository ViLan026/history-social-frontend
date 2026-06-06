// components/comment/CommentInput.tsx

"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
  autoFocus?: boolean;
}

export const CommentInput = memo<CommentInputProps>(
  ({ onSubmit, isSubmitting = false, autoFocus = false }) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (!autoFocus) return;

      const timer = window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);

      return () => window.clearTimeout(timer);
    }, [autoFocus]);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }, [value]);

    const handleSubmit = useCallback(() => {
      const content = value.trim();

      if (!content || isSubmitting) return;

      onSubmit(content);
      setValue("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }, [isSubmitting, onSubmit, value]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          handleSubmit();
        }
      },
      [handleSubmit]
    );

    const canSubmit = value.trim().length > 0 && !isSubmitting;

    return (
      <div className="flex items-stretch gap-2">
        <div
          className="
            flex-1 overflow-hidden rounded-xl border border-border
            bg-surface transition-all duration-150
            focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20
          "
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Viết bình luận..."
            rows={1}
            aria-label="Nội dung bình luận"
            className="
              max-h-[120px] min-h-10 w-full resize-none overflow-y-auto
              bg-transparent px-3.5 py-2.5 text-sm leading-relaxed
              text-foreground outline-none placeholder:text-foreground-muted
              disabled:cursor-not-allowed disabled:opacity-60
            "
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          aria-label="Gửi bình luận"
          className={cn(
            "flex w-12 shrink-0 items-center justify-center rounded-xl border",
            "transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            canSubmit
              ? "border-primary/30 bg-primary text-primary-fg hover:opacity-90 active:scale-95"
              : "cursor-not-allowed border-border bg-surface text-foreground-muted"
          )}
        >
          {isSubmitting ? (
            <span
              aria-hidden="true"
              className="
                inline-block h-4 w-4 animate-spin rounded-full
                border-2 border-primary-fg/30 border-t-primary-fg
              "
            />
          ) : (
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