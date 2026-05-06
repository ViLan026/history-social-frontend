// components/post/CreatePost.tsx
// ============================================================
// Modal tạo bài viết mới
// Styling: 100% semantic tokens, zero hardcoded colors
// Animation: CSS keyframe từ globals.css (animate-scale-in)
// ============================================================

"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useCreatePost } from "@/features/post/usePost";
import {
    PostCreationRequest,
    PostStatus,
    PostSourceRequest
} from "@/features/post/post.types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreatePostFormData {
    title: string;
    content: string;
    status: PostStatus;
    tagNames: string;
    sources: PostSourceRequest[];
}

// ─── Reusable form primitives ─────────────────────────────────────────────────

/** Label + error wrapper */
function Field({
    label,
    required,
    error,
    children
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
                {label}
                {required && (
                    <span
                        className="text-destructive ml-0.5"
                        aria-hidden="true"
                    >
                        *
                    </span>
                )}
            </label>
            {children}
            {error && (
                <p className="text-xs text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

/** Shared input class */
const inputClass = `
  w-full rounded-lg px-4 py-2.5
  bg-surface border border-border
  text-foreground placeholder:text-foreground-faint
  text-sm
  focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/30
  transition-all duration-150
`;

/** Shared ghost button (secondary action) */
const ghostBtnClass = `
  rounded-lg px-4 py-2.5 text-sm font-medium
  text-foreground-muted border border-border
  hover:bg-surface-raised hover:text-foreground hover:border-border-focus
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  transition-all duration-150
`;

/** Primary filled button */
const primaryBtnClass = `
  rounded-lg px-5 py-2.5 text-sm font-semibold
  bg-primary text-primary-fg
  hover:bg-primary-hover
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-150
`;

// ─── Source Row ───────────────────────────────────────────────────────────────

interface SourceRowProps {
    index: number;
    onRemove: () => void;
    register: ReturnType<typeof useForm<CreatePostFormData>>["register"];
}

function SourceRow({ index, onRemove, register }: SourceRowProps) {
    return (
        <div className="rounded-lg bg-surface border border-border-muted p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground-muted">
                    Nguồn {index + 1}
                </span>
                <button
                    type="button"
                    onClick={onRemove}
                    className="
            text-xs text-destructive hover:text-destructive-hover
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            rounded-sm transition-colors duration-150
          "
                >
                    Xóa
                </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <input
                    {...register(`sources.${index}.title`)}
                    placeholder="Tên nguồn"
                    className={inputClass}
                />
                <input
                    {...register(`sources.${index}.authorName`)}
                    placeholder="Tác giả"
                    className={inputClass}
                />
                <input
                    {...register(`sources.${index}.url`)}
                    placeholder="Đường dẫn"
                    className={inputClass}
                />
                <input
                    {...register(`sources.${index}.publishedYear`, {
                        valueAsNumber: true
                    })}
                    type="number"
                    placeholder="Năm xuất bản"
                    className={inputClass}
                />
            </div>
        </div>
    );
}

// ─── Image Previews ───────────────────────────────────────────────────────────

function ImagePreviews({
    previews,
    onRemove
}: {
    previews: string[];
    onRemove: (i: number) => void;
}) {
    if (previews.length === 0) return null;

    return (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {previews.map((src, i) => (
                <div key={i} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={`Ảnh xem trước ${i + 1}`}
                        className="h-28 w-full rounded-lg object-cover border border-border-muted"
                    />
                    <button
                        type="button"
                        onClick={() => onRemove(i)}
                        aria-label={`Xóa ảnh ${i + 1}`}
                        className="
              absolute right-1.5 top-1.5
              flex items-center justify-center
              w-6 h-6 rounded-full
              bg-surface/90 text-foreground border border-border
              opacity-0 group-hover:opacity-100
              hover:bg-destructive-subtle hover:text-destructive hover:border-destructive/30
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              transition-all duration-150 text-xs
            "
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}

// ─── CreatePost ───────────────────────────────────────────────────────────────

export const CreatePost: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const createPostMutation = useCreatePost();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CreatePostFormData>({
        defaultValues: {
            title: "",
            content: "",
            status: PostStatus.PUBLISHED,
            tagNames: "",
            sources: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sources"
    });

    // Lock body scroll khi modal mở
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Escape key đóng modal
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        if (isOpen) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen]);

    const handleClose = () => {
        reset();
        setFiles([]);
        setPreviews((prev) => {
            prev.forEach(URL.revokeObjectURL);
            return [];
        });
        setIsOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        setFiles(selected);
        setPreviews(selected.map(URL.createObjectURL));
    };

    const removeFile = (i: number) => {
        setFiles((prev) => prev.filter((_, idx) => idx !== i));
        setPreviews((prev) => {
            URL.revokeObjectURL(prev[i]);
            return prev.filter((_, idx) => idx !== i);
        });
    };

    const onSubmit = async (data: CreatePostFormData) => {
        try {
            const tagNames = data.tagNames
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);

            const requestData: PostCreationRequest = {
                title: data.title,
                content: data.content,
                status: data.status,
                tagNames,
                sources: data.sources.filter((s) => s.title.trim().length > 0)
            };

            await createPostMutation.mutateAsync({
                data: requestData,
                files: files.length > 0 ? files : undefined
            });

            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {/* ── Trigger button ── */}
            <button onClick={() => setIsOpen(true)} className={primaryBtnClass}>
                + Thêm bài viết
            </button>

            {/* ── Modal ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        backgroundColor: "oklch(0 0 0 / 0.55)",
                        backdropFilter: "blur(6px)"
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleClose();
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-post-heading"
                >
                    <div
                        className="
              w-full max-w-3xl max-h-[90dvh] overflow-y-auto
              rounded-xl bg-surface-overlay border border-border
              p-6 md:p-8
              animate-scale-in
              shadow-2xl
            "
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2
                                id="create-post-heading"
                                className="text-xl font-heading font-semibold text-foreground"
                            >
                                Tạo bài viết mới
                            </h2>
                            <button
                                type="button"
                                onClick={handleClose}
                                aria-label="Đóng"
                                className="
                  flex items-center justify-center w-8 h-8 rounded-full
                  text-foreground-muted hover:text-foreground hover:bg-surface-raised
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  transition-all duration-150 text-sm
                "
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                            noValidate
                        >
                            {/* Title */}
                            <Field
                                label="Tiêu đề"
                                required
                                error={errors.title?.message}
                            >
                                <input
                                    {...register("title", {
                                        required: "Tiêu đề là bắt buộc"
                                    })}
                                    placeholder="Nhập tiêu đề bài viết"
                                    className={inputClass}
                                    aria-invalid={!!errors.title}
                                />
                            </Field>

                            {/* Content */}
                            <Field
                                label="Nội dung"
                                required
                                error={errors.content?.message}
                            >
                                <textarea
                                    {...register("content", {
                                        required: "Nội dung là bắt buộc"
                                    })}
                                    rows={8}
                                    placeholder="Viết nội dung bài viết..."
                                    className={`${inputClass} resize-none`}
                                    aria-invalid={!!errors.content}
                                />
                            </Field>

                            {/* Status */}
                            <Field label="Trạng thái">
                                <select
                                    {...register("status")}
                                    className={`${inputClass} cursor-pointer`}
                                    style={{
                                        backgroundColor: "var(--surface)"
                                    }}
                                >
                                    <option value={PostStatus.PUBLISHED}>
                                        Công khai
                                    </option>
                                    <option value={PostStatus.DRAFT}>
                                        Nháp
                                    </option>
                                </select>
                            </Field>

                            {/* Tags */}
                            <Field label="Thẻ (phân tách bằng dấu phẩy)">
                                <input
                                    {...register("tagNames")}
                                    placeholder="ví dụ: chiến tranh, việt nam, cổ đại"
                                    className={inputClass}
                                />
                            </Field>

                            {/* Sources */}
                            <div className="rounded-lg bg-surface border border-border p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-heading font-semibold text-foreground">
                                        Nguồn trích dẫn
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            append({
                                                title: "",
                                                url: "",
                                                authorName: "",
                                                publishedYear: undefined
                                            })
                                        }
                                        className="
                      text-xs font-medium
                      text-primary hover:text-primary-hover
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                      rounded-sm transition-colors duration-150
                    "
                                    >
                                        + Thêm nguồn
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {fields.length === 0 && (
                                        <p className="text-xs text-foreground-faint text-center py-2">
                                            Chưa có nguồn nào. Nhấn "+ Thêm
                                            nguồn" để thêm.
                                        </p>
                                    )}
                                    {fields.map((field, i) => (
                                        <SourceRow
                                            key={field.id}
                                            index={i}
                                            onRemove={() => remove(i)}
                                            register={register}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Upload */}
                            <Field label="Ảnh minh họa">
                                <div
                                    className="
                    rounded-lg border border-dashed border-border
                    bg-surface p-5 text-center
                    hover:border-primary/50 hover:bg-surface-raised
                    transition-all duration-150
                  "
                                >
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        id="upload-file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="upload-file"
                                        className="
                      inline-flex items-center gap-2 cursor-pointer
                      text-sm font-medium text-primary hover:text-primary-hover
                      focus-visible:outline-none
                      transition-colors duration-150
                    "
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="3"
                                                y="3"
                                                width="18"
                                                height="18"
                                                rx="2"
                                                ry="2"
                                            />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        Chọn ảnh
                                    </label>
                                    <p className="mt-1 text-xs text-foreground-faint">
                                        Hỗ trợ JPG, PNG, WebP
                                    </p>
                                </div>

                                <ImagePreviews
                                    previews={previews}
                                    onRemove={removeFile}
                                />
                            </Field>

                            {/* API error */}
                            {createPostMutation.isError && (
                                <div
                                    className="
                    rounded-lg px-4 py-3 text-sm
                    bg-destructive-subtle text-destructive
                    border border-destructive/20
                  "
                                    role="alert"
                                >
                                    Không thể tạo bài viết. Vui lòng thử lại.
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-muted">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className={ghostBtnClass}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        createPostMutation.isPending
                                    }
                                    className={primaryBtnClass}
                                >
                                    {createPostMutation.isPending
                                        ? "Đang đăng..."
                                        : "Đăng bài"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
