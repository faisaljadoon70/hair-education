// Constants
const DB_NAME = 'offlineStorage';
const DB_VERSION = 1;
const STORES = ['images', 'solver'];
const RETENTION_PERIOD = 3 * 60 * 60 * 1000; // 3 hours

// Initialize IndexedDB
export async function initializeDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      STORES.forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      });
    };
  });
}

// Save data to IndexedDB
export async function saveToIndexedDB(storeName: string, data: any) {
  const db = await initializeDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    const request = store.put({
      ...data,
      timestamp: Date.now()
    });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Clean up old entries
export async function cleanupOldEntries() {
  const db = await initializeDB();
  const now = Date.now();

  STORES.forEach(storeName => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.openCursor();

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        if (now - cursor.value.timestamp > RETENTION_PERIOD) {
          store.delete(cursor.key);
        }
        cursor.continue();
      }
    };
  });
}

// Get all entries from a store
export async function getAllFromStore(storeName: string): Promise<any[]> {
  const db = await initializeDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Initialize cleanup interval
export function initializeStorageCleanup(intervalMinutes = 30) {
  setInterval(cleanupOldEntries, intervalMinutes * 60 * 1000);
}
