import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set browser theme color dynamically
const metaTheme = document.createElement('meta');
metaTheme.name = 'theme-color';
metaTheme.content = '#030405';
document.head.appendChild(metaTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
