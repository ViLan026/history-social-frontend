import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { ApiResponse, PageResponse, PaginationParams } from "@/types/api";
import { NotificationResponse } from "./notification.types";

export const notificationService = {
    getMyNotifications: async (
        params: PaginationParams = {}
    ): Promise<PageResponse<NotificationResponse>> => {
        const response = await axiosInstance.get<
            ApiResponse<PageResponse<NotificationResponse>>
        >(API_ENDPOINTS.NOTIFICATIONS.BASE, {
            params,
        });

        return response.data.data;
    },

    getUnreadCount: async (): Promise<number> => {
        const response = await axiosInstance.get<ApiResponse<number>>(
            API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
        );

        return response.data.data;
    },

    markAsRead: async (notificationId: string): Promise<void> => {
        await axiosInstance.put<ApiResponse<void>>(
            API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId)
        );
    },
};