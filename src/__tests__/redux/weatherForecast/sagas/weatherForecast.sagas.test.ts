import { all, call, put, takeLatest } from 'redux-saga/effects';
import weatherForecastSaga, * as sagas from 'redux/weatherForecast/weatherForecast.sagas';
import * as A from 'redux/weatherForecast/weatherForecast.actions';
import * as svc from 'services/weatherForecast/weatherForecast.service';
import {
  FETCH_ALL_REQUEST,
  FETCH_BY_ID_REQUEST,
  CREATE_REQUEST,
  UPDATE_REQUEST,
  DELETE_REQUEST,
} from 'redux/weatherForecast/weatherForecast.types';
import {
  mockForecast,
  mockForecasts,
  mockCreatePayload,
  mockUpdatePayload,
} from '__mocks__/WeatherForecast/MockData';

describe('weatherForecast saga test', () => {
  describe('root watcher (weatherForecastSaga)', () => {
    it('should fork all takeLatest watchers in order', () => {
      const gen = weatherForecastSaga();
      expect(gen.next().value).toEqual(
        all([
          takeLatest(FETCH_ALL_REQUEST, sagas.fetchAll),
          takeLatest(FETCH_BY_ID_REQUEST, sagas.fetchById),
          takeLatest(CREATE_REQUEST, sagas.createForecast),
          takeLatest(UPDATE_REQUEST, sagas.updateForecast),
          takeLatest(DELETE_REQUEST, sagas.deleteForecast),
        ]),
      );
      expect(gen.next().done).toBe(true);
    });
  });

  describe('fetchAll saga', () => {
    it('should call svc.getAll and dispatch fetchAllSuccess on happy path', () => {
      const gen = sagas.fetchAll();
      expect(gen.next().value).toEqual(call(svc.getAll));
      expect(gen.next(mockForecasts).value).toEqual(put(A.fetchAllSuccess(mockForecasts)));
      expect(gen.next().done).toBe(true);
    });

    it('should dispatch fetchAllFailure with the error message on error', () => {
      const gen = sagas.fetchAll();
      gen.next();
      expect(gen.throw({ message: 'network down' }).value).toEqual(
        put(A.fetchAllFailure('network down')),
      );
      expect(gen.next().done).toBe(true);
    });

    it('should fall back to "Unexpected error" when thrown value has no message', () => {
      const gen = sagas.fetchAll();
      gen.next();
      expect(gen.throw('plain string' as never).value).toEqual(
        put(A.fetchAllFailure('Unexpected error')),
      );
    });
  });

  describe('fetchById saga', () => {
    let action: ReturnType<typeof A.fetchByIdRequest>;
    beforeEach(() => {
      action = A.fetchByIdRequest(mockForecast.id);
    });

    it('should call svc.getById with the id and dispatch fetchByIdSuccess', () => {
      const gen = sagas.fetchById(action);
      expect(gen.next().value).toEqual(call(svc.getById, mockForecast.id));
      expect(gen.next(mockForecast).value).toEqual(put(A.fetchByIdSuccess(mockForecast)));
      expect(gen.next().done).toBe(true);
    });

    it('should dispatch fetchByIdFailure on error', () => {
      const gen = sagas.fetchById(action);
      gen.next();
      expect(gen.throw({ message: 'not found' }).value).toEqual(
        put(A.fetchByIdFailure('not found')),
      );
    });
  });

  describe('createForecast saga', () => {
    let action: ReturnType<typeof A.createRequest>;
    beforeEach(() => {
      action = A.createRequest(mockCreatePayload);
    });

    it('should call svc.create with the payload and dispatch createSuccess', () => {
      const gen = sagas.createForecast(action);
      expect(gen.next().value).toEqual(call(svc.create, mockCreatePayload));
      expect(gen.next(mockForecast).value).toEqual(put(A.createSuccess(mockForecast)));
      expect(gen.next().done).toBe(true);
    });

    it('should dispatch createFailure on error', () => {
      const gen = sagas.createForecast(action);
      gen.next();
      expect(gen.throw({ message: 'validation failed' }).value).toEqual(
        put(A.createFailure('validation failed')),
      );
    });
  });

  describe('updateForecast saga', () => {
    let action: ReturnType<typeof A.updateRequest>;
    beforeEach(() => {
      action = A.updateRequest(mockUpdatePayload);
    });

    it('should call svc.update with id and full payload, then dispatch updateSuccess', () => {
      const gen = sagas.updateForecast(action);
      const { id, ...rest } = mockUpdatePayload;
      expect(gen.next().value).toEqual(call(svc.update, id, { id, ...rest }));
      expect(gen.next(mockForecast).value).toEqual(put(A.updateSuccess(mockForecast)));
      expect(gen.next().done).toBe(true);
    });

    it('should dispatch updateFailure on error', () => {
      const gen = sagas.updateForecast(action);
      gen.next();
      expect(gen.throw({ message: 'conflict' }).value).toEqual(
        put(A.updateFailure('conflict')),
      );
    });
  });

  describe('deleteForecast saga', () => {
    let action: ReturnType<typeof A.deleteRequest>;
    beforeEach(() => {
      action = A.deleteRequest(mockForecast.id);
    });

    it('should call svc.remove with the id and dispatch deleteSuccess with the same id', () => {
      const gen = sagas.deleteForecast(action);
      expect(gen.next().value).toEqual(call(svc.remove, mockForecast.id));
      expect(gen.next().value).toEqual(put(A.deleteSuccess(mockForecast.id)));
      expect(gen.next().done).toBe(true);
    });

    it('should dispatch deleteFailure on error', () => {
      const gen = sagas.deleteForecast(action);
      gen.next();
      expect(gen.throw({ message: 'forbidden' }).value).toEqual(
        put(A.deleteFailure('forbidden')),
      );
    });
  });
});
