import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';

// Types
export interface DualSync {
  imageDB: boolean;
  solverDB: boolean;
  atomicUpdates: boolean;
}

interface SyncStore {
  offlineQueue: Array<{
    image?: any;
    solver?: any;
    timestamp: number;
  }>;
  addToQueue: (data: { image?: any; solver?: any }) => void;
  clearQueue: () => void;
}

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

// Zustand store for offline queue
export const useSyncStore = create<SyncStore>((set) => ({
  offlineQueue: [],
  addToQueue: (data) => 
    set((state) => ({ 
      offlineQueue: [...state.offlineQueue, { ...data, timestamp: Date.now() }] 
    })),
  clearQueue: () => set({ offlineQueue: [] }),
}));

// Main sync function
export async function syncToSupabase(data: { image?: any; solver?: any }, config: DualSync) {
  if (!config.imageDB && !config.solverDB) return true;

  try {
    const promises = [];
    
    if (config.imageDB && data.image) {
      promises.push(supabase.from('images').upsert(data.image));
    }
    
    if (config.solverDB && data.solver) {
      promises.push(supabase.from('solver').upsert(data.solver));
    }

    if (config.atomicUpdates) {
      await Promise.all(promises);
    } else {
      for (const promise of promises) {
        await promise;
      }
    }
    return true;
  } catch (error) {
    console.error('Sync failed:', error);
    return false;
  }
}

// Retry mechanism
export async function syncWithRetry(
  data: { image?: any; solver?: any },
  config: DualSync,
  maxRetries = 3
) {
  let attempt = 0;

  while (attempt < maxRetries) {
    const success = await syncToSupabase(data, config);
    if (success) return true;

    console.warn(`Sync attempt ${attempt + 1} failed`);
    attempt++;
    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt ** 2))); // Exponential backoff
  }

  useSyncStore.getState().addToQueue(data);
  showNotification('Sync failed. Will retry when online.');
  return false;
}

// Notification helper
function showNotification(message: string) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(message);
  } else {
    alert(message);
  }
}

// Offline queue sync
export async function syncOfflineQueue() {
  const { offlineQueue, clearQueue } = useSyncStore.getState();
  if (offlineQueue.length === 0) return;

  const failedQueue = [];

  for (const data of offlineQueue) {
    const success = await syncToSupabase(data, {
      imageDB: true,
      solverDB: true,
      atomicUpdates: true,
    });
    if (!success) failedQueue.push(data);
  }

  useSyncStore.setState({ offlineQueue: failedQueue });
}
