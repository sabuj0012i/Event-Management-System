import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, CheckCircle } from 'lucide-react';

const PWAStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  if (!isOnline) {
    return (
      <div className="fixed top-4 left-4 z-50 bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm">
        <div className="flex items-center space-x-2">
          <WifiOff className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-800 font-medium">
            Offline Mode
          </span>
        </div>
        <p className="text-xs text-red-600 mt-1">
          Some features may be limited
        </p>
      </div>
    );
  }

  if (isInstalled) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-3 max-w-sm">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-800 font-medium">
            App Installed
          </span>
        </div>
        <p className="text-xs text-green-600 mt-1">
          Running as PWA
        </p>
      </div>
    );
  }

  if (deferredPrompt) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-sm">
        <div className="flex items-center space-x-2">
          <Download className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800 font-medium">
            Install Available
          </span>
        </div>
        <button
          onClick={handleInstall}
          className="text-xs text-blue-600 underline mt-1 hover:text-blue-800"
        >
          Install App
        </button>
      </div>
    );
  }

  return null;
};

export default PWAStatus;
