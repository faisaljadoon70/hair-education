import { useEffect, useState } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

// Function to get optimal image dimensions based on screen size
export function getOptimalImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number = window.innerWidth,
  maxHeight: number = window.innerHeight
): ImageDimensions {
  const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
  return {
    width: Math.round(originalWidth * ratio),
    height: Math.round(originalHeight * ratio),
  };
}

// Hook to lazy load images
export function useLazyImage(src: string, placeholder: string = '') {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    if (imageRef && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (
              !didCancel &&
              (entry.intersectionRatio > 0 || entry.isIntersecting)
            ) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: '75%',
        }
      );
      observer.observe(imageRef);
    }

    return () => {
      didCancel = true;
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, placeholder, imageRef]);

  return { imageSrc, setImageRef };
}

// Function to generate srcSet for responsive images
export function generateSrcSet(
  basePath: string,
  sizes: number[] = [320, 640, 768, 1024, 1280]
): string {
  return sizes
    .map(size => `${basePath}?w=${size} ${size}w`)
    .join(', ');
}

// Function to preload critical images
export function preloadCriticalImages(images: string[]) {
  if (typeof window === 'undefined') return;

  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Hook to handle image loading states
export function useImageLoading(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const image = new Image();
    
    image.onload = () => {
      setIsLoading(false);
    };

    image.onerror = () => {
      setIsLoading(false);
      setError(new Error(`Failed to load image: ${src}`));
    };

    image.src = src;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return { isLoading, error };
}
