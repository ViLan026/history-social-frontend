import { useQuery } from "@tanstack/react-query";
import { onThisDayService } from "./onthisday.service";

export const ON_THIS_DAY_QUERY_KEYS = {
  today: ["onThisDay", "today"] as const,
};

export const useTodayEvents = () => {
  return useQuery({
    queryKey: ON_THIS_DAY_QUERY_KEYS.today,
    queryFn: onThisDayService.getTodayEvents,
  });
};