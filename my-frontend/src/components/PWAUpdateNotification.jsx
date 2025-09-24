import { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';

const PWAUpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] = useState(null);

  useEffect(() => {
    if (import.meta.env.PROD) {
      const initializeSW = async () => {
        const { registerSW } = await import('virtual:pwa-register');
        
        const updateSW = registerSW({
          immediate: true,
          onNeedRefresh() {
            setShowUpdate(true);
            setUpdateServiceWorker(() => updateSW);
          },
          onOfflineReady() {
            console.log('App is ready to work offline');
          }
        });
      };
      
      initializeSW();
    }
  }, []);

  const handleUpdate = () => {
    if (updateServiceWorker) {
      updateServiceWorker(true);
      setShowUpdate(false);
    }
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-sm">
      <div className="flex items-start space-x-2">
        <RefreshCw className="w-4 h-4 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900">
            Update Available
          </h3>
          <p className="text-xs text-blue-700 mt-1">
            A new version is available. Update now to get the latest features.
          </p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
            <button
              onClick={handleDismiss}
              className="text-blue-600 text-xs px-3 py-1.5 rounded hover:bg-blue-100 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-blue-400 hover:text-blue-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PWAUpdateNotification;
