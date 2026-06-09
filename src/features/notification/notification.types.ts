export type NotificationType =
    | "COMMENT"
    | "REPLY"
    | "REACTION"
    | "LIKE"
    | "REPORT"
    | "POST"
    | "SYSTEM"
    | "HSD"
    | "FACT_CHECK";

export interface NotificationResponse {
    id: string;
    actorId: string | null;
    referenceId: string | null;
    recipientId: string;

    type: NotificationType;
    content: string;
    read: boolean;
    createdAt: string;

    displayName?: string ;
    avatarUrl?: string | null;

    postId?: string | null;
    commentId?: string | null;
    reportId?: string | null;
}