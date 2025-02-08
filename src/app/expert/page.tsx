'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import dynamic from 'next/dynamic';

// Dynamically import mobile page
const MobileExpertPage = dynamic(
  () => import('@/components/mobile/pages/MobileExpertPage'),
  { ssr: false }
);

export default function ExpertPage() {
  const router = useRouter();
  const { isMobile } = useDeviceDetection();

  const chapters = [
    {
      number: 1,
      title: 'Advanced Hair Techniques',
      description: 'Master color formulation, business management, and advanced coloring techniques.',
      path: '/expert/chapter1',
    },
    {
      number: 2,
      title: 'Salon Management',
      description: 'Coming soon...',
      path: '/expert/chapter2',
    },
    {
      number: 3,
      title: 'Advanced Color Theory',
      description: 'Coming soon...',
      path: '/expert/chapter3',
    },
    {
      number: 4,
      title: 'Business Development',
      description: 'Coming soon...',
      path: '/expert/chapter4',
    },
    {
      number: 5,
      title: 'Marketing & Client Relations',
      description: 'Coming soon...',
      path: '/expert/chapter5',
    }
  ];

  return (
    <>
      {isMobile ? (
        <MobileExpertPage
          chapters={chapters}
          completedChapters={{}}
          setCompletedChapters={() => {}}
          calculateProgress={() => 0}
          handleReset={() => {}}
        />
      ) : (
        <div className="min-h-screen bg-white">
          {/* Header */}
          <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
            <div className="flex items-center justify-between px-4 h-full relative">
              <Link
                href="/"
                className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
                aria-label="Go to home page"
              >
                <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
                <span className="text-lg">Home</span>
              </Link>

              <div className="hidden md:flex space-x-14 items-center">
                <Link href="/beginner" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                  Beginner
                </Link>
                <Link href="/intermediate" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                  Intermediate
                </Link>
                <span className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md">
                  Expert
                </span>
                <Link href="/contact" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                  Contact
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-white/90">faisal_70@yahoo.com</span>
                <button className="bg-white/25 text-white px-4 py-1 rounded-md hover:bg-white/30">
                  Sign Out
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center text-sm text-gray-500 space-x-2 mb-6">
              <Link href="/" className="hover:text-pink-600">Home</Link>
              <span>/</span>
              <span className="text-gray-900">Expert</span>
            </div>

            <h1 className="text-3xl font-bold mb-6">Expert Hair Education</h1>
            
            <p className="text-gray-600 mb-8">
              Welcome to the Expert level! Here you'll master advanced techniques and professional salon management skills.
            </p>

            <div className="grid gap-6">
              {chapters.map((chapter) => (
                <div
                  key={chapter.number}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Chapter {chapter.number}: {chapter.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{chapter.description}</p>
                  {chapter.description !== 'Coming soon...' && (
                    <button
                      onClick={() => router.push(chapter.path)}
                      className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200"
                    >
                      Start Chapter
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
