import { useState, useEffect } from 'react';

interface OfflineSyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
}

export const useOfflineSync = () => {
  const [state, setState] = useState<OfflineSyncState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isSyncing: false,
    lastSyncTime: null
  });

  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const sync = async () => {
    if (!state.isOnline) return;

    setState(prev => ({ ...prev, isSyncing: true }));
    try {
      // Add sync logic here when needed
      setState(prev => ({ ...prev, lastSyncTime: new Date() }));
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setState(prev => ({ ...prev, isSyncing: false }));
    }
  };

  return {
    ...state,
    sync
  };
};

export default useOfflineSync;
