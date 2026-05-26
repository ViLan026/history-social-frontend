// @/features/report/useReport.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reportService } from './report.service';
import { CreateReportRequest } from './report.types';
import { useReportStore } from './report.store';

// Keys chuẩn hóa cho React Query
export const REPORT_QUERY_KEYS = {
    all: ['reports'] as const,
    myReports: (page: number, size: number) => [...REPORT_QUERY_KEYS.all, 'me', page, size] as const,
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