"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { useSubmitReport } from "../useReport";
import { ReportReasonType, ReportTargetType } from "../report.types";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/features/ui/ui.store";

const REASONS: { value: ReportReasonType; label: string }[] = [
    { value: "MISINFORMATION", label: "Sai lệch thông tin lịch sử" },
    { value: "FAKE_HISTORY", label: "Lịch sử giả / bóp méo sự thật" },
    { value: "HATE_SPEECH", label: "Ngôn từ thù ghét" },
    { value: "HARASSMENT", label: "Quấy rối / xúc phạm" },
    { value: "VIOLENCE", label: "Bạo lực" },
    { value: "SPAM", label: "Spam" },
    { value: "INAPPROPRIATE", label: "Nội dung không phù hợp" },
    { value: "OTHER", label: "Khác" }
];

function getDefaultReason(targetType: ReportTargetType): ReportReasonType {
    return targetType === "COMMENT" ? "HATE_SPEECH" : "MISINFORMATION";
}

export default function ReportModal() {
    const reportModal = useUIStore((state) => state.reportModal);
    const closeReport = useUIStore((state) => state.closeReport);

    const targetId = reportModal.data?.targetId;
    const targetType = reportModal.data?.targetType;

    if (!reportModal.isOpen || !targetId || !targetType) return null;

    return (
        <ReportModalContent
            key={`${targetType}-${targetId}`}
            targetId={targetId}
            targetType={targetType}
            onClose={closeReport}
        />
    );
}

interface ReportModalContentProps {
    targetId: string;
    targetType: ReportTargetType;
    onClose: () => void;
}

function ReportModalContent({
    targetId,
    targetType,
    onClose
}: ReportModalContentProps) {
    const { mutate: submitReport, isPending, isError } = useSubmitReport();

    const [reasonType, setReasonType] = useState<ReportReasonType>(
        getDefaultReason(targetType)
    );
    const [reasonText, setReasonText] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        submitReport(
            {
                targetId,
                targetType,
                reasonType,
                reasonText: reasonText.trim() || undefined
            },
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                className="
                w-full max-w-lg
                max-h-[85vh]
                overflow-hidden
                rounded-2xl
                border border-border
                bg-card
                shadow-2xl
            "
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <h2 className="text-lg font-semibold">
                        {targetType === "POST"
                            ? "Báo cáo bài viết"
                            : "Báo cáo bình luận"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="rounded-full p-2 text-foreground-muted hover:bg-surface"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex max-h-[calc(85vh-73px)] flex-col"
                >
                    <div className="space-y-5 overflow-y-auto p-5">
                        <div>
                            <p className="mb-3 text-sm font-medium">
                                Vì sao bạn muốn báo cáo nội dung này?
                            </p>

                            <div className="space-y-2">
                                {REASONS.map((reason) => (
                                    <label
                                        key={reason.value}
                                        className={cn(
                                            "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm",
                                            reasonType === reason.value
                                                ? "border-primary bg-primary/10"
                                                : "border-border bg-surface hover:bg-background"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="reasonType"
                                            checked={
                                                reasonType === reason.value
                                            }
                                            onChange={() =>
                                                setReasonType(reason.value)
                                            }
                                            className="accent-primary"
                                        />
                                        <span>{reason.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Mô tả thêm
                            </label>

                            <textarea
                                value={reasonText}
                                onChange={(e) => setReasonText(e.target.value)}
                                rows={4}
                                maxLength={500}
                                placeholder="Nhập thêm thông tin nếu cần..."
                                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        {isError && (
                            <p className="text-sm text-red-500">
                                Gửi báo cáo thất bại. Vui lòng thử lại.
                            </p>
                        )}
                    </div>

                    <div className="flex shrink-0 justify-end gap-3 border-t border-border bg-card px-5 py-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            Hủy
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Đang gửi..." : "Gửi báo cáo"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
