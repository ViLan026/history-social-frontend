import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { ApiResponse } from "@/types/api";
import { OnThisDayEvent } from "./onthisday.types";

export const onThisDayService = {
  getTodayEvents: async (): Promise<OnThisDayEvent[]> => {
    const response = await axiosInstance.get<ApiResponse<OnThisDayEvent[]>>(
      API_ENDPOINTS.ON_THIS_DAY.TODAY
    );

    return response.data.data ?? [];
  },
};