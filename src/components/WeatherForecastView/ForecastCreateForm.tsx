import { useState } from 'react';
import { Button, Field, Input } from '@fluentui/react-components';
import type { CreateWeatherForecastDTO } from '../../services/weatherForecast/weatherForecast.dto';

interface Props {
  disabled: boolean;
  onSubmit: (payload: CreateWeatherForecastDTO) => void;
}

const today = () => new Date().toISOString().slice(0, 10);

export function ForecastCreateForm({ disabled, onSubmit }: Props) {
  const [date, setDate] = useState(today());
  const [temperatureC, setTemperatureC] = useState('20');
  const [summary, setSummary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, temperatureC: Number(temperatureC), summary });
    setSummary('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <Field label="Date">
        <Input type="date" value={date} onChange={(_, d) => setDate(d.value)} />
      </Field>
      <Field label="Temperature (°C)">
        <Input
          type="number"
          value={temperatureC}
          onChange={(_, d) => setTemperatureC(d.value)}
        />
      </Field>
      <Field label="Summary">
        <Input value={summary} onChange={(_, d) => setSummary(d.value)} />
      </Field>
      <Button type="submit" appearance="primary" disabled={disabled}>
        Create forecast
      </Button>
    </form>
  );
}
