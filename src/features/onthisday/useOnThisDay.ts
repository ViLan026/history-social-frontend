// history-social-frontend\src\features\onthisday\useOnThisDay.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { onThisDayService } from "./onthisday.service";
import { PaginationParams } from "@/types/api";

export const ON_THIS_DAY_QUERY_KEYS = {
  today: ["onThisDay", "today"] as const,
  // Thêm base key cho admin để dễ dàng invalidate toàn bộ danh sách khi có thay đổi (thêm/sửa/xóa)
  adminBase: ["onThisDay", "admin"] as const, 
  adminList: (params: PaginationParams) => ["onThisDay", "admin", "list", params] as const,
};

// Hook lấy sự kiện hôm nay (Public)
export const useTodayEvents = () => {
  return useQuery({
    queryKey: ON_THIS_DAY_QUERY_KEYS.today,
    queryFn: onThisDayService.getTodayEvents,
  });
};

// Hook cho admin 
export const useAdminOnThisDayList = (params: PaginationParams) => {
  return useQuery({
    queryKey: ON_THIS_DAY_QUERY_KEYS.adminList(params),
    queryFn: () => onThisDayService.getAllAdminEvents(params),
  });
};

export const useCreateOnThisDay = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: onThisDayService.createEvent,
    onSuccess: () => {
      // Làm mới danh sách admin sau khi tạo thành công
      queryClient.invalidateQueries({ queryKey: ON_THIS_DAY_QUERY_KEYS.adminBase });
    },
  });
};

export const useUpdateOnThisDay = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: onThisDayService.updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ON_THIS_DAY_QUERY_KEYS.adminBase });
      // Cập nhật xong thì làm mới luôn danh sách hiển thị public ở trang chủ (nếu trùng ngày)
      queryClient.invalidateQueries({ queryKey: ON_THIS_DAY_QUERY_KEYS.today });
    },
  });
};

export const useDeleteOnThisDay = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: onThisDayService.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ON_THIS_DAY_QUERY_KEYS.adminBase });
      queryClient.invalidateQueries({ queryKey: ON_THIS_DAY_QUERY_KEYS.today });
    },
  });
};