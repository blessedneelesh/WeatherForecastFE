import type { Reducer } from 'redux';
import type { WeatherForecastAction } from './weatherForecast.actions';
import {
  CREATE_FAILURE, CREATE_REQUEST, CREATE_SUCCESS,
  DELETE_FAILURE, DELETE_REQUEST, DELETE_SUCCESS,
  FETCH_ALL_FAILURE, FETCH_ALL_REQUEST, FETCH_ALL_SUCCESS,
  FETCH_BY_ID_FAILURE, FETCH_BY_ID_REQUEST, FETCH_BY_ID_SUCCESS,
  UPDATE_FAILURE, UPDATE_REQUEST, UPDATE_SUCCESS,
  type WeatherForecastState,
} from './weatherForecast.types';

const initialState: WeatherForecastState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

const loading = (s: WeatherForecastState): WeatherForecastState =>
  ({ ...s, loading: true, error: null });

const fail = (s: WeatherForecastState, error: string): WeatherForecastState =>
  ({ ...s, loading: false, error });

export const weatherForecastReducer: Reducer<WeatherForecastState, WeatherForecastAction> = (
  state = initialState,
  action,
): WeatherForecastState => {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
    case FETCH_BY_ID_REQUEST:
    case CREATE_REQUEST:
    case UPDATE_REQUEST:
    case DELETE_REQUEST:
      return loading(state);

    case FETCH_ALL_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_BY_ID_SUCCESS:
      return { ...state, loading: false, selected: action.payload };
    case CREATE_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload] };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((i) => (i.id === action.payload.id ? action.payload : i)),
        selected: state.selected?.id === action.payload.id ? action.payload : state.selected,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((i) => i.id !== action.payload),
        selected: state.selected?.id === action.payload ? null : state.selected,
      };

    case FETCH_ALL_FAILURE:
    case FETCH_BY_ID_FAILURE:
    case CREATE_FAILURE:
    case UPDATE_FAILURE:
    case DELETE_FAILURE:
      return fail(state, action.payload);

    default:
      return state;
  }
};
