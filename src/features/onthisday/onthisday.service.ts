// src/features/onthisday/onthisday.service.ts
import { axiosInstance } from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { ApiResponse } from '@/types/api';
import {  OnThisDayResponse } from './onthisday.types';

export const onThisDayService = {

  getAllEvents: async (params?: {
    page?: number;
    size?: number;
    year?: number;
  }): Promise<OnThisDayResponse> => {
    const response = await axiosInstance.get<ApiResponse<OnThisDayResponse>>(
      API_ENDPOINTS.ON_THIS_DAY.BASE,
      { params }
    );
    return response.data.data;
  },


};