import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { store } from './redux/store';
import { App } from './dashboard/App';

export function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FluentProvider theme={webLightTheme}>
          <App />
        </FluentProvider>
      </BrowserRouter>
    </Provider>
  );
}
