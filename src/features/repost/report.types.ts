// @/features/report/report.types.ts

export type ReportTargetType = 'POST' | 'COMMENT';

export type ReportReasonType = 
    | 'MISINFORMATION'  // Thông tin sai lệch
    | 'FAKE_HISTORY'    // Xuyên tạc lịch sử
    | 'HATE_SPEECH'     // Nội dung thù ghét
    | 'VIOLENCE'        // Nội dung bạo lực
    | 'HARASSMENT'      // Quấy rối
    | 'SPAM'            // Spam
    | 'INAPPROPRIATE'   // Nội dung không phù hợp
    | 'OTHER';          // Khác

export type ReportStatus = 'PENDING' | 'RESOLVED' | 'DISMISSED';

// Request để gửi báo cáo mới
export interface CreateReportRequest {
    targetType: ReportTargetType;
    targetId: string;
    reasonType: ReportReasonType;
    reasonText?: string;
}

// Phản hồi khi tạo báo cáo thành công
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

// DTO hiển thị trong danh sách lịch sử báo cáo
export interface MyReportResponse {
    id: string;
    targetType: ReportTargetType;
    targetId: string;
    reasonType: ReportReasonType;
    reasonText?: string;
    status: ReportStatus;
    createdAt: string;
    
    // Thông tin về target
    targetExists: boolean;
    targetStatus?: string; 
    targetContentPreview?: string; 
    isMyContentReported?: boolean; 
}

// Interface phân trang chung (nếu bạn chưa có ở file global)
export interface PageResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}