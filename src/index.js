import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import Fallback from './components/UI/Fallback';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Fallback />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
