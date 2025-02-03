'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<{ error: Error; reset: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackComponent) {
        const FallbackComponent = this.props.fallbackComponent;
        return <FallbackComponent error={this.state.error!} reset={this.reset} />;
      }
      return <DefaultFallbackUI error={this.state.error!} reset={this.reset} />;
    }

    return this.props.children;
  }
}

interface FallbackUIProps {
  error: Error;
  reset: () => void;
}

export function DefaultFallbackUI({ error, reset }: FallbackUIProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[200px] flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="text-red-500 mb-4">
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-600 text-center mb-4">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </motion.div>
  );
}
