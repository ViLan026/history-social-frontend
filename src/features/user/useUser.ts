// src/features/user/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from './user.service';
import { GetUsersParams } from '@/types/user';

// Keys để React Query quản lý cache
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: GetUsersParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// --- QUERIES (Lấy dữ liệu) ---

export const useGetUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userService.getAllUsers(params),
    placeholderData: (previousData) => previousData, // Giữ data cũ khi đang chuyển trang (tránh giật UI)
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id, // Chỉ gọi API khi id tồn tại
  });
};

// --- MUTATIONS (Thêm/Sửa/Xóa dữ liệu) ---

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      // Báo cho React Query biết danh sách user đã thay đổi để gọi lại API
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof userService.updateUser>[1]) => 
      userService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Cập nhật lại cache chi tiết của user này
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      // Xóa cache danh sách để load lại data mới nhất
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useChangePassword = (id: string) => {
  return useMutation({
    mutationFn: (data: Parameters<typeof userService.changePassword>[1]) =>
      userService.changePassword(id, data),
  });
};

export const useLockUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => userService.lockUser(id),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUnlockUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => userService.unlockUser(id),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};