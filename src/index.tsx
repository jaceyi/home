import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'theme-ui';
import themeConfig from '@/theme.config';

ReactDOM.render(
  <ThemeProvider theme={themeConfig}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
