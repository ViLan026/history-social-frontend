import { PostFactCheckClaimResponse } from "../../post.types";

type FactCheckLabel = PostFactCheckClaimResponse["label"];

function getLabelText(label: FactCheckLabel) {
    switch (label) {
        case "SUPPORTED":
            return "Được tài liệu hỗ trợ";
        case "REFUTED":
            return "Cần xem xét";
        case "NOT_ENOUGH_EVIDENCE":
            return "Chưa đủ bằng chứng";
        default:
            return label;
    }
}

function getLabelClass(label: FactCheckLabel) {
    switch (label) {
        case "SUPPORTED":
            return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700";
        case "REFUTED":
            return "border-amber-500/20 bg-amber-500/10 text-amber-700";
        case "NOT_ENOUGH_EVIDENCE":
            return "border-border bg-muted text-foreground-muted";
        default:
            return "border-border bg-muted text-foreground-muted";
    }
}

export default function FactCheckLabelBadge({
    label
}: {
    label: FactCheckLabel;
}) {
    return (
        <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${getLabelClass(
                label
            )}`}
        >
            {getLabelText(label)}
        </span>
    );
}
