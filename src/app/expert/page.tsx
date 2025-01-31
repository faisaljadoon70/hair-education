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

export default function ExpertPage() {
  const [completedChapters, setCompletedChapters] = useState<{[key: string]: boolean}>({});

  // Array of chapters - easy to add more chapters later
  const chapters: Chapter[] = [
    {
      number: 1,
      title: "Advanced Hair Techniques",
      description: "Master color formulation, business management, and advanced coloring techniques.",
      path: "/expert-chapter1"
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
      <div className="min-h-screen bg-pink-50">
        <header className="bg-pink-500 text-white p-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>
          <div className="flex items-center gap-4">
            <span>faisal.70@gmail.com</span>
            <button className="text-white">Sign Out</button>
          </div>
        </header>

        <main className="container mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl text-pink-600 mb-6">Table of Contents</h1>
            
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
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 mt-1">{calculateProgress()}% Complete</span>
            </div>

            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.number}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <Link href={chapter.path}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg text-pink-600 font-medium">
                          Chapter {chapter.number}: {chapter.title}
                          {completedChapters[`chapter${chapter.number}`] && ' ✓'}
                        </h2>
                        <p className="text-gray-600 mt-1">{chapter.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
