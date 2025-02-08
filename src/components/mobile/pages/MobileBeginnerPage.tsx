'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@/utils/supabase-client';
import { IoBookOutline, IoCheckmarkCircle } from 'react-icons/io5';
import MobileHeader from '../navigation/MobileHeader';

interface Chapter {
  number: number;
  title: string;
  description: string;
  path: string;
}

export default function MobileBeginnerPage() {
  const [completedChapters, setCompletedChapters] = useState<{
    [key: string]: boolean;
  }>({});
  const [progress, setProgress] = useState(0);

  // Array of chapters
  const chapters: Chapter[] = [
    {
      number: 1,
      title: 'Hair and Scalp',
      description: 'Learn about hair structure, types, and characteristics.',
      path: '/beginner-chapter1-overview',
    },
    {
      number: 2,
      title: 'Level System',
      description: 'Learn about hair color levels, natural tones, and the level system.',
      path: '/beginner-chapter2-overview',
    },
    {
      number: 3,
      title: 'Color Theory',
      description: 'Master the fundamentals of color theory and its application in hair coloring.',
      path: '/beginner-chapter3-overview',
    },
    {
      number: 4,
      title: 'Hair Coloring',
      description: 'Learn about different types of hair colors, application techniques, and proper color formulation.',
      path: '/beginner-chapter4-overview',
    },
    {
      number: 5,
      title: 'Chapter 5',
      description: 'Coming soon...',
      path: '#',
    },
  ];

  useEffect(() => {
    const loadProgress = () => {
      const savedProgress = localStorage.getItem('completedBeginnerChapters');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setCompletedChapters(parsed);
        
        // Calculate progress
        const completedCount = Object.values(parsed).filter(Boolean).length;
        const totalChapters = chapters.length;
        setProgress((completedCount / totalChapters) * 100);
      }
    };

    loadProgress();
  }, []);

  const handleReset = () => {
    localStorage.removeItem('completedBeginnerChapters');
    setCompletedChapters({});
    setProgress(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader isHomePage={false} />
      
      <main className="flex-1 px-4 pt-16"> 
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span className="mx-2">/</span>
          <span>Beginner</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h1>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
            <button
              onClick={handleReset}
              className="text-sm text-pink-600 hover:text-pink-700"
            >
              Reset
            </button>
          </div>
          <div className="bg-gray-200 rounded-full h-2 mb-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-pink-600 h-2 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <motion.div
              key={chapter.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <Link href={chapter.path} className={`block ${chapter.path === '#' ? 'cursor-not-allowed' : ''}`}>
                <h3 className="text-lg font-semibold text-pink-600 mb-1">
                  Chapter {chapter.number}: {chapter.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{chapter.description}</p>
                <div className="flex items-center text-sm">
                  {completedChapters[`Chapter ${chapter.number}`] ? (
                    <div className="flex items-center text-green-600">
                      <IoCheckmarkCircle className="w-5 h-5 mr-1" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-blue-600">
                      <IoBookOutline className="w-5 h-5 mr-1" />
                      <span>Available</span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
