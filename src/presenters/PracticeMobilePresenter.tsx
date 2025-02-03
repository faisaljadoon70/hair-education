'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { ResponsiveImage } from '@/components/responsive/ResponsiveImage';

interface PracticePresenterProps {
  data: any;
  isLoading: boolean;
  error: Error | null;
  uploadStatus: string;
  uploadError: string | null;
  onImageUpload: (file: File) => Promise<any>;
  onComplete: () => Promise<void>;
}

export default function PracticeMobilePresenter({
  data,
  isLoading,
  error,
  uploadStatus,
  uploadError,
  onImageUpload,
  onComplete
}: PracticePresenterProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      try {
        await onImageUpload(acceptedFiles[0]);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
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
      className="px-4 py-6 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{data.instructions}</p>
      </div>

      {/* Reference Images */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Reference Images</h2>
        <div className="space-y-4">
          {data.referenceImages?.map((image: string, index: number) => (
            <div key={index}>
              <ResponsiveImage
                src={image}
                alt={`Reference ${index + 1}`}
                className="rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Upload Your Practice</h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? 'Drop the image here...'
              : 'Tap to select an image or drag and drop'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: JPEG, PNG, GIF (max 5MB)
          </p>
        </div>

        {uploadStatus === 'processing' && (
          <div className="mt-4 text-center text-blue-600">
            Processing your image...
          </div>
        )}

        {uploadError && (
          <div className="mt-4 text-center text-red-600">
            {uploadError}
          </div>
        )}
      </div>

      {/* Expected Outcome */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Expected Outcome</h2>
        <p className="text-gray-700">{data.expectedOutcome}</p>
      </div>

      {/* Complete Button */}
      <button
        onClick={onComplete}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        disabled={uploadStatus === 'processing'}
      >
        Mark as Complete
      </button>
    </motion.div>
  );
}
