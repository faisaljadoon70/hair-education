import { syncToSupabase, syncWithRetry, useSyncStore } from '../../utils/databaseSync';
import { saveToIndexedDB, getAllFromStore, cleanupOldEntries } from '../../utils/storageManager';

// Mock IndexedDB
import 'fake-indexeddb/auto';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: (table: string) => ({
      upsert: async (data: any) => ({ data, error: null }),
    }),
  }),
}));

describe('Database Sync', () => {
  beforeEach(() => {
    useSyncStore.setState({ offlineQueue: [] });
  });

  test('syncToSupabase should update both databases atomically', async () => {
    const testData = {
      image: { id: 1, url: 'test.jpg' },
      solver: { id: 1, result: 'test result' },
    };

    const success = await syncToSupabase(testData, {
      imageDB: true,
      solverDB: true,
      atomicUpdates: true,
    });

    expect(success).toBe(true);
  });

  test('syncWithRetry should retry failed operations', async () => {
    const testData = {
      image: { id: 1, url: 'test.jpg' },
    };

    const success = await syncWithRetry(testData, {
      imageDB: true,
      solverDB: false,
      atomicUpdates: true,
    });

    expect(success).toBe(true);
  });

  test('offline storage should work correctly', async () => {
    const testData = { id: 1, url: 'test.jpg' };
    
    await saveToIndexedDB('images', testData);
    const storedData = await getAllFromStore('images');
    
    expect(storedData).toHaveLength(1);
    expect(storedData[0].url).toBe('test.jpg');
  });

  test('cleanup should remove old entries', async () => {
    const oldData = { 
      id: 1, 
      url: 'old.jpg',
      timestamp: Date.now() - (4 * 60 * 60 * 1000) // 4 hours old
    };
    
    const newData = {
      id: 2,
      url: 'new.jpg',
      timestamp: Date.now()
    };

    await saveToIndexedDB('images', oldData);
    await saveToIndexedDB('images', newData);
    
    await cleanupOldEntries();
    
    const remainingData = await getAllFromStore('images');
    expect(remainingData).toHaveLength(1);
    expect(remainingData[0].url).toBe('new.jpg');
  });
});
