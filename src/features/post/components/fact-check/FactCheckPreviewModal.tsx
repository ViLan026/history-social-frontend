"use client";

import { useEffect } from "react";
import { usePostFactCheckPreview } from "../../usePost";
import FactCheckSection from "./FactCheckSection";
import { useUIStore } from "@/features/ui/ui.store";
import Button from "@/components/ui/Button";

export default function FactCheckPreviewModal() {
    const factCheckPreviewModal = useUIStore(
        (state) => state.factCheckPreviewModal
    );
    const closeFactCheckPreview = useUIStore(
        (state) => state.closeFactCheckPreview
    );

    const isOpen = factCheckPreviewModal.isOpen;
    const postId = factCheckPreviewModal.data?.postId ?? null;

    const { data, isLoading } = usePostFactCheckPreview(postId, isOpen);

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

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeFactCheckPreview();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, closeFactCheckPreview]);

    if (!isOpen || !postId) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={closeFactCheckPreview}
        >
            <div
                className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-5 py-4">
                    <div>
                        <h2 className="text-lg font-bold text-foreground">
                            Đối chiếu nguồn lịch sử
                        </h2>
                        <p className="text-sm text-foreground-muted">
                            Hiển thị claim, nhãn đánh giá và giải thích ngắn.
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={closeFactCheckPreview}
                        className="h-8 w-8 rounded-full p-0"
                    >
                        ✕
                    </Button>
                </div>

                <div className="overflow-y-auto p-5">
                    {isLoading ? (
                        <div className="animate-pulse py-10 text-center text-sm text-foreground-muted">
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
        </div>
    );
}