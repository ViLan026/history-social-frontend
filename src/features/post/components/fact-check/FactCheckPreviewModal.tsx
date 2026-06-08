"use client";

import { useEffect } from "react";
import { usePostFactCheckPreview } from "../../usePost";
import FactCheckSection from "./FactCheckSection";

interface Props {
    postId: string | null;
    open: boolean;
    onClose: () => void;
}

export default function FactCheckPreviewModal({
    postId,
    open,
    onClose,
}: Props) {
    const { data, isLoading } = usePostFactCheckPreview(postId, open);

        useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background p-4 shadow-2xl border border-border"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold">
                            Đối chiếu nguồn lịch sử
                        </h2>
                        <p className="text-sm text-foreground-muted">
                            Hiển thị claim, nhãn đánh giá và giải thích ngắn.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-muted"
                    >
                        ✕
                    </button>
                </div>

                {isLoading ? (
                    <div className="py-10 text-center text-sm text-foreground-muted animate-pulse">
                        Đang tải kết quả đối chiếu...
                    </div>
                ) : (
                    <FactCheckSection
                        claims={data?.claims ?? []}
                        showEvidence={false}
                        compact
                        title="Kết quả đối chiếu"
                    />
                )}
            </div>
        </div>
    );
}