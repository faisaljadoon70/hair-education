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

export default function PracticeDesktopPresenter({
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
      className="max-w-6xl mx-auto px-6 py-8 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Instructions and Upload */}
        <div className="col-span-7">
          <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">{data.instructions}</p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload Your Practice</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-600">
                {isDragActive
                  ? 'Drop the image here...'
                  : 'Drag and drop an image here, or click to select'}
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
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Expected Outcome</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700">{data.expectedOutcome}</p>
            </div>
          </div>

          {/* Complete Button */}
          <button
            onClick={onComplete}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={uploadStatus === 'processing'}
          >
            Mark as Complete
          </button>
        </div>

        {/* Right Column - Reference Images */}
        <div className="col-span-5">
          <div className="sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Reference Images</h2>
            <div className="space-y-6">
              {data.referenceImages?.map((image: string, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <ResponsiveImage
                    src={image}
                    alt={`Reference ${index + 1}`}
                    className="rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Reference Image {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
