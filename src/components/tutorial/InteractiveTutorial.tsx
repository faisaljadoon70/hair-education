'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeGesture, usePinchZoom } from '@/utils/gestureHandling';
import { useDevice } from '@/hooks/useDevice';
import { ResponsiveImage } from '../responsive/ResponsiveImage';

interface InteractiveTutorialProps {
  images: {
    src: string;
    alt: string;
    description: string;
  }[];
  onComplete?: () => void;
}

export function InteractiveTutorial({ images, onComplete }: InteractiveTutorialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const { isMobile, hasTouch } = useDevice();

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setScale(1); // Reset zoom when changing images
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setScale(1); // Reset zoom when changing images
    }
  };

  // Swipe gesture for navigation
  const swipeGesture = useSwipeGesture({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
  });

  // Pinch zoom gesture for images
  const pinchGesture = usePinchZoom({
    onZoom: setScale,
    minScale: 1,
    maxScale: 3,
  });

  // Combined gesture bindings for touch devices
  const gestures = hasTouch
    ? { ...swipeGesture(), ...pinchGesture() }
    : {};

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Navigation indicators */}
      <div className="flex justify-center space-x-2 mb-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Image container */}
      <motion.div
        {...gestures}
        className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
        style={{ touchAction: 'none' }}
      >
        <motion.div
          style={{
            scale,
            cursor: hasTouch ? 'grab' : 'default',
          }}
          className="w-full h-full"
        >
          <ResponsiveImage
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>

        {/* Description overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <p className="text-sm md:text-base">
            {images[currentIndex].description}
          </p>
        </div>
      </motion.div>

      {/* Navigation buttons */}
      {!isMobile && (
        <>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
              currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            →
          </button>
        </>
      )}

      {/* Mobile navigation hint */}
      {isMobile && (
        <div className="text-center text-sm text-gray-500 mt-4">
          Swipe left or right to navigate • Pinch to zoom
        </div>
      )}
    </div>
  );
}
