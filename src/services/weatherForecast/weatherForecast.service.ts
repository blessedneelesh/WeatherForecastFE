import ApiService from '../ApiService';
import type {
  CreateWeatherForecastDTO,
  UpdateWeatherForecastDTO,
  WeatherForecastDTO,
} from './weatherForecast.dto';

const ROOT = '/api/WeatherForecasts';

export const getAll = async (): Promise<WeatherForecastDTO[]> => {
  const { data } = await ApiService.get<WeatherForecastDTO[]>(ROOT);
  return data;
};

export const getById = async (id: string): Promise<WeatherForecastDTO> => {
  const { data } = await ApiService.get<WeatherForecastDTO>(`${ROOT}/${id}`);
  return data;
};

export const create = async (payload: CreateWeatherForecastDTO): Promise<WeatherForecastDTO> => {
  const { data } = await ApiService.post<WeatherForecastDTO>(ROOT, payload);
  return data;
};

export const update = async (
  id: string,
  payload: UpdateWeatherForecastDTO,
): Promise<WeatherForecastDTO> => {
  const { data } = await ApiService.put<WeatherForecastDTO>(`${ROOT}/${id}`, payload);
  return data;
};

export const remove = async (id: string): Promise<void> => {
  await ApiService.delete(`${ROOT}/${id}`);
};
