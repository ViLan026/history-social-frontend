import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from './role.service';
import { RoleCreationRequest, RoleUpdateRequest } from '@/features/user/user.types';

export const ROLE_QUERY_KEYS = {
  all: ['roles'] as const,
  detail: (id: string) => [...ROLE_QUERY_KEYS.all, id] as const,
};

export const useRoles = () => {
  return useQuery({
    queryKey: ROLE_QUERY_KEYS.all,
    queryFn: () => roleService.getAllRoles(),
  });
};

export const useRole = (id: string) => {
  return useQuery({
    queryKey: ROLE_QUERY_KEYS.detail(id),
    queryFn: () => roleService.getRoleById(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleCreationRequest) => roleService.createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.all });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RoleUpdateRequest }) => roleService.updateRole(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.all });
    },
  });
};