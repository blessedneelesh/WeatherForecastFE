import { createSelector } from 'reselect';
import type { RootState } from '../root-reducer';

const slice = (state: RootState) => state.weatherForecast;

export const selectAllForecasts = createSelector(slice, (s) => s.items);
export const selectSelectedForecast = createSelector(slice, (s) => s.selected);
export const selectForecastLoading = createSelector(slice, (s) => s.loading);
export const selectForecastError = createSelector(slice, (s) => s.error);
export const selectForecastCount = createSelector(selectAllForecasts, (items) => items.length);
