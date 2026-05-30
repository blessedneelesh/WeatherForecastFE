import { all, call, put, takeLatest } from 'redux-saga/effects';
import type { ApiError } from '../../services/ApiService';
import * as svc from '../../services/weatherForecast/weatherForecast.service';
import type { WeatherForecastDTO } from '../../services/weatherForecast/weatherForecast.dto';
import * as A from './weatherForecast.actions';
import * as T from './weatherForecast.types';

const getErrorMessage = (e: unknown): string => {
  const err = e as ApiError | Error | undefined;
  if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
    return err.message;
  }
  return 'Unexpected error';
};

function* fetchAll(): Generator {
  try {
    const items = (yield call(svc.getAll)) as WeatherForecastDTO[];
    yield put(A.fetchAllSuccess(items));
  } catch (e) {
    yield put(A.fetchAllFailure(getErrorMessage(e)));
  }
}

function* fetchById(action: ReturnType<typeof A.fetchByIdRequest>): Generator {
  try {
    const item = (yield call(svc.getById, action.payload)) as WeatherForecastDTO;
    yield put(A.fetchByIdSuccess(item));
  } catch (e) {
    yield put(A.fetchByIdFailure(getErrorMessage(e)));
  }
}

function* createForecast(action: ReturnType<typeof A.createRequest>): Generator {
  try {
    const item = (yield call(svc.create, action.payload)) as WeatherForecastDTO;
    yield put(A.createSuccess(item));
  } catch (e) {
    yield put(A.createFailure(getErrorMessage(e)));
  }
}

function* updateForecast(action: ReturnType<typeof A.updateRequest>): Generator {
  try {
    const { id, ...rest } = action.payload;
    const item = (yield call(svc.update, id, { id, ...rest })) as WeatherForecastDTO;
    yield put(A.updateSuccess(item));
  } catch (e) {
    yield put(A.updateFailure(getErrorMessage(e)));
  }
}

function* deleteForecast(action: ReturnType<typeof A.deleteRequest>): Generator {
  try {
    yield call(svc.remove, action.payload);
    yield put(A.deleteSuccess(action.payload));
  } catch (e) {
    yield put(A.deleteFailure(getErrorMessage(e)));
  }
}

export default function* weatherForecastSaga(): Generator {
  yield all([
    takeLatest(T.FETCH_ALL_REQUEST, fetchAll),
    takeLatest(T.FETCH_BY_ID_REQUEST, fetchById),
    takeLatest(T.CREATE_REQUEST, createForecast),
    takeLatest(T.UPDATE_REQUEST, updateForecast),
    takeLatest(T.DELETE_REQUEST, deleteForecast),
  ]);
}
