export interface WeatherForecastDTO {
  id: string;
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export type CreateWeatherForecastDTO = Omit<WeatherForecastDTO, 'id' | 'temperatureF'>;

export type UpdateWeatherForecastDTO = Omit<WeatherForecastDTO, 'temperatureF'>;
