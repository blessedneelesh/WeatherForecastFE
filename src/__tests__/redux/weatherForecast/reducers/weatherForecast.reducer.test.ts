import { weatherForecastReducer } from 'redux/weatherForecast/weatherForecast.reducer';
import * as A from 'redux/weatherForecast/weatherForecast.actions';
import type { WeatherForecastState } from 'redux/weatherForecast/weatherForecast.types';
import {
  mockForecast,
  mockForecast2,
  mockForecasts,
  mockCreatePayload,
  mockUpdatePayload,
} from '__mocks__/WeatherForecast/MockData';

const INITIAL_STATE: WeatherForecastState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

describe('weatherForecast reducer test', () => {
  it('should return initial state when called with undefined state', () => {
    expect(weatherForecastReducer(undefined, { type: '@@INIT' } as never)).toEqual(INITIAL_STATE);
  });

  describe('request actions', () => {
    it('should set loading=true and clear error on FETCH_ALL_REQUEST', () => {
      const previous: WeatherForecastState = { ...INITIAL_STATE, error: 'stale error' };
      expect(weatherForecastReducer(previous, A.fetchAllRequest())).toEqual({
        ...INITIAL_STATE,
        loading: true,
      });
    });

    it('should set loading=true on FETCH_BY_ID_REQUEST', () => {
      expect(
        weatherForecastReducer(INITIAL_STATE, A.fetchByIdRequest(mockForecast.id)),
      ).toEqual({ ...INITIAL_STATE, loading: true });
    });

    it('should set loading=true on CREATE_REQUEST', () => {
      expect(
        weatherForecastReducer(INITIAL_STATE, A.createRequest(mockCreatePayload)),
      ).toEqual({ ...INITIAL_STATE, loading: true });
    });

    it('should set loading=true on UPDATE_REQUEST', () => {
      expect(
        weatherForecastReducer(INITIAL_STATE, A.updateRequest(mockUpdatePayload)),
      ).toEqual({ ...INITIAL_STATE, loading: true });
    });

    it('should set loading=true on DELETE_REQUEST', () => {
      expect(
        weatherForecastReducer(INITIAL_STATE, A.deleteRequest(mockForecast.id)),
      ).toEqual({ ...INITIAL_STATE, loading: true });
    });
  });

  describe('success actions', () => {
    it('should set items and clear loading on FETCH_ALL_SUCCESS', () => {
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, loading: true },
          A.fetchAllSuccess(mockForecasts),
        ),
      ).toEqual({ ...INITIAL_STATE, items: mockForecasts });
    });

    it('should set selected and clear loading on FETCH_BY_ID_SUCCESS', () => {
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, loading: true },
          A.fetchByIdSuccess(mockForecast),
        ),
      ).toEqual({ ...INITIAL_STATE, selected: mockForecast });
    });

    it('should append the new item on CREATE_SUCCESS', () => {
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, items: [mockForecast], loading: true },
          A.createSuccess(mockForecast2),
        ),
      ).toEqual({ ...INITIAL_STATE, items: [mockForecast, mockForecast2] });
    });

    it('should replace matching item on UPDATE_SUCCESS', () => {
      const updated = { ...mockForecast, summary: 'Updated' };
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, items: [mockForecast, mockForecast2], loading: true },
          A.updateSuccess(updated),
        ),
      ).toEqual({ ...INITIAL_STATE, items: [updated, mockForecast2] });
    });

    it('should also update selected when its id matches on UPDATE_SUCCESS', () => {
      const updated = { ...mockForecast, summary: 'Updated' };
      expect(
        weatherForecastReducer(
          {
            ...INITIAL_STATE,
            items: [mockForecast],
            selected: mockForecast,
            loading: true,
          },
          A.updateSuccess(updated),
        ),
      ).toEqual({ ...INITIAL_STATE, items: [updated], selected: updated });
    });

    it('should leave selected alone on UPDATE_SUCCESS when its id does not match', () => {
      const updated = { ...mockForecast, summary: 'Updated' };
      expect(
        weatherForecastReducer(
          {
            ...INITIAL_STATE,
            items: [mockForecast, mockForecast2],
            selected: mockForecast2,
            loading: true,
          },
          A.updateSuccess(updated),
        ),
      ).toEqual({
        ...INITIAL_STATE,
        items: [updated, mockForecast2],
        selected: mockForecast2,
      });
    });

    it('should filter out the deleted item on DELETE_SUCCESS', () => {
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, items: [mockForecast, mockForecast2], loading: true },
          A.deleteSuccess(mockForecast.id),
        ),
      ).toEqual({ ...INITIAL_STATE, items: [mockForecast2] });
    });

    it('should clear selected on DELETE_SUCCESS when its id matches', () => {
      expect(
        weatherForecastReducer(
          {
            ...INITIAL_STATE,
            items: [mockForecast],
            selected: mockForecast,
            loading: true,
          },
          A.deleteSuccess(mockForecast.id),
        ),
      ).toEqual({ ...INITIAL_STATE, items: [], selected: null });
    });

    it('should leave selected alone on DELETE_SUCCESS when its id does not match', () => {
      expect(
        weatherForecastReducer(
          {
            ...INITIAL_STATE,
            items: [mockForecast, mockForecast2],
            selected: mockForecast2,
            loading: true,
          },
          A.deleteSuccess(mockForecast.id),
        ),
      ).toEqual({
        ...INITIAL_STATE,
        items: [mockForecast2],
        selected: mockForecast2,
      });
    });
  });

  describe('failure actions', () => {
    it('should set error and clear loading on FETCH_ALL_FAILURE', () => {
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, loading: true },
          A.fetchAllFailure('network down'),
        ),
      ).toEqual({ ...INITIAL_STATE, error: 'network down' });
    });

    it('should set error on CREATE_FAILURE', () => {
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, loading: true },
          A.createFailure('validation failed'),
        ),
      ).toEqual({ ...INITIAL_STATE, error: 'validation failed' });
    });

    it('should set error on DELETE_FAILURE', () => {
      expect(
        weatherForecastReducer(
          { ...INITIAL_STATE, loading: true },
          A.deleteFailure('forbidden'),
        ),
      ).toEqual({ ...INITIAL_STATE, error: 'forbidden' });
    });
  });

  describe('unknown action', () => {
    it('should return current state unchanged', () => {
      const state: WeatherForecastState = {
        ...INITIAL_STATE,
        items: mockForecasts,
      };
      expect(weatherForecastReducer(state, { type: 'UNKNOWN/ACTION' } as never)).toBe(state);
    });
  });
});
