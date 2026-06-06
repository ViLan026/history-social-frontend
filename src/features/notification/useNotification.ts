// src/features/notification/useNotification.ts

import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { notificationService } from "./notification.service";
import { PaginationParams } from "@/types/api";

export const notificationKeys = {
    all: ["notifications"] as const,
    list: (params: PaginationParams) =>
        [...notificationKeys.all, "list", params] as const,
    infiniteList: (params: Omit<PaginationParams, "page">) =>
        [...notificationKeys.all, "infinite-list", params] as const,
    unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

export function useNotifications(params: PaginationParams = {}) {
    return useQuery({
        queryKey: notificationKeys.list(params),
        queryFn: () => notificationService.getMyNotifications(params),
    });
}

export function useInfiniteNotifications(
    params: Omit<PaginationParams, "page"> = {}
) {
    return useInfiniteQuery({
        queryKey: notificationKeys.infiniteList(params),
        initialPageParam: 0,
        queryFn: ({ pageParam }) =>
            notificationService.getMyNotifications({
                ...params,
                page: pageParam,
            }),
        getNextPageParam: (lastPage) => {
            if (lastPage.last) {
                return undefined;
            }

            return lastPage.currentPage + 1;
        },
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