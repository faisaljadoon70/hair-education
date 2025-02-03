'use client';

import React from 'react';
import Image from 'next/image';
import { useDevice } from '@/hooks/useDevice';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ResponsiveImage({
  src,
  alt,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  className = '',
  priority = false,
  sizes = '100vw',
}: ResponsiveImageProps) {
  const { type } = useDevice();

  // Select appropriate image source based on device type
  const imageSource = {
    mobile: mobileSrc || src,
    tablet: tabletSrc || src,
    desktop: desktopSrc || src,
  }[type];

  // Default responsive sizes if not provided
  const defaultSizes = {
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw',
  };

  return (
    <picture>
      {mobileSrc && (
        <source media="(max-width: 640px)" srcSet={mobileSrc} />
      )}
      {tabletSrc && (
        <source media="(max-width: 1024px)" srcSet={tabletSrc} />
      )}
      {desktopSrc && (
        <source media="(min-width: 1025px)" srcSet={desktopSrc} />
      )}
      <Image
        src={imageSource}
        alt={alt}
        className={`w-full h-auto ${className}`}
        priority={priority}
        sizes={sizes || defaultSizes[type]}
        width={1200}
        height={800}
        style={{ objectFit: 'contain' }}
      />
    </picture>
  );
}
