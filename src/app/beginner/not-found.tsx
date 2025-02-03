import Link from 'next/link'

export default function BeginnerNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">404</h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Beginner Content Not Found</h3>
        <p className="text-gray-600 mb-6">
          The beginner content you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="space-x-4">
          <Link
            href="/beginner"
            className="inline-block bg-pink-600 text-white py-2 px-6 rounded hover:bg-pink-700 transition-colors"
          >
            Back to Beginner
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
