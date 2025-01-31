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

export default function BeginnerPage() {
  const [completedChapters, setCompletedChapters] = useState<{[key: string]: boolean}>({});

  // Array of chapters - easy to add more chapters later
  const chapters: Chapter[] = [
    {
      number: 1,
      title: "Hair and Scalp",
      description: "Learn about hair structure, types, and characteristics.",
      path: "/beginner-chapter1"
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
    const savedProgress = localStorage.getItem('completedBeginnerChapters');
    if (savedProgress) {
      setCompletedChapters(JSON.parse(savedProgress));
    }
  }, []);

  // Save completed chapters to localStorage
  useEffect(() => {
    if (Object.keys(completedChapters).length > 0) {
      localStorage.setItem('completedBeginnerChapters', JSON.stringify(completedChapters));
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
    localStorage.setItem('completedBeginnerChapters', JSON.stringify({}));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        {/* Navbar */}
        <div className="bg-pink-600 text-white p-4 flex items-center justify-between">
          <a href="/" className="text-white text-lg font-semibold hover:underline">
            Home
          </a>
          <div className="flex items-center gap-4">
            <span>{/* User email will go here */}</span>
            <button className="bg-pink-700 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Table of Contents Header */}
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">
              Table of Contents
            </h2>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Course Progress</span>
                <button 
                  onClick={handleReset}
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

            {/* Chapter Links */}
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <Link 
                  key={chapter.number}
                  href={chapter.path}
                  className={`block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-pink-50 transition-colors ${chapter.path === '#' ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-pink-600 mb-2">
                      Chapter {chapter.number}: {chapter.title}
                    </h3>
                    <span className="text-gray-600">
                      {completedChapters[`chapter${chapter.number}`] ? '✓' : ''}
                    </span>
                  </div>
                  <p className="text-gray-600">{chapter.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
