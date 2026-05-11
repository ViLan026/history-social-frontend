// src/features/onthisday/useOnThisDay.ts
import { useQuery } from '@tanstack/react-query';
import { onThisDayService } from './onthisday.service';

export const ON_THIS_DAY_QUERY_KEYS = {
  all: ['onThisDay'] as const,
} as const;


export const useOnThisDayEvents = (params?: {
  page?: number;
  size?: number;
  year?: number;
}) => {
  return useQuery({
    queryKey: [...ON_THIS_DAY_QUERY_KEYS.all, 'list', params],
    queryFn: () => onThisDayService.getAllEvents(params),
  });
};
