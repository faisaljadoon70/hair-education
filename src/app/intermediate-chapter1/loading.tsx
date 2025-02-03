'use client';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600 mx-auto"></div>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">Loading Intermediate Chapter 1...</h2>
        <p className="text-gray-600 mt-2">Please wait while we prepare your content.</p>
      </div>
    </div>
  );
}
