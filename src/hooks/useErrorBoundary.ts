import { useState, useCallback } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<string | null>(null);

  const captureError = useCallback((message: string) => {
    console.error(message);
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    captureError,
    clearError,
  };
}
