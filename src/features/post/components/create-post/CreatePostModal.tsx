"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import CreatePostForm from "./CreatePostForm";

export default function CreatePostModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, handleClose]);

    return (
        <>
            <Button  className="pb-5"
            type="button" onClick={handleOpen}>
                + Thêm bài viết
            </Button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            handleClose();
                        }
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-post-heading"
                >
                    <div className="max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-surface-overlay p-6 shadow-2xl animate-scale-in md:p-8">
                        <div className="mb-6 flex items-center justify-between">
                            <h2
                                id="create-post-heading"
                                className="text-xl font-semibold text-foreground"
                            >
                                Tạo bài viết mới
                            </h2>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleClose}
                                aria-label="Đóng"
                                className="h-8 w-8 rounded-full p-0"
                            >
                                ✕
                            </Button>
                        </div>

                        <CreatePostForm onClose={handleClose} />
                    </div>
                </div>
            )}
        </>
    );
}