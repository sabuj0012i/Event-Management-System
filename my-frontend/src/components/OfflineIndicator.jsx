import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm mx-auto">
      <div className="flex items-center space-x-2">
        <WifiOff className="w-4 h-4 text-red-600" />
        <span className="text-sm text-red-800 font-medium">
          You're offline
        </span>
      </div>
      <p className="text-xs text-red-600 mt-1">
        Some features may be limited. Data will sync when you're back online.
      </p>
    </div>
  );
};

export default OfflineIndicator;
