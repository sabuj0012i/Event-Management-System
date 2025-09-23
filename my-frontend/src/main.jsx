import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; 
import { registerSW } from 'virtual:pwa-register';
import { initAnalytics } from './utils/analytics.js';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);

const showSkipWaitingPrompt = () => {
  const userAccepted = window.confirm('A new version is available. Update now?');
  if (userAccepted) {
    updateServiceWorker(true);
  }
};

let updateServiceWorker = null;
if (import.meta.env.PROD) {
  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh() {
      showSkipWaitingPrompt();
    },
    onOfflineReady() {
      console.info('App is ready to work offline');
    }
  });
}

// Initialize GA4 (set VITE_GA_MEASUREMENT_ID in .env)
if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
  initAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID);
}
