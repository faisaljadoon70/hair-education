'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function IntermediatePage() {
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

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

  const chapters = [
    {
      id: 'chapter1',
      title: 'Chapter 1: Hair Analysis & Structure',
      description: 'Learn about porosity analysis, hair structure, and growth cycles.',
      link: '/intermediate-chapter1'
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Chapter 2',
      description: 'Coming soon...',
      link: '#'
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Chapter 3',
      description: 'Coming soon...',
      link: '#'
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Chapter 4',
      description: 'Coming soon...',
      link: '#'
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Chapter 5',
      description: 'Coming soon...',
      link: '#'
    }
  ];

  const calculateProgress = () => {
    const totalChapters = chapters.length;
    const completedCount = Object.values(completedChapters).filter(Boolean).length;
    return Math.round((completedCount / totalChapters) * 100);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="bg-pink-600 text-white p-4 flex items-center justify-between">
          <a href="/" className="text-white text-lg font-semibold hover:underline">
            Home
          </a>
          <span className="text-white">{process.env.NEXT_PUBLIC_USER_EMAIL}</span>
        </div>

        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md px-6 py-8">
            <h2 className="text-2xl font-semibold text-pink-600 mb-6">
              Table of Contents
            </h2>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Course Progress</span>
                <button
                  onClick={() => setCompletedChapters({})}
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  Reset
                </button>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-pink-600 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-sm font-medium text-gray-700">
                  {calculateProgress()}% Complete
                </span>
              </div>
            </div>

            {/* Chapter List */}
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
                    chapter.link === '#' ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <a
                    href={chapter.link}
                    className="block"
                    onClick={(e) => {
                      if (chapter.link === '#') {
                        e.preventDefault();
                        return;
                      }
                      if (chapter.link !== '#') {
                        setCompletedChapters(prev => ({
                          ...prev,
                          [chapter.id]: true
                        }));
                      }
                    }}
                  >
                    <h3 className="text-lg font-semibold text-pink-600 mb-1">
                      {chapter.title}
                      {completedChapters[chapter.id] && (
                        <span className="ml-2 text-green-500">✓</span>
                      )}
                    </h3>
                    <p className="text-gray-600">{chapter.description}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
