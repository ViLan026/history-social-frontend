"use client";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCreatePost } from "@/features/post/usePost";
import {
    PostCreationRequest,
    PostSourceRequest,
    PostStatus
} from "@/features/post/post.types";
import CreatePostSourceRow from "./CreatePostSourceRow";

export interface CreatePostFormData {
    title: string;
    content: string;
    status: PostStatus;
    tagNames: string;
    sources: PostSourceRequest[];
}

interface CreatePostFormProps {
    onClose: () => void;
}

export default function CreatePostForm({ onClose }: CreatePostFormProps) {
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

    const handleClose = () => {
        reset();
        setFiles([]);
        setPreviews((prev) => {
            prev.forEach(URL.revokeObjectURL);
            return [];
        });
        onClose();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(event.target.files || []);

        previews.forEach(URL.revokeObjectURL);

        setFiles(selected);
        setPreviews(selected.map(URL.createObjectURL));

        event.target.value = "";
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));

        setPreviews((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const onSubmit = async (data: CreatePostFormData) => {
        const tagNames = data.tagNames
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        const requestData: PostCreationRequest = {
            title: data.title,
            content: data.content,
            status: data.status,
            tagNames,
            sources: data.sources.filter(
                (source) => source.title?.trim().length > 0
            )
        };

        await createPostMutation.mutateAsync({
            data: requestData,
            files: files.length > 0 ? files : undefined
        });

        handleClose();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
        >
            <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Tiêu đề <span className="text-red-500">*</span>
                </label>
                <Input
                    {...register("title", {
                        required: "Tiêu đề là bắt buộc"
                    })}
                    placeholder="Nhập tiêu đề bài viết"
                    error={errors.title?.message}
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                    {...register("content", {
                        required: "Nội dung là bắt buộc"
                    })}
                    rows={8}
                    className=" w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <select
                    {...register("status")}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value={PostStatus.PUBLISHED}>Công khai</option>
                    <option value={PostStatus.DRAFT}>Nháp</option>
                </select>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Thẻ
                </label>
                <Input
                    {...register("tagNames")}
                    placeholder="ví dụ: chiến tranh, việt nam, cổ đại"
                />
            </div>

            <div className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                        Nguồn trích dẫn
                    </h3>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                            append({
                                title: "",
                                url: "",
                                authorName: "",
                                publishedYear: undefined
                            })
                        }
                        className="h-8 px-2 text-xs text-primary"
                    >
                        + Thêm nguồn
                    </Button>
                </div>

                <div className="space-y-3">
                    {fields.length === 0 && (
                        <p className="py-2 text-center text-xs text-foreground-faint">
                            {'Chưa có nguồn nào. Nhấn "+ Thêm nguồn" để thêm.'}
                        </p>
                    )}

                    {fields.map((field, index) => (
                        <CreatePostSourceRow
                            key={field.id}
                            index={index}
                            onRemove={() => remove(index)}
                            register={register}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Ảnh minh họa
                </label>

                <div className="rounded-xl border border-dashed border-border bg-surface p-5 text-center transition hover:border-primary/50">
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
                        className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-primary"
                    >
                        Chọn ảnh
                        <p className="mt-1 text-xs text-foreground-faint">
                            Hỗ trợ JPG, PNG, WebP
                        </p>
                    </label>
                </div>

                {previews.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {previews.map((src, index) => (
                            <div key={src} className="group relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={src}
                                    alt={`Ảnh xem trước ${index + 1}`}
                                    className="h-28 w-full rounded-lg border border-border object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface/90 text-xs opacity-0 transition group-hover:opacity-100"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {createPostMutation.isError && (
                <div
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500"
                    role="alert"
                >
                    Không thể tạo bài viết. Vui lòng thử lại.
                </div>
            )}

            <div className="flex justify-end gap-3 border-t border-border pt-4">
                <Button type="button" variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>

                <Button
                    type="submit"
                    isLoading={createPostMutation.isPending}
                    disabled={isSubmitting}
                >
                    Đăng bài
                </Button>
            </div>
        </form>
    );
}
