"use client";

import { useUIStore } from "@/features/ui/ui.store";

interface Props {
    postId: string;
}

export default function FactCheckBadge({ postId }: Props) {
    const openFactCheckPreview = useUIStore(
        (state) => state.openFactCheckPreview
    );

    return (
        <button
            type="button"
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                openFactCheckPreview(postId);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/15"
        >
            <span>🛡</span>
            <span>Đã đối chiếu nguồn lịch sử</span>
        </button>
    );
}