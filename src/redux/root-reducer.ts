import { combineReducers } from 'redux';
import { weatherForecastReducer } from './weatherForecast/weatherForecast.reducer';

// ───────────────────────────────────────────────────────────────────────────
// Registration Step 1 of 2 — add new reducers here.
// When you add a feature slice, import its reducer and register it below,
// then complete Step 2 in root-saga.ts.
// ───────────────────────────────────────────────────────────────────────────
export const rootReducer = combineReducers({
  weatherForecast: weatherForecastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
