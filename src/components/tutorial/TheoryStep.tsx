'use client';

import React from 'react';
import { ResponsiveImage } from '../responsive/ResponsiveImage';
import { motion } from 'framer-motion';

interface TheoryStepProps {
  title: string;
  content: string;
  image?: {
    src: string;
    alt: string;
    mobileSrc?: string;
    tabletSrc?: string;
    desktopSrc?: string;
  };
  videoUrl?: string;
}

export function TheoryStep({ title, content, image, videoUrl }: TheoryStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

      {/* Theory content with markdown support */}
      <div className="prose max-w-none">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="text-gray-600">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Optional image */}
      {image && (
        <div className="mt-4">
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            mobileSrc={image.mobileSrc}
            tabletSrc={image.tabletSrc}
            desktopSrc={image.desktopSrc}
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Optional video */}
      {videoUrl && (
        <div className="mt-4 aspect-w-16 aspect-h-9">
          <iframe
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Additional resources section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          Additional Resources
        </h4>
        <ul className="list-disc list-inside text-gray-600">
          <li>Download PDF version</li>
          <li>Related articles</li>
          <li>Practice exercises</li>
        </ul>
      </div>
    </motion.div>
  );
}
