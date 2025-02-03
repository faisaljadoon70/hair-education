'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface Chapter {
  number: number;
  title: string;
  description: string;
  path: string;
}

export default function IntermediatePage() {
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
      title: "Hair Analysis & Structure",
      description: "Learn about porosity analysis, hair structure, and growth cycles.",
      path: "/intermediate-chapter1"
    },
    {
      number: 2,
      title: "Chapter 2",
      description: "Coming soon...",
      path: "#"
    },
    {
      number: 3,
      title: "Chapter 3",
      description: "Coming soon...",
      path: "#"
    },
    {
      number: 4,
      title: "Chapter 4",
      description: "Coming soon...",
      path: "#"
    },
    {
      number: 5,
      title: "Chapter 5",
      description: "Coming soon...",
      path: "#"
    }
  ];

  // Load completed chapters from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('completedIntermediateChapters');
    if (stored) {
      setCompletedChapters(JSON.parse(stored));
    }
  }, []);

  // Save completed chapters to localStorage
  useEffect(() => {
    if (Object.keys(completedChapters).length > 0) {
      localStorage.setItem('completedIntermediateChapters', JSON.stringify(completedChapters));
    }
  }, [completedChapters]);

  const handleReset = () => {
    setCompletedChapters({});
    localStorage.setItem('completedIntermediateChapters', JSON.stringify({}));
    localStorage.removeItem('completedModulesIntermediateChapter1');
    localStorage.removeItem('completedModulesIntermediateChapter2');
    localStorage.removeItem('completedModulesIntermediateChapter3');
    localStorage.removeItem('completedModulesIntermediateChapter4');
    localStorage.removeItem('completedModulesIntermediateChapter5');
  };

  // Calculate progress
  const totalChapters = chapters.length;
  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const progress = Math.round((completedCount / totalChapters) * 100);

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
          <nav className="hidden md:flex items-center space-x-14" role="navigation" aria-label="Main navigation">
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Home page"
            >
              Home
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/beginner"
              onClick={(e) => { e.preventDefault(); handleNavigation('/beginner'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
            >
              Beginner
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/intermediate"
              onClick={(e) => { e.preventDefault(); handleNavigation('/intermediate'); }}
              className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md"
              aria-current="page"
            >
              Intermediate
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/expert"
              onClick={(e) => { e.preventDefault(); handleNavigation('/expert'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Expert courses"
            >
              Expert
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Contact page"
            >
              Contact
            </a>
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
            <a href="/intermediate" className="block py-2 px-4 text-white bg-white/15 rounded-md">Intermediate</a>
            <a href="/expert" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Expert</a>
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
        <span className="text-pink-600">Intermediate</span>
      </div>

      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">
              Table of Contents
            </h2>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Course Progress</span>
                <button 
                  onClick={handleReset}
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  Reset
                </button>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-pink-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-right text-sm text-gray-600 mt-1">
                {progress}% Complete
              </div>
            </div>

            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.number}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <Link href={chapter.path}>
                    <div>
                      <h3 className="text-lg font-semibold text-pink-600">
                        Chapter {chapter.number}: {chapter.title}
                        {completedChapters[`chapter${chapter.number}`] && ' ✓'}
                      </h3>
                      <p className="text-gray-600 mt-1">{chapter.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
