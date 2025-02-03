'use client'

import { useEffect } from 'react'

export default function BeginnerError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Beginner] Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error in Beginner Section</h2>
        <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred in the beginner section.'}</p>
        <button
          onClick={reset}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
