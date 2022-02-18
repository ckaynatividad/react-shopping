import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ListProvider } from './context/ListContext';

render(
  <ListProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ListProvider>,
  document.getElementById('root')
);
