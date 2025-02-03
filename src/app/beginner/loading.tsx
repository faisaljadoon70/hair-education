import LoadingSpinner from '@/components/LoadingSpinner'

export default function BeginnerLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" color="text-pink-600" />
        <p className="mt-4 text-gray-600">Loading beginner content...</p>
      </div>
    </div>
  )
}
