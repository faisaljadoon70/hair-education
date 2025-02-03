import Image from 'next/image';
import { FC } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
};
