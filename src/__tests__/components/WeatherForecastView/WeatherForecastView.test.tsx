import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { WeatherForecastView } from 'components/WeatherForecastView/WeatherForecastView';
import {
  FETCH_ALL_REQUEST,
} from 'redux/weatherForecast/weatherForecast.types';
import type { WeatherForecastState } from 'redux/weatherForecast/weatherForecast.types';
import { mockForecast, mockForecasts } from '__mocks__/WeatherForecast/MockData';

const mockStore = createMockStore();

const INITIAL_SLICE: WeatherForecastState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

const buildStoreState = (overrides: Partial<WeatherForecastState> = {}) => ({
  weatherForecast: { ...INITIAL_SLICE, ...overrides },
});

describe('WeatherForecastView Test', () => {
  test('should render WeatherForecastView', () => {
    const store = mockStore(buildStoreState());
    render(
      <Provider store={store}>
        <WeatherForecastView />
      </Provider>,
    );
    expect(screen).toBeTruthy();
  });

  test('should dispatch FETCH_ALL_REQUEST on mount', () => {
    const store = mockStore(buildStoreState());
    render(
      <Provider store={store}>
        <WeatherForecastView />
      </Provider>,
    );
    expect(store.getActions()).toContainEqual({ type: FETCH_ALL_REQUEST });
  });

  test('should render the forecast count from items in the store', () => {
    const store = mockStore(buildStoreState({ items: mockForecasts }));
    render(
      <Provider store={store}>
        <WeatherForecastView />
      </Provider>,
    );
    expect(screen.getByText(/All forecasts \(2\)/)).toBeInTheDocument();
  });

  test('should render the selected forecast block when a forecast is selected', () => {
    const store = mockStore(
      buildStoreState({ items: [mockForecast], selected: mockForecast }),
    );
    render(
      <Provider store={store}>
        <WeatherForecastView />
      </Provider>,
    );
    expect(screen.getByText('Selected forecast')).toBeInTheDocument();
    expect(screen.getByText(`ID: ${mockForecast.id}`)).toBeInTheDocument();
  });

  test('should render the error message when error is present in store', () => {
    const store = mockStore(buildStoreState({ error: 'API down' }));
    render(
      <Provider store={store}>
        <WeatherForecastView />
      </Provider>,
    );
    expect(screen.getByText(/Error: API down/)).toBeInTheDocument();
  });

  test('should not render the selected forecast block when nothing is selected', () => {
    const store = mockStore(buildStoreState({ items: mockForecasts }));
    render(
      <Provider store={store}>
        <WeatherForecastView />
      </Provider>,
    );
    expect(screen.queryByText('Selected forecast')).not.toBeInTheDocument();
  });
});
