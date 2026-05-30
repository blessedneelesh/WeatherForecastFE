import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner, Title2, Body1, Caption1 } from '@fluentui/react-components';
import {
  createRequest,
  deleteRequest,
  fetchAllRequest,
  fetchByIdRequest,
} from '../../redux/weatherForecast/weatherForecast.actions';
import {
  selectAllForecasts,
  selectForecastError,
  selectForecastLoading,
  selectSelectedForecast,
} from '../../redux/weatherForecast/weatherForecast.selectors';
import { ForecastCreateForm } from './ForecastCreateForm';

export function WeatherForecastView() {
  const dispatch = useDispatch();
  const items = useSelector(selectAllForecasts);
  const selected = useSelector(selectSelectedForecast);
  const loading = useSelector(selectForecastLoading);
  const error = useSelector(selectForecastError);

  useEffect(() => {
    dispatch(fetchAllRequest());
  }, [dispatch]);

  return (
    <div style={{ display: 'grid', gap: 16, padding: 16 }}>
      <Title2>Weather forecasts</Title2>
      <ForecastCreateForm
        disabled={loading}
        onSubmit={(payload) => dispatch(createRequest(payload))}
      />
      {loading && <Spinner label="Loading…" />}
      {error && <Caption1 style={{ color: 'crimson' }}>Error: {error}</Caption1>}

      <section>
        <Body1 as="h3" block>All forecasts ({items.length})</Body1>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 4 }}>
          {items.map((f) => (
            <li key={f.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ flex: 1 }}>
                {f.date} — {f.temperatureC}°C / {f.temperatureF}°F — {f.summary}
              </span>
              <Button size="small" onClick={() => dispatch(fetchByIdRequest(f.id))}>View</Button>
              <Button size="small" onClick={() => dispatch(deleteRequest(f.id))}>Delete</Button>
            </li>
          ))}
        </ul>
      </section>

      {selected && (
        <section style={{ padding: 12, border: '1px solid #ddd', borderRadius: 4 }}>
          <Body1 as="h3" block>Selected forecast</Body1>
          <div>ID: {selected.id}</div>
          <div>Date: {selected.date}</div>
          <div>Temp: {selected.temperatureC}°C / {selected.temperatureF}°F</div>
          <div>Summary: {selected.summary}</div>
        </section>
      )}
    </div>
  );
}
