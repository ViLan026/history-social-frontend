"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useCreatePost } from "@/features/post/usePost";
import {
    PostCreationRequest,
    PostStatus,
    PostSourceRequest
} from "@/features/post/post.types";

interface CreatePostFormData {
    title: string;
    content: string;
    status: PostStatus;
    tagNames: string;
    sources: PostSourceRequest[];
}

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

    // Khoá scroll khi modal mở
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleClose = () => {
        reset();
        setFiles([]);
        setPreviews((prev) => {
            prev.forEach((url) => URL.revokeObjectURL(url));
            return [];
        });
        setIsOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(selectedFiles);
        const newPreviews = selectedFiles.map((file) =>
            URL.createObjectURL(file)
        );
        setPreviews(newPreviews);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const onSubmit = async (data: CreatePostFormData) => {
        try {
            const tagNames = data.tagNames
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);

            const requestData: PostCreationRequest = {
                title: data.title,
                content: data.content,
                status: data.status,
                tagNames,
                sources: data.sources.filter(
                    (source) => source.title.trim().length > 0
                )
            };

            await createPostMutation.mutateAsync({
                data: requestData,
                files: files.length > 0 ? files : undefined
            });

            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* ── Nút mở modal ── */}
            <button
                onClick={() => setIsOpen(true)}
                className="neu rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-br from-[#a0cafa] to-[#6b8ab8] dark:from-[#4f6f91] dark:to-[#2c4a6b] hover:brightness-110 active:scale-95 transition-all"
            >
                + Thêm bài viết
            </button>

            {/* ── Backdrop + Modal ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(4px)"
                    }}
                    onClick={(e) => {
                        // Đóng khi click ra ngoài modal
                        if (e.target === e.currentTarget) handleClose();
                    }}
                >
                    <div className="w-full max-w-4xl rounded-3xl p-6 md:p-8 lg:p-10 max-h-[90vh] overflow-y-auto animate-[fadeScaleIn_0.2s_ease-out] bg-[#d4e3f0] text-[#4f6f91] dark:bg-[#1a2332] dark:text-white shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                Tạo bài viết mới
                            </h2>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="neu rounded-full w-9 h-9 flex items-center justify-center text-[#4f6f91] hover:text-[#6b8ab8] dark:text-white dark:hover:text-[#a0cafa] active:scale-95 transition-all text-lg"
                                aria-label="Đóng"
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Tiêu đề *
                                </label>
                                <input
                                    {...register("title", {
                                        required: "Tiêu đề là bắt buộc"
                                    })}
                                    className="neu-inset w-full rounded-xl border-0 bg-transparent px-4 py-3 text-[#4f6f91] placeholder-[#a0cafa] focus:outline-none dark:text-white dark:placeholder-gray-500"
                                    placeholder="Nhập tiêu đề bài viết"
                                />
                                {errors.title && (
                                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Content */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Nội dung *
                                </label>
                                <textarea
                                    {...register("content", {
                                        required: "Nội dung là bắt buộc"
                                    })}
                                    rows={8}
                                    className="neu-inset w-full rounded-xl border-0 bg-transparent px-4 py-3 text-[#4f6f91] placeholder-[#a0cafa] focus:outline-none resize-none dark:text-white dark:placeholder-gray-500"
                                    placeholder="Viết nội dung bài viết..."
                                />
                                {errors.content && (
                                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                                        {errors.content.message}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Trạng thái
                                </label>
                                <select
                                    {...register("status")}
                                    className="neu-inset w-full rounded-xl border-0 bg-transparent px-4 py-3 text-[#4f6f91] focus:outline-none dark:text-white [&>option]:bg-[#d4e3f0] dark:[&>option]:bg-[#1a2332]"
                                >
                                    <option value={PostStatus.PUBLISHED}>
                                        Công khai
                                    </option>
                                    <option value={PostStatus.DRAFT}>
                                        Nháp
                                    </option>
                                </select>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Thẻ (phân tách bằng dấu phẩy)
                                </label>
                                <input
                                    {...register("tagNames")}
                                    className="neu-inset w-full rounded-xl border-0 bg-transparent px-4 py-3 text-[#4f6f91] placeholder-[#a0cafa] focus:outline-none dark:text-white dark:placeholder-gray-500"
                                    placeholder="ví dụ: chiến tranh, việt nam, cổ đại"
                                />
                            </div>

                            {/* Sources */}
                            <div className="neu rounded-2xl p-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">
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
                                        className="neu rounded-xl px-4 py-2 text-sm text-[#4f6f91] hover:text-[#6b8ab8] hover:brightness-110 dark:text-white dark:hover:text-[#a0cafa]"
                                    >
                                        + Thêm nguồn
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="neu-inset rounded-2xl p-4"
                                        >
                                            <div className="mb-3 flex justify-between">
                                                <span className="font-medium">
                                                    Nguồn {index + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <input
                                                    {...register(
                                                        `sources.${index}.title`
                                                    )}
                                                    placeholder="Tên nguồn"
                                                    className="neu w-full rounded-xl border-0 bg-transparent px-3 py-2 text-[#4f6f91] placeholder-[#a0cafa] focus:outline-none dark:text-white dark:placeholder-gray-500"
                                                />
                                                <input
                                                    {...register(
                                                        `sources.${index}.authorName`
                                                    )}
                                                    placeholder="Tác giả"
                                                    className="neu w-full rounded-xl border-0 bg-transparent px-3 py-2 text-[#4f6f91] placeholder-[#a0cafa] focus:outline-none dark:text-white dark:placeholder-gray-500"
                                                />
                                                <input
                                                    {...register(
                                                        `sources.${index}.url`
                                                    )}
                                                    placeholder="Link"
                                                    className="neu w-full rounded-xl border-0 bg-transparent px-3 py-2 text-[#4f6f91] placeholder-[#a0cafa] focus:outline-none dark:text-white dark:placeholder-gray-500"
                                                />
                                                <input
                                                    {...register(
                                                        `sources.${index}.publishedYear`,
                                                        { valueAsNumber: true }
                                                    )}
                                                    type="number"
                                                    placeholder="Năm xuất bản"
                                                    className="neu w-full rounded-xl border-0 bg-transparent px-3 py-2 text-[#4f6f91] placeholder-[#a0cafa] focus:outline-none dark:text-white dark:placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upload */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Ảnh minh họa
                                </label>
                                <div className="neu rounded-2xl p-6 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        id="upload-file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="upload-file"
                                        className="neu inline-block cursor-pointer rounded-xl px-4 py-2 text-[#4f6f91] hover:brightness-110 dark:text-white"
                                    >
                                        Chọn ảnh
                                    </label>
                                </div>

                                {previews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {previews.map((preview, index) => (
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                <img
                                                    src={preview}
                                                    alt="preview"
                                                    className="h-28 w-full rounded-xl object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFile(index)
                                                    }
                                                    className="neu absolute right-2 top-2 rounded-full px-2 py-1 text-xs text-[#4f6f91] dark:text-white"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Error */}
                            {createPostMutation.isError && (
                                <div className="neu-inset rounded-xl p-3 text-sm text-red-500 dark:text-red-400">
                                    Không thể tạo bài viết. Vui lòng thử lại.
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="neu rounded-xl px-5 py-3 text-[#4f6f91] hover:brightness-110 dark:text-white"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        createPostMutation.isPending
                                    }
                                    className="neu rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-br from-[#a0cafa] to-[#6b8ab8] hover:brightness-110 disabled:opacity-60 dark:from-[#4f6f91] dark:to-[#2c4a6b]"
                                >
                                    {createPostMutation.isPending
                                        ? "Đang tạo..."
                                        : "Đăng bài"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Animation keyframe */}
            <style>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
        </>
    );
};

export default CreatePost;
