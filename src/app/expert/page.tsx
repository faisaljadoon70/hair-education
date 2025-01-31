'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface ModuleItem {
  text: string;
  content: string;
  preview?: string;
  subItems?: ModuleItem[];
}

export default function ExpertPage() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  // Load completed chapters from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('completedExpertChapters');
    if (stored) {
      setCompletedChapters(JSON.parse(stored));
    }
  }, []);

  // Save completed chapters to localStorage
  useEffect(() => {
    if (Object.keys(completedChapters).length > 0) {
      localStorage.setItem('completedExpertChapters', JSON.stringify(completedChapters));
    }
  }, [completedChapters]);

  const chapters = [
    {
      id: 'chapter1',
      title: 'Chapter 1: Advanced Hair Techniques',
      description: 'Master color formulation, business management, and advanced coloring techniques.',
      link: '/expert-chapter1'
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
    const completed = Object.values(completedChapters).filter(Boolean).length;
    return Math.round((completed / chapters.length) * 100);
  };

  const handleContentClick = (content: string, chapterId: string, link: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedContent(content);
    setCompletedChapters((prev) => ({ ...prev, [chapterId]: true }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="bg-pink-600 text-white p-4 flex justify-between items-center">
          <a href="/" className="text-white text-lg font-semibold hover:underline">
            Home
          </a>
          <button className="bg-pink-700 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold text-pink-600 mb-4">Table of Contents</h1>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Course Progress</span>
                <button 
                  className="text-sm text-pink-600 hover:text-pink-700"
                  onClick={() => setCompletedChapters({})}
                >
                  Reset
                </button>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-pink-600 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <div className="text-right text-sm text-gray-600 mt-1">
                {calculateProgress()}% Complete
              </div>
            </div>

            {/* Chapter Links */}
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={chapter.link}
                  className={`block p-4 rounded-lg border hover:shadow-md transition-all ${
                    chapter.link === '#' 
                      ? 'border-gray-200 cursor-not-allowed' 
                      : 'border-gray-200 hover:border-pink-400'
                  }`}
                  onClick={() => handleContentClick(chapter.description, chapter.id, chapter.link)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-600">{chapter.title}</h3>
                      <p className="text-gray-600 mt-1">{chapter.description}</p>
                    </div>
                    {completedChapters[chapter.id] && (
                      <span className="text-green-500">✓</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
