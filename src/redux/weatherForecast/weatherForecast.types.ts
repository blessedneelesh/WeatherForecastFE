import type { WeatherForecastDTO } from '../../services/weatherForecast/weatherForecast.dto';

export const FETCH_ALL_REQUEST = 'weatherForecast/FETCH_ALL_REQUEST';
export const FETCH_ALL_SUCCESS = 'weatherForecast/FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAILURE = 'weatherForecast/FETCH_ALL_FAILURE';

export const FETCH_BY_ID_REQUEST = 'weatherForecast/FETCH_BY_ID_REQUEST';
export const FETCH_BY_ID_SUCCESS = 'weatherForecast/FETCH_BY_ID_SUCCESS';
export const FETCH_BY_ID_FAILURE = 'weatherForecast/FETCH_BY_ID_FAILURE';

export const CREATE_REQUEST = 'weatherForecast/CREATE_REQUEST';
export const CREATE_SUCCESS = 'weatherForecast/CREATE_SUCCESS';
export const CREATE_FAILURE = 'weatherForecast/CREATE_FAILURE';

export const UPDATE_REQUEST = 'weatherForecast/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'weatherForecast/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'weatherForecast/UPDATE_FAILURE';

export const DELETE_REQUEST = 'weatherForecast/DELETE_REQUEST';
export const DELETE_SUCCESS = 'weatherForecast/DELETE_SUCCESS';
export const DELETE_FAILURE = 'weatherForecast/DELETE_FAILURE';

export interface WeatherForecastState {
  items: WeatherForecastDTO[];
  selected: WeatherForecastDTO | null;
  loading: boolean;
  error: string | null;
}
