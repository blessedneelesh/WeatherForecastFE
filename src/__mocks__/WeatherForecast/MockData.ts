import type {
  WeatherForecastDTO,
  CreateWeatherForecastDTO,
  UpdateWeatherForecastDTO,
} from 'services/weatherForecast/weatherForecast.dto';

export const mockForecast: WeatherForecastDTO = {
  id: 'forecast-1',
  date: '2026-05-30',
  temperatureC: 22,
  temperatureF: 71,
  summary: 'Mild',
};

export const mockForecast2: WeatherForecastDTO = {
  id: 'forecast-2',
  date: '2026-05-31',
  temperatureC: 28,
  temperatureF: 82,
  summary: 'Warm',
};

export const mockForecasts: WeatherForecastDTO[] = [mockForecast, mockForecast2];

export const mockCreatePayload: CreateWeatherForecastDTO = {
  date: '2026-06-01',
  temperatureC: 25,
  summary: 'Sunny',
};

export const mockUpdatePayload: UpdateWeatherForecastDTO = {
  id: 'forecast-1',
  date: '2026-05-30',
  temperatureC: 24,
  summary: 'Updated',
};
