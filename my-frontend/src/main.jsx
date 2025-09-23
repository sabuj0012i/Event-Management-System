import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; 
import { registerSW } from 'virtual:pwa-register';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

const showSkipWaitingPrompt = () => {
  const userAccepted = window.confirm('A new version is available. Update now?');
  if (userAccepted) {
    updateServiceWorker(true);
  }
};

const updateServiceWorker = registerSW({
  immediate: true,
  onNeedRefresh() {
    showSkipWaitingPrompt();
  },
  onOfflineReady() {
    console.info('App is ready to work offline');
  }
});
