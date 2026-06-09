"use client";

import { Flag } from "lucide-react";
import { useUIStore } from "@/features/ui/ui.store";

interface ReportButtonProps {
    targetId: string;
    targetType: "POST" | "COMMENT";
    showLabel?: boolean;
}

export default function ReportButton({
    targetId,
    targetType,
    showLabel = true,
}: ReportButtonProps) {
    const openReport = useUIStore((state) => state.openReport);

    return (
        <button
            type="button"
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                openReport(targetId, targetType);
            }}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-foreground-faint transition-colors hover:bg-surface hover:text-red-500"
            title="Báo cáo"
        >
            <Flag size={14} />
            {showLabel && <span>Báo cáo</span>}
        </button>
    );
}