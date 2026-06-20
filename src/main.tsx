import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { App } from './App';
import { TodoProvider } from './context/TodoProvider';
import { ThemeProvider } from './context/ThemeProvider';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </StrictMode>
);
