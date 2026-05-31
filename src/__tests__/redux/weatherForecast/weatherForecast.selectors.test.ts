import * as selectors from 'redux/weatherForecast/weatherForecast.selectors';
import type { WeatherForecastState } from 'redux/weatherForecast/weatherForecast.types';
import { mockForecast, mockForecasts } from '__mocks__/WeatherForecast/MockData';

const INITIAL_SLICE: WeatherForecastState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

const buildState = (overrides: Partial<WeatherForecastState> = {}) => ({
  weatherForecast: { ...INITIAL_SLICE, ...overrides },
});

describe('weatherForecast selectors test', () => {
  it('should select all forecasts from items', () => {
    expect(selectors.selectAllForecasts(buildState({ items: mockForecasts }))).toEqual(
      mockForecasts,
    );
  });

  it('should return an empty array when no forecasts are loaded', () => {
    expect(selectors.selectAllForecasts(buildState())).toEqual([]);
  });

  it('should select the selected forecast', () => {
    expect(selectors.selectSelectedForecast(buildState({ selected: mockForecast }))).toEqual(
      mockForecast,
    );
  });

  it('should return null when nothing is selected', () => {
    expect(selectors.selectSelectedForecast(buildState())).toBeNull();
  });

  it('should select the loading flag (true)', () => {
    expect(selectors.selectForecastLoading(buildState({ loading: true }))).toBe(true);
  });

  it('should select the loading flag (false)', () => {
    expect(selectors.selectForecastLoading(buildState({ loading: false }))).toBe(false);
  });

  it('should select the error message', () => {
    expect(selectors.selectForecastError(buildState({ error: 'boom' }))).toBe('boom');
  });

  it('should return null for error when no error is present', () => {
    expect(selectors.selectForecastError(buildState())).toBeNull();
  });

  it('should derive forecast count from items length', () => {
    expect(selectors.selectForecastCount(buildState({ items: mockForecasts }))).toBe(
      mockForecasts.length,
    );
  });

  it('should return 0 for forecast count when items is empty', () => {
    expect(selectors.selectForecastCount(buildState())).toBe(0);
  });
});
