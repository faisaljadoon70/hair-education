'use client';

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useImageUpload } from '@/utils/imageProcessing';
import { supabase } from '@/lib/supabaseClient';
import { ResponsiveImage } from '@/components/responsive/ResponsiveImage';

interface UploadedImage {
  id: string;
  url: string;
  created_at: string;
  analysis_status: string;
  analysis_result?: any;
}

export default function AnalyzePage() {
  const { user } = useAuth();
  const { uploadImage, status, error } = useImageUpload();
  const [recentImages, setRecentImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [isPDFProcessing, setIsPDFProcessing] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    try {
      if (file.type === 'application/pdf') {
        setIsPDFProcessing(true);
        const results = await processPDFImages(file, user!.id);
        fetchRecentImages(); // Refresh the list
      } else {
        const processedImage = await uploadImage(acceptedFiles[0]);
        fetchRecentImages(); // Refresh the list
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsPDFProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'application/pdf': ['.pdf']
    },
    maxSize: 10485760 // 10MB for PDFs
  });

  const fetchRecentImages = async () => {
    if (!user) return;

    // Get images from the last 3 hours
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', threeHoursAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      return;
    }

    setRecentImages(data || []);
  };

  useEffect(() => {
    fetchRecentImages();
    // Set up real-time subscription for analysis updates
    const subscription = supabase
      .channel('analysis_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'solver',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          fetchRecentImages(); // Refresh when analysis is updated
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hair Analysis</h1>

      {/* Upload Section */}
      <div
        {...getRootProps()}
        className={`mb-8 border-2 border-dashed rounded-lg p-8 text-center ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 mb-2">
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag and drop an image or PDF here, or click to select'}
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: JPEG, PNG, GIF, PDF (max 10MB)
        </p>
        {(status === 'processing' || isPDFProcessing) && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
            <p className="mt-2 text-blue-600">
              {isPDFProcessing ? 'Extracting images from PDF...' : 'Processing your image...'}
            </p>
          </div>
        )}
        {error && (
          <p className="mt-4 text-red-600">{error}</p>
        )}
      </div>

      {/* Recent Images */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Uploads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentImages.map((image) => (
            <motion.div
              key={image.id}
              layoutId={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-video relative">
                <ResponsiveImage
                  src={image.url}
                  alt="Uploaded hair"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-white text-sm">
                    {new Date(image.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Analysis Status:
                  </span>
                  <span className={`text-sm ${
                    image.analysis_status === 'completed'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}>
                    {image.analysis_status}
                  </span>
                </div>
                {image.analysis_result && (
                  <div className="mt-2 text-sm text-gray-600">
                    {/* Display analysis results here */}
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(image.analysis_result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Image Modal */}
      {selectedImage && (
        <motion.div
          layoutId={selectedImage.id}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="p-4">
              <ResponsiveImage
                src={selectedImage.url}
                alt="Selected hair"
                className="rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Analysis Results</h3>
                {selectedImage.analysis_result ? (
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(selectedImage.analysis_result, null, 2)}
                  </pre>
                ) : (
                  <p className="text-gray-600">Analysis pending...</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
