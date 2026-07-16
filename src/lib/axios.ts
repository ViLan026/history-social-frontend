import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/features/auth/auth.store";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured.");
}

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "X-Tunnel-Skip-AntiPhishing-Page": "true",
  },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<void> | null = null;
let isRefreshing = false;

let failedQueue: {
  resolve: () => void;
  reject: (error: unknown) => void;
}[] = [];

export const refreshAccessToken = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post("/auth/refresh", {})
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((item) => {
    if (error) item.reject(error);
    else item.resolve();
  });

  failedQueue = [];
};

const isPublicPath = (pathname: string) =>
  pathname === "/" ||
  pathname === "/login" ||
  pathname === "/register" ||
  pathname === "/on-this-day" ||
  pathname.startsWith("/posts/");

const redirectToLogin = () => {
  useAuthStore.getState().logout();

  if (typeof window === "undefined") return;

  if (!isPublicPath(window.location.pathname)) {
    window.location.href = "/login";
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const requestUrl = originalRequest.url ?? "";

    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh");

    if ((status !== 401 && status !== 403) || isAuthRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      redirectToLogin();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(axiosInstance(originalRequest)),
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshAccessToken();
      useAuthStore.getState().setAuth(true);
      processQueue();

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