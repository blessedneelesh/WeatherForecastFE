import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

export interface ApiError {
  status: number;
  message: string;
  detail?: unknown;
}

const AUTH_TOKEN_KEY = 'weatherforecast.authToken';

const ApiService: AxiosInstance = axios.create({
  baseURL: env.WEATHER_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

ApiService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

ApiService.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: unknown }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    const normalized: ApiError = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? error.message ?? 'Unknown error',
      detail: error.response?.data?.detail,
    };
    return Promise.reject(normalized);
  },
);

export default ApiService;
