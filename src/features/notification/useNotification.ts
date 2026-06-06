import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "./notification.service";
import { PaginationParams } from "@/types/api";

export const notificationKeys = {
    all: ["notifications"] as const,
    list: (params: PaginationParams) =>
        [...notificationKeys.all, "list", params] as const,
    unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

export function useNotifications(params: PaginationParams = {}) {
    return useQuery({
        queryKey: notificationKeys.list(params),
        queryFn: () => notificationService.getMyNotifications(params),
    });
}

export function useUnreadNotificationCount() {
    return useQuery({
        queryKey: notificationKeys.unreadCount(),
        queryFn: notificationService.getUnreadCount,
        refetchInterval: 30000,
    });
}

export function useMarkNotificationAsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: notificationService.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: notificationKeys.all,
            });
        },
    });
}