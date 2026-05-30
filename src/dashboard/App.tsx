import { Route, Routes } from 'react-router-dom';
import { LayoutBase } from '../shared/common/layout/LayoutBase';
import { WelcomeMessage } from '../shared/common/WelcomeMessage';
import { WeatherForecastView } from '../components/WeatherForecastView/WeatherForecastView';

export function App() {
  return (
    <LayoutBase>
      <Routes>
        <Route path="/" element={<WeatherForecastView />} />
        <Route path="*" element={<WelcomeMessage />} />
      </Routes>
    </LayoutBase>
  );
}
