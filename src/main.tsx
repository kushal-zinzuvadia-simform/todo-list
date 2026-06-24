import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './redux/store';
import { ThemeProvider } from './context/ThemeProvider';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
