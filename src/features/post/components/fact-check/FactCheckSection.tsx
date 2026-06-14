import {
    FactCheckSummaryResponse,
    PostFactCheckClaimResponse,
    PostFactCheckClaimPreviewResponse,
} from "../../post.types";
import FactCheckClaimCard from "./FactCheckClaimCard";

interface Props {
    summary?: FactCheckSummaryResponse;
    claims?: PostFactCheckClaimResponse[] | PostFactCheckClaimPreviewResponse[];
    showEvidence?: boolean;
    title?: string;
    description?: string;
    compact?: boolean;
}

function SummaryInline({ summary }: { summary?: FactCheckSummaryResponse }) {
    if (!summary) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-border bg-muted/20 px-2.5 py-1 text-foreground-muted">
                Hỗ trợ:{" "}
                <strong className="text-foreground">
                    {summary.supportedCount}
                </strong>
            </span>

            <span className="rounded-full border border-border bg-muted/20 px-2.5 py-1 text-foreground-muted">
                Cần xem xét:{" "}
                <strong className="text-amber-700">
                    {summary.refutedCount}
                </strong>
            </span>

            <span className="rounded-full border border-border bg-muted/20 px-2.5 py-1 text-foreground-muted">
                Chưa đủ bằng chứng:{" "}
                <strong className="text-foreground">
                    {summary.notEnoughEvidenceCount}
                </strong>
            </span>
        </div>
    );
}

export default function FactCheckSection({
    summary,
    claims = [],
    showEvidence = false,
    title = "Đối chiếu nguồn lịch sử",
    description = "Kết quả được tạo tự động từ hệ thống hỗ trợ kiểm chứng. Người đọc nên xem thêm nguồn tham khảo.",
    compact = false,
}: Props) {
    const sortedClaims = claims
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder);

    return (
        <section className="space-y-4 rounded-2xl border border-border bg-card p-4 md:p-5">
            <div className="space-y-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-base font-bold text-foreground md:text-lg">
                        🛡 {title}
                    </h3>

                    <SummaryInline summary={summary} />
                </div>

                {!compact && (
                    <p className="text-sm text-foreground-muted">
                        {description}
                    </p>
                )}
            </div>

            {sortedClaims.length === 0 ? (
                <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-foreground-muted">
                    Chưa có dữ liệu đối chiếu cho bài viết này.
                </div>
            ) : (
                <div className="space-y-3">
                    {sortedClaims.map((claim) => (
                        <FactCheckClaimCard
                            key={claim.id}
                            claim={claim}
                            showEvidence={showEvidence}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}