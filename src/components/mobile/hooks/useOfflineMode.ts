import { useState, useEffect } from 'react';
import { offlineStorage } from '../services/OfflineStorageService';
import { syncService } from '../services/SyncService';

export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [offlineContent, setOfflineContent] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load initial offline content
    loadOfflineContent();

    // Set up online/offline listeners
    const handleOnline = () => {
      setIsOnline(true);
      handleSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize sync service
    syncService.initSyncListeners();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineContent = async () => {
    const content = await offlineStorage.getAllContent();
    setOfflineContent(content);
  };

  const handleSync = async () => {
    if (!isOnline || isSyncing) return;

    try {
      setIsSyncing(true);
      await syncService.syncAll();
      await loadOfflineContent();
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const saveForOffline = async (contentId: string, content: any) => {
    try {
      await offlineStorage.saveContent({
        id: contentId,
        ...content,
        lastUpdated: new Date().toISOString()
      });
      await loadOfflineContent();
    } catch (error) {
      console.error('Error saving content for offline:', error);
      throw error;
    }
  };

  const removeOfflineContent = async (contentId: string) => {
    try {
      await offlineStorage.clearContent(contentId);
      await loadOfflineContent();
    } catch (error) {
      console.error('Error removing offline content:', error);
      throw error;
    }
  };

  const saveProgress = async (userId: string, courseId: string, progress: number) => {
    try {
      await offlineStorage.saveProgress({
        userId,
        courseId,
        progress,
        lastSynced: new Date().toISOString()
      });

      if (isOnline) {
        await handleSync();
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  };

  return {
    isOnline,
    isSyncing,
    offlineContent,
    saveForOffline,
    removeOfflineContent,
    saveProgress,
    handleSync
  };
}
