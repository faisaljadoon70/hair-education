'use client'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function LoadingSpinner({ size = 'medium', color = 'text-blue-600' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${color}`} role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
