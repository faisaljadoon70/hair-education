'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSwipeGesture } from '@/utils/gestureHandling';
import { ResponsiveImage } from '@/components/responsive/ResponsiveImage';

interface TheoryPresenterProps {
  data: any;
  progress: number;
  isLoading: boolean;
  error: Error | null;
  onProgressUpdate: (progress: number) => void;
}

export default function TheoryMobilePresenter({
  data,
  progress,
  isLoading,
  error,
  onProgressUpdate
}: TheoryPresenterProps) {
  const swipeGesture = useSwipeGesture({
    onSwipeLeft: () => {
      if (progress < 100) {
        onProgressUpdate(progress + 10);
      }
    },
    onSwipeRight: () => {
      if (progress > 0) {
        onProgressUpdate(progress - 10);
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <motion.div
      {...swipeGesture()}
      className="px-4 py-6 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{data.content}</p>
      </div>

      {data.images?.map((image: string, index: number) => (
        <div key={index} className="mb-4">
          <ResponsiveImage
            src={image}
            alt={`Theory illustration ${index + 1}`}
            className="rounded-lg shadow-md"
            priority={index === 0}
          />
        </div>
      ))}

      {data.videos?.map((video: string, index: number) => (
        <div key={index} className="mb-4 aspect-video">
          <video
            src={video}
            controls
            className="w-full rounded-lg shadow-md"
            poster={data.images?.[0]}
          />
        </div>
      ))}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => progress > 0 && onProgressUpdate(progress - 10)}
          className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          disabled={progress <= 0}
        >
          Previous
        </button>
        <div className="text-sm text-gray-500">
          Progress: {progress}%
        </div>
        <button
          onClick={() => progress < 100 && onProgressUpdate(progress + 10)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={progress >= 100}
        >
          Next
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Swipe left/right to navigate
      </div>
    </motion.div>
  );
}
