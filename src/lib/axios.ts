// lib/axios.ts
import axios from "axios";
import { useAuthStore } from "@/features/auth/auth.store";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Tunnel-Skip-AntiPhishing-Page": "true",
  },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: () => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });

  failedQueue = [];
};

const redirectToLogin = () => {
  useAuthStore.getState().logout();

  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;

    if (currentPath !== "/login" && currentPath !== "/register") {
      window.location.href = "/login";
    }
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh");

    if (status !== 401 || isAuthRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      redirectToLogin();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshClient.post("/auth/refresh", {});

      processQueue(null);

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      redirectToLogin();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);