import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import ReactDOM from 'react-dom';
import App from './containers/App';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
