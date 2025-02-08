import { useState, useEffect } from 'react';
import { openDB } from 'idb';

export const useIndexedDB = (pageId: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB('hair-education', 1, {
        upgrade(db) {
          db.createObjectStore('pages');
          db.createObjectStore('userProgress');
          db.createObjectStore('offline-assets');
        },
      });

      // Load data for this page
      const storedData = await db.get('pages', pageId);
      if (storedData) setData(storedData);
    };

    initDB();
  }, [pageId]);

  const saveData = async (newData: any) => {
    const db = await openDB('hair-education', 1);
    await db.put('pages', newData, pageId);
    setData(newData);
  };

  return { data, saveData };
};
