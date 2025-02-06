'use client';

import { useEffect, useState } from 'react';
import { useOfflineMode } from '../hooks/useOfflineMode';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloudOfflineOutline, IoCloudDoneOutline } from 'react-icons/io5';

interface MobileOfflineContainerProps {
  children: React.ReactNode;
  contentId?: string;
  content?: any;
}

export default function MobileOfflineContainer({
  children,
  contentId,
  content
}: MobileOfflineContainerProps) {
  const {
    isOnline,
    isSyncing,
    offlineContent,
    saveForOffline,
    removeOfflineContent
  } = useOfflineMode();

  const [isAvailableOffline, setIsAvailableOffline] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    if (contentId) {
      setIsAvailableOffline(!!offlineContent[contentId]);
    }
  }, [contentId, offlineContent]);

  const handleToggleOffline = async () => {
    if (!contentId || !content) return;

    try {
      if (isAvailableOffline) {
        await removeOfflineContent(contentId);
        setNotificationMessage('Content removed from offline storage');
      } else {
        await saveForOffline(contentId, content);
        setNotificationMessage('Content saved for offline use');
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error toggling offline content:', error);
      setNotificationMessage('Error managing offline content');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="relative">
      {/* Offline Status Bar */}
      {!isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-1 text-sm z-50"
        >
          You're offline. Some features may be limited.
        </motion.div>
      )}

      {/* Content */}
      {children}

      {/* Offline Toggle Button */}
      {contentId && content && (
        <motion.button
          className="fixed bottom-4 right-4 bg-white rounded-full p-3 shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleOffline}
        >
          {isAvailableOffline ? (
            <IoCloudDoneOutline className="w-6 h-6 text-pink-500" />
          ) : (
            <IoCloudOfflineOutline className="w-6 h-6 text-gray-500" />
          )}
        </motion.button>
      )}

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg text-center"
          >
            {notificationMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Syncing Indicator */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 bg-white rounded-lg px-3 py-1 shadow-lg text-sm flex items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full mr-2"
            />
            Syncing...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
