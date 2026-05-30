import type {
  CreateWeatherForecastDTO,
  UpdateWeatherForecastDTO,
  WeatherForecastDTO,
} from '../../services/weatherForecast/weatherForecast.dto';
import * as T from './weatherForecast.types';

export const fetchAllRequest = () => ({ type: T.FETCH_ALL_REQUEST } as const);
export const fetchAllSuccess = (items: WeatherForecastDTO[]) =>
  ({ type: T.FETCH_ALL_SUCCESS, payload: items } as const);
export const fetchAllFailure = (error: string) =>
  ({ type: T.FETCH_ALL_FAILURE, payload: error } as const);

export const fetchByIdRequest = (id: string) =>
  ({ type: T.FETCH_BY_ID_REQUEST, payload: id } as const);
export const fetchByIdSuccess = (item: WeatherForecastDTO) =>
  ({ type: T.FETCH_BY_ID_SUCCESS, payload: item } as const);
export const fetchByIdFailure = (error: string) =>
  ({ type: T.FETCH_BY_ID_FAILURE, payload: error } as const);

export const createRequest = (payload: CreateWeatherForecastDTO) =>
  ({ type: T.CREATE_REQUEST, payload } as const);
export const createSuccess = (item: WeatherForecastDTO) =>
  ({ type: T.CREATE_SUCCESS, payload: item } as const);
export const createFailure = (error: string) =>
  ({ type: T.CREATE_FAILURE, payload: error } as const);

export const updateRequest = (payload: UpdateWeatherForecastDTO) =>
  ({ type: T.UPDATE_REQUEST, payload } as const);
export const updateSuccess = (item: WeatherForecastDTO) =>
  ({ type: T.UPDATE_SUCCESS, payload: item } as const);
export const updateFailure = (error: string) =>
  ({ type: T.UPDATE_FAILURE, payload: error } as const);

export const deleteRequest = (id: string) =>
  ({ type: T.DELETE_REQUEST, payload: id } as const);
export const deleteSuccess = (id: string) =>
  ({ type: T.DELETE_SUCCESS, payload: id } as const);
export const deleteFailure = (error: string) =>
  ({ type: T.DELETE_FAILURE, payload: error } as const);

export type WeatherForecastAction =
  | ReturnType<typeof fetchAllRequest>
  | ReturnType<typeof fetchAllSuccess>
  | ReturnType<typeof fetchAllFailure>
  | ReturnType<typeof fetchByIdRequest>
  | ReturnType<typeof fetchByIdSuccess>
  | ReturnType<typeof fetchByIdFailure>
  | ReturnType<typeof createRequest>
  | ReturnType<typeof createSuccess>
  | ReturnType<typeof createFailure>
  | ReturnType<typeof updateRequest>
  | ReturnType<typeof updateSuccess>
  | ReturnType<typeof updateFailure>
  | ReturnType<typeof deleteRequest>
  | ReturnType<typeof deleteSuccess>
  | ReturnType<typeof deleteFailure>;
