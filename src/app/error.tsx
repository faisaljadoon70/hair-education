'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="block text-center text-pink-600 hover:text-pink-700">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
