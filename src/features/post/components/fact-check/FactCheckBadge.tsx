"use client";

import { useState } from "react";
import FactCheckPreviewModal from "./FactCheckPreviewModal";

interface Props {
    postId: string;
}

export default function FactCheckBadge({ postId }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/15"
            >
                <span>🛡</span>
                <span>Đã đối chiếu nguồn lịch sử</span>
            </button>

            <FactCheckPreviewModal
                postId={postId}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}