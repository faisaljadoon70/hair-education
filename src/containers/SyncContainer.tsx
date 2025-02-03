import { useEffect } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useSyncStore, syncWithRetry } from '../utils/databaseSync';
import { saveToIndexedDB, initializeStorageCleanup } from '../utils/storageManager';

interface SyncContainerProps {
  children: React.ReactNode;
}

export function SyncContainer({ children }: SyncContainerProps) {
  const isOnline = useNetworkStatus();
  const offlineQueue = useSyncStore((state) => state.offlineQueue);

  // Initialize storage cleanup
  useEffect(() => {
    initializeStorageCleanup();
  }, []);

  // Handle data sync
  const handleSync = async (data: { image?: any; solver?: any }) => {
    if (!isOnline) {
      // If offline, save to IndexedDB
      if (data.image) {
        await saveToIndexedDB('images', data.image);
      }
      if (data.solver) {
        await saveToIndexedDB('solver', data.solver);
      }
      useSyncStore.getState().addToQueue(data);
      return;
    }

    // If online, try to sync immediately
    await syncWithRetry(data, {
      imageDB: !!data.image,
      solverDB: !!data.solver,
      atomicUpdates: true,
    });
  };

  return (
    <div>
      {!isOnline && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg">
          Offline Mode - Changes will sync when online
          {offlineQueue.length > 0 && (
            <span className="ml-2">({offlineQueue.length} items pending)</span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Export the sync handler to be used by other components
export const useSyncHandler = () => {
  const isOnline = useNetworkStatus();
  
  return {
    handleSync: async (data: { image?: any; solver?: any }) => {
      if (!isOnline) {
        if (data.image) {
          await saveToIndexedDB('images', data.image);
        }
        if (data.solver) {
          await saveToIndexedDB('solver', data.solver);
        }
        useSyncStore.getState().addToQueue(data);
        return;
      }

      await syncWithRetry(data, {
        imageDB: !!data.image,
        solverDB: !!data.solver,
        atomicUpdates: true,
      });
    },
    isOnline,
  };
};
