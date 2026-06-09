"use client";

import { UseFormRegister } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { CreatePostFormData } from "./CreatePostForm";


interface CreatePostSourceRowProps {
    index: number;
    onRemove: () => void;
    register: UseFormRegister<CreatePostFormData>;
}

export default function CreatePostSourceRow({
    index,
    onRemove,
    register,
}: CreatePostSourceRowProps) {
    return (
        <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground-muted">
                    Nguồn {index + 1}
                </span>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={onRemove}
                    className="h-8 px-2 text-xs text-red-500"
                >
                    Xóa
                </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <Input
                    {...register(`sources.${index}.title`)}
                    placeholder="Tên nguồn"
                />

                <Input
                    {...register(`sources.${index}.authorName`)}
                    placeholder="Tác giả"
                />

                <Input
                    {...register(`sources.${index}.url`)}
                    placeholder="Đường dẫn"
                />

                <Input
                    {...register(`sources.${index}.publishedYear`, {
                        valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Năm xuất bản"
                />
            </div>
        </div>
    );
}