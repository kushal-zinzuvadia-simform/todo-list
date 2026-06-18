import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { App } from './App';
import { ThemeProvider } from './components/theme-provider';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>
  </StrictMode>
);
