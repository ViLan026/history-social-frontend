import {
    FactCheckSummaryResponse,
    PostFactCheckClaimResponse,
    PostFactCheckClaimPreviewResponse,
} from "../../post.types";
import FactCheckClaimCard from "./FactCheckClaimCard";
import FactCheckSummary from "./FactCheckSummary";

interface Props {
    summary?: FactCheckSummaryResponse;
    claims?: PostFactCheckClaimResponse[] | PostFactCheckClaimPreviewResponse[];
    showEvidence?: boolean;
    title?: string;
    description?: string;
    compact?: boolean;
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
            <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground md:text-lg">
                    🛡 {title}
                </h3>
                {!compact && (
                    <p className="text-sm text-foreground-muted">
                        {description}
                    </p>
                )}
            </div>

            {summary && <FactCheckSummary summary={summary} />}

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