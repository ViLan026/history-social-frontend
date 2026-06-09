import {
    PostFactCheckClaimPreviewResponse,
    PostFactCheckClaimResponse
} from "../../post.types";
import FactCheckEvidence from "./FactCheckEvidence";
import FactCheckLabelBadge from "./FactCheckLabelBadge";

type Claim = PostFactCheckClaimPreviewResponse | PostFactCheckClaimResponse;

interface Props {
    claim: Claim;
    showEvidence?: boolean;
}

function hasEvidence(claim: Claim): claim is PostFactCheckClaimResponse {
    return "evidence" in claim;
}

export default function FactCheckClaimCard({
    claim,
    showEvidence = false
}: Props) {
    return (
        <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4">
            <div className="flex items-start justify-between gap-3">
                <p className="break-words text-sm font-medium">
                    {claim.claimText}
                </p>

                <FactCheckLabelBadge label={claim.label} />
            </div>

            {claim.explanation && (
                <p className="whitespace-pre-wrap break-words text-sm text-foreground-muted">
                    {claim.explanation}
                </p>
            )}

            {showEvidence && hasEvidence(claim) && (
                <FactCheckEvidence evidence={claim.evidence} />
            )}
        </div>
    );
}
