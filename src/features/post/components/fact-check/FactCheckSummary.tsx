import { FactCheckSummaryResponse } from "../../post.types";

interface Props {
    summary?: FactCheckSummaryResponse;
}

export default function FactCheckSummary({ summary }: Props) {
    if (!summary) return null;

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-sm text-foreground-muted">Được hỗ trợ</p>
                <p className="text-xl font-bold">{summary.supportedCount}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-sm text-foreground-muted">Cần xem xét</p>
                <p className="text-xl font-bold text-amber-700">
                    {summary.refutedCount}
                </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-sm text-foreground-muted">
                    Chưa đủ bằng chứng
                </p>
                <p className="text-xl font-bold">
                    {summary.notEnoughEvidenceCount}
                </p>
            </div>
        </div>
    );
}
