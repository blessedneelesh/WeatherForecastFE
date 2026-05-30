import axios, { AxiosError, type AxiosInstance } from 'axios';
import { env } from '../config/env';

export interface ApiError {
  status: number;
  message: string;
  detail?: unknown;
}

const ApiService: AxiosInstance = axios.create({
  baseURL: env.WEATHER_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

ApiService.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; detail?: unknown }>) => {
    const normalized: ApiError = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? error.message ?? 'Unknown error',
      detail: error.response?.data?.detail,
    };
    return Promise.reject(normalized);
  },
);

export default ApiService;
