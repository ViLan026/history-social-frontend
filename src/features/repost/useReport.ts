// @/features/report/useReport.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reportService } from './report.service';
import { CreateReportRequest, ReviewReportRequest } from './report.types';
import { useReportStore } from './report.store';

// Keys chuẩn hóa cho React Query
export const REPORT_QUERY_KEYS = {
    all: ['reports'] as const,
    myReports: (page: number, size: number) => [...REPORT_QUERY_KEYS.all, 'me', page, size] as const,
    adminPending: (page: number, size: number) => [...REPORT_QUERY_KEYS.all, 'admin', 'pending', page, size] as const,
};

export const useSubmitReport = () => {
    const closeReportModal = useReportStore((state) => state.closeReportModal);
    const queryClient = useQueryClient(); // 2. Khởi tạo queryClient

    return useMutation({
        mutationFn: (data: CreateReportRequest) => reportService.createReport(data),
        onSuccess: () => {
            closeReportModal();
            // 3. Làm tươi toàn bộ danh sách report, ép buộc useMyReports phải tự động kéo data mới về
            queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEYS.all }); 
        },
        onError: (error) => {
            console.error("Gửi báo cáo thất bại:", error);
        }
    });
};

export const useMyReports = (page: number = 0, size: number = 20) => {
    return useQuery({
        queryKey: REPORT_QUERY_KEYS.myReports(page, size),
        queryFn: () => reportService.getMyReports(page, size),
    });
};



// hook cho admin 

export const usePendingReports = (page: number = 0, size: number = 20) => {
    return useQuery({
        queryKey: REPORT_QUERY_KEYS.adminPending(page, size),
        queryFn: () => reportService.getPendingReports(page, size),
    });
};

export const useReviewReport = () => {
    const queryClient = useQueryClient();
    const closeAdminDrawer = useReportStore(state => state.closeAdminDrawer);

    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: ReviewReportRequest }) => 
            reportService.reviewReport(id, request),
        onSuccess: () => {
            // Tắt Drawer và load lại bảng
            closeAdminDrawer();
            queryClient.invalidateQueries({ queryKey: [...REPORT_QUERY_KEYS.all, 'admin'] });
            // toast.success("Đã xét duyệt báo cáo thành công");
        },
        onError: (error) => {
            console.error("Lỗi khi xét duyệt:", error);
            // toast.error("Xét duyệt thất bại");
        }
    });
};