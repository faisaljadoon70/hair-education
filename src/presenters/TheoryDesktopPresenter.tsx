'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveImage } from '@/components/responsive/ResponsiveImage';

interface TheoryPresenterProps {
  data: any;
  progress: number;
  isLoading: boolean;
  error: Error | null;
  onProgressUpdate: (progress: number) => void;
}

export default function TheoryDesktopPresenter({
  data,
  progress,
  isLoading,
  error,
  onProgressUpdate
}: TheoryPresenterProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded max-w-4xl mx-auto">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-8 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Content Section */}
        <div className="col-span-8">
          <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">{data.content}</p>
          </div>

          <div className="space-y-6">
            {data.images?.map((image: string, index: number) => (
              <div key={index}>
                <ResponsiveImage
                  src={image}
                  alt={`Theory illustration ${index + 1}`}
                  className="rounded-lg shadow-md"
                  priority={index === 0}
                />
              </div>
            ))}

            {data.videos?.map((video: string, index: number) => (
              <div key={index} className="aspect-video">
                <video
                  src={video}
                  controls
                  className="w-full rounded-lg shadow-md"
                  poster={data.images?.[0]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="col-span-4">
          <div className="sticky top-6 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 mt-2 text-center">
                {progress}% Complete
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => progress > 0 && onProgressUpdate(progress - 10)}
                className="w-full px-4 py-2 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
                disabled={progress <= 0}
              >
                Previous Section
              </button>
              
              <button
                onClick={() => progress < 100 && onProgressUpdate(progress + 10)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
                disabled={progress >= 100}
              >
                Next Section
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              Use arrow keys or buttons to navigate between sections
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
