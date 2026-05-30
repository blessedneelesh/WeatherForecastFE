import { all, fork } from 'redux-saga/effects';
import weatherForecastSaga from './weatherForecast/weatherForecast.sagas';

// ───────────────────────────────────────────────────────────────────────────
// Registration Step 2 of 2 — fork new sagas here.
// When you add a feature slice, fork its watcher saga below to make its
// request actions live.
// ───────────────────────────────────────────────────────────────────────────
export default function* rootSaga(): Generator {
  yield all([fork(weatherForecastSaga)]);
}
