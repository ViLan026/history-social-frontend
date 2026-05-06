import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from './user.service';
import { GetUsersParams, UserUpdateRequest, ChangePasswordRequest } from '@/features/user/user.types';
import { useAuthStore } from '@/features/auth/auth.store';
import { useUserStore } from './user.store';

export const USER_QUERY_KEYS = {
  all: ['users'] as const,
  lists: () => [...USER_QUERY_KEYS.all, 'list'] as const,
  list: (params: GetUsersParams) => [...USER_QUERY_KEYS.lists(), params] as const,
  details: () => [...USER_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...USER_QUERY_KEYS.details(), id] as const,
};

//  Hook lấy danh sách User
export const useUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.list(params),
    queryFn: () => userService.getAllUsers(params),
  });
};

//  Hook lấy chi tiết User
export const useUser = (id: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuthStore();
  const { setCurrentUser, setLoading, clearUser } = useUserStore();

  return useQuery({
    queryKey: ['current-user'],
    enabled: isAuthenticated,
    retry: 1,

    queryFn: async () => {
      try {
        setLoading(true);
        const data = await userService.getMe();
        setCurrentUser(data);
        return data;
      } catch (error) {
        clearUser();
        throw error; 
      }
    },
  });
};


//  Hook cập nhật thông tin User
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdateRequest }) => 
      userService.updateUser(id, data),
    onSuccess: (updatedUser, variables) => {
      queryClient.setQueryData(
        USER_QUERY_KEYS.detail(variables.id), 
        updatedUser 
      );
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
  });
};

//  Hook đổi mật khẩu
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ChangePasswordRequest }) => 
      userService.changePassword(id, data),
  });
};

//  Hook khóa User (Dành cho Admin)
export const useLockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.lockUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
  });
};

//  Hook mở khóa User (Dành cho Admin)
export const useUnlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.unlockUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
  });
};

export const useFollowing = (userId: string) => {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: () => userService.getAllUsers({ 
      keyword: userId, 
      page: 1, 
      size: 50 
    }),
    enabled: !!userId,
  });
};