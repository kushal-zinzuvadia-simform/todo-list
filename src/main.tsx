import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { App } from './App';
import { ThemeProvider } from './context/ThemeProvider';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
