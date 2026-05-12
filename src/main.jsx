import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ToastProvider } from './components/Toast.jsx';
import './index.css';

/* Remove the inline loading shell that index.html shows before React mounts. */
const removeBoot = () => {
  const boot = document.getElementById('wl-boot');
  if (boot) boot.parentNode?.removeChild(boot);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <App />
        <Analytics />
      </ToastProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

/* requestAnimationFrame ensures we wait one paint after mount before
   removing the shell, so the transition from shell → app is seamless. */
requestAnimationFrame(removeBoot);
