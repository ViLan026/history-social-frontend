// @/features/report/report.store.ts
import { create } from 'zustand';
import { ModerationReportResponse, ReportTargetType } from './report.types';

interface ReportState {
    isOpen: boolean;
    targetId: string | null;
    targetType: ReportTargetType | null;
    openReportModal: (targetId: string, targetType: ReportTargetType) => void;
    closeReportModal: () => void;

    // admin 
    isAdminDrawerOpen: boolean;
    selectedAdminReport: ModerationReportResponse | null;
    openAdminDrawer: (report: ModerationReportResponse) => void;
    closeAdminDrawer: () => void;
}

export const useReportStore = create<ReportState>((set) => ({
    isOpen: false,
    targetId: null,
    targetType: null,
    openReportModal: (targetId, targetType) => 
        set({ isOpen: true, targetId, targetType }),
    closeReportModal: () => 
        set({ isOpen: false, targetId: null, targetType: null }),

    // admin 
    isAdminDrawerOpen: false,
    selectedAdminReport: null,
    openAdminDrawer: (report) => set({ isAdminDrawerOpen: true, selectedAdminReport: report }),
    closeAdminDrawer: () => set({ isAdminDrawerOpen: false, selectedAdminReport: null }),
}));