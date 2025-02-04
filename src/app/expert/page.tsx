'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

interface Chapter {
  number: number;
  title: string;
  description: string;
  path: string;
}

export default function ExpertPage() {
  const [completedChapters, setCompletedChapters] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  // Array of chapters - easy to add more chapters later
  const chapters: Chapter[] = [
    {
      number: 1,
      title: "Advanced Hair Techniques",
      description: "Master color formulation, business management, and advanced coloring techniques.",
      path: "/expert-chapter1-overview"
    },
    {
      number: 2,
      title: "Salon Management",
      description: "Coming soon...",
      path: "#"
    },
    {
      number: 3,
      title: "Advanced Color Theory",
      description: "Coming soon...",
      path: "#"
    },
    {
      number: 4,
      title: "Business Development",
      description: "Coming soon...",
      path: "#"
    },
    {
      number: 5,
      title: "Marketing & Client Relations",
      description: "Coming soon...",
      path: "#"
    }
  ];

  // Load completed chapters from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('completedExpertChapters');
    if (savedProgress) {
      setCompletedChapters(JSON.parse(savedProgress));
    }
  }, []);

  // Save completed chapters to localStorage
  useEffect(() => {
    if (Object.keys(completedChapters).length > 0) {
      localStorage.setItem('completedExpertChapters', JSON.stringify(completedChapters));
    }
  }, [completedChapters]);

  // Calculate progress based on completed chapters
  const calculateProgress = () => {
    const completedCount = Object.values(completedChapters).filter(Boolean).length;
    return Math.round((completedCount / chapters.length) * 100);
  };

  // Reset progress
  const handleReset = () => {
    setCompletedChapters({});
    localStorage.setItem('completedExpertChapters', JSON.stringify({}));
    localStorage.removeItem('completedModulesExpertChapter1');
    localStorage.removeItem('completedModulesExpertChapter2');
    localStorage.removeItem('completedModulesExpertChapter3');
    localStorage.removeItem('completedModulesExpertChapter4');
    localStorage.removeItem('completedModulesExpertChapter5');
  };

  return (
    <ProtectedRoute>
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <a
            href="/"
            className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
            aria-label="Go to home page"
          >
            <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
            <span className="text-lg">Home</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-14 items-center" role="navigation" aria-label="Main navigation">
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
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-transform duration-200 transform origin-center" 
                 style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(2px, 8px)' : 'none' }}></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-200"
                 style={{ opacity: isMobileMenuOpen ? '0' : '1' }}></div>
            <div className="w-6 h-0.5 bg-white transition-transform duration-200 transform origin-center"
                 style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(2px, -8px)' : 'none' }}></div>
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <span className="text-white/90">faisal_70@yahoo.com</span>
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
            <button 
              className="text-white bg-gradient-to-r from-white/25 to-white/20 hover:from-white/30 hover:to-white/25 py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600"
              aria-label="Sign out of your account"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-pink-600 shadow-lg transform transition-transform duration-200 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="px-4 py-3 space-y-2">
            <a href="/" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Home</a>
            <a href="/beginner" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Beginner</a>
            <a href="/intermediate" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Intermediate</a>
            <a href="/expert" className="block py-2 px-4 text-white bg-white/15 rounded-md">Expert</a>
            <a href="/contact" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Contact</a>
            <div className="pt-2 mt-2 border-t border-white/10">
              <span className="block px-4 py-2 text-white/90 text-sm">faisal_70@yahoo.com</span>
              <button className="w-full mt-2 px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors">
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-pink-50 py-2 px-4 text-sm text-pink-700 -mt-2">
        <span className="text-gray-600">You are here: </span>
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }} className="text-pink-600 hover:text-pink-800">Home</a>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-pink-600">Expert</span>
      </div>

      <div className="container mx-auto px-4 py-2">
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Table of Contents</h1>

            {/* Course Progress Section */}
            <div className="mb-10 bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-700">Course Progress</span>
                <button
                  onClick={handleReset}
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  Reset
                </button>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-sm text-gray-600">{calculateProgress()}% Complete</span>
              </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map((chapter) => (
                <Link key={chapter.number} href={chapter.path} className="block">
                  <div
                    className={`rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 ${
                      chapter.description === 'Coming soon...'
                        ? 'opacity-75 cursor-not-allowed'
                        : 'cursor-pointer hover:-translate-y-1'
                    }`}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-pink-600 mb-2">
                        Chapter {chapter.number}: {chapter.title}
                      </h3>
                      <p className="text-gray-600">{chapter.description}</p>
                      
                      {/* Status Indicator */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {chapter.description === 'Coming soon...' ? (
                            <span className="inline-flex items-center">
                              🔒 <span className="ml-1 animate-pulse">Coming Soon</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center">
                              📖 Available
                            </span>
                          )}
                        </span>
                        {completedChapters[`chapter${chapter.number}`] && (
                          <span className="text-green-500">✓ Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
