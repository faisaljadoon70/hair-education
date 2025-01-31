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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="bg-pink-600 text-white p-4 flex justify-between">
          <a href="/" className="text-white text-lg font-semibold hover:underline">
            Home
          </a>
          <div className="flex items-center space-x-4">
            <button className="bg-pink-700 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          </div>
        </div>

        <main className="container mx-auto p-8">
          <div className="max-w-4xl mx-auto p-8">
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
        </main>
      </div>
    </ProtectedRoute>
  );
}
