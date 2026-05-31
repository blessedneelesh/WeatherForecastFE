import { render, screen } from '@testing-library/react';
import { ForecastCreateForm } from 'components/WeatherForecastView/ForecastCreateForm';

describe('ForecastCreateForm Test', () => {
  test('should render ForecastCreateForm', () => {
    render(<ForecastCreateForm disabled={false} onSubmit={() => {}} />);
    expect(screen).toBeTruthy();
  });

  test('should render Date, Temperature, and Summary fields', () => {
    render(<ForecastCreateForm disabled={false} onSubmit={() => {}} />);
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Temperature (°C)')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  test('should render the submit button labeled "Create forecast"', () => {
    render(<ForecastCreateForm disabled={false} onSubmit={() => {}} />);
    expect(screen.getByText('Create forecast')).toBeInTheDocument();
  });

  test('should disable the submit button when the disabled prop is true', () => {
    render(<ForecastCreateForm disabled={true} onSubmit={jest.fn()} />);
    const label = screen.getByText('Create forecast');
    expect(label.closest('button')).toBeDisabled();
  });

  test('should enable the submit button when the disabled prop is false', () => {
    render(<ForecastCreateForm disabled={false} onSubmit={jest.fn()} />);
    const label = screen.getByText('Create forecast');
    expect(label.closest('button')).not.toBeDisabled();
  });
});
