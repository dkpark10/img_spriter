import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { ThemeProvider } from 'styled-components';
import rootReducer from './store/index';
import './index.css';
import theme from './styles/theme';
import App from './app';

const store: Store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
