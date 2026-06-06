export type ReportTargetType = "POST" | "COMMENT";

export type ReportReasonType =
    | "MISINFORMATION"
    | "FAKE_HISTORY"
    | "HATE_SPEECH"
    | "VIOLENCE"
    | "HARASSMENT"
    | "SPAM"
    | "INAPPROPRIATE"
    | "OTHER";

export type ReportStatus = "PENDING" | "RESOLVED" | "DISMISSED";

export interface CreateReportRequest {
    targetType: ReportTargetType;
    targetId: string;
    reasonType: ReportReasonType;
    reasonText?: string;
}

export interface ReportResponse {
    id: string;
    reporterId: string;
    targetType: ReportTargetType;
    targetId: string;
    reasonType: ReportReasonType;
    reasonText?: string;
    status: ReportStatus;
    reviewedBy?: string;
    reviewedAt?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface MyReportResponse {
    id: string;
    targetType: ReportTargetType;
    targetId: string;
    reasonType: ReportReasonType;
    reasonText?: string;
    status: ReportStatus;
    createdAt: string;
    targetExists: boolean;
    targetStatus?: string;
    targetContentPreview?: string;
    isMyContentReported?: boolean;
}

export interface PostFactCheckClaimResponse {
    id: string;
    claimText: string;
    label: "SUPPORTED" | "REFUTED" | "NOT_ENOUGH_EVIDENCE";
    explanation?: string;
    evidence?: unknown;
    displayOrder: number;
}

export interface HateSpeechResultResponse {
    label: "HATE" | "CLEAN";
    score?: number;
}

export interface TargetPreviewResponse {
    id: string;
    title?: string;
    content: string;
    authorId: string;
    authorName: string;
    targetStatus?: string;
    reportCount?: number;
    isDeleted: boolean;
    isHiddenByAdmin: boolean;
    isHiddenByAuthor: boolean;
    factCheckClaims?: PostFactCheckClaimResponse[];
    hateSpeechResult?: HateSpeechResultResponse;
}

export interface ModerationReportResponse {
    report: ReportResponse;
    targetPreview: TargetPreviewResponse;
}

export interface ReviewReportRequest {
    status: ReportStatus;
}