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
  const [chapterProgress, setChapterProgress] = useState<{
    [key: string]: number;
  }>({});
  const [overallProgress, setOverallProgress] = useState(0);

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
    const loadProgress = async () => {
      try {
        // Load progress for each chapter from localStorage
        const progressMap: { [key: string]: number } = {};
        
        // Load Chapter 1 progress
        const ch1Topics = localStorage.getItem('beginner-chapter1-viewed-topics');
        if (ch1Topics) {
          const topics = JSON.parse(ch1Topics);
          progressMap['chapter1'] = topics.length > 0 ? 100 : 0;
        }

        // Load Chapter 2 progress (when implemented)
        const ch2Topics = localStorage.getItem('beginner-chapter2-viewed-topics');
        if (ch2Topics) {
          const topics = JSON.parse(ch2Topics);
          progressMap['chapter2'] = topics.length > 0 ? 100 : 0;
        }

        // Load Chapter 3 progress (when implemented)
        const ch3Topics = localStorage.getItem('beginner-chapter3-viewed-topics');
        if (ch3Topics) {
          const topics = JSON.parse(ch3Topics);
          progressMap['chapter3'] = topics.length > 0 ? 100 : 0;
        }

        // Load Chapter 4 progress (when implemented)
        const ch4Topics = localStorage.getItem('beginner-chapter4-viewed-topics');
        if (ch4Topics) {
          const topics = JSON.parse(ch4Topics);
          progressMap['chapter4'] = topics.length > 0 ? 100 : 0;
        }

        // Load Chapter 5 progress (when implemented)
        const ch5Topics = localStorage.getItem('beginner-chapter5-viewed-topics');
        if (ch5Topics) {
          const topics = JSON.parse(ch5Topics);
          progressMap['chapter5'] = topics.length > 0 ? 100 : 0;
        }

        setChapterProgress(progressMap);

        // Calculate overall progress
        const totalProgress = Object.values(progressMap).reduce((sum, curr) => sum + curr, 0);
        setOverallProgress(Math.round(totalProgress / chapters.length));

        // Sync with Supabase if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('user_progress')
            .select('chapter, progress')
            .eq('user_id', user.id)
            .in('chapter', ['beginner-1', 'beginner-2', 'beginner-3', 'beginner-4', 'beginner-5']);

          if (data) {
            const supabaseProgress: { [key: string]: number } = {};
            data.forEach(item => {
              const chapterNum = item.chapter.split('-')[1];
              supabaseProgress[`chapter${chapterNum}`] = item.progress;
            });
            setChapterProgress(prev => ({ ...prev, ...supabaseProgress }));
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, [chapters.length]);

  const handleReset = async () => {
    // Reset local storage
    localStorage.removeItem('beginner-chapter1-viewed-topics');
    localStorage.removeItem('beginner-chapter2-viewed-topics');
    localStorage.removeItem('beginner-chapter3-viewed-topics');
    localStorage.removeItem('beginner-chapter4-viewed-topics');
    localStorage.removeItem('beginner-chapter5-viewed-topics');
    
    setChapterProgress({});
    setOverallProgress(0);

    // Reset Supabase if user is logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('user_progress')
          .upsert([
            { user_id: user.id, chapter: 'beginner-1', progress: 0, viewed_topics: [] },
            { user_id: user.id, chapter: 'beginner-2', progress: 0, viewed_topics: [] },
            { user_id: user.id, chapter: 'beginner-3', progress: 0, viewed_topics: [] },
            { user_id: user.id, chapter: 'beginner-4', progress: 0, viewed_topics: [] },
            { user_id: user.id, chapter: 'beginner-5', progress: 0, viewed_topics: [] }
          ]);
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader isHomePage={false} />
      
      <main className="flex-1 px-4 pt-12">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span className="mx-2">/</span>
          <span>Beginner</span>
        </div>

        <h1 className="text-lg font-medium text-gray-900 mb-4">Table of Contents</h1>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-sm font-medium text-gray-900">Course Progress</h2>
            <button
              onClick={handleReset}
              className="text-pink-500 text-xs font-medium"
            >
              Reset
            </button>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">{overallProgress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-pink-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <Link 
              href={chapter.path} 
              key={chapter.number}
              className={chapter.path === '#' ? 'pointer-events-none' : ''}
            >
              <div className="bg-white rounded-lg shadow-sm p-3 hover:bg-gray-50">
                <h3 className={`text-sm font-medium mb-1 ${chapterProgress[`chapter${chapter.number}`] === 100 ? 'text-pink-500' : 'text-gray-900'}`}>
                  Chapter {chapter.number}: {chapter.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{chapter.description}</p>
                {chapter.path === '#' ? (
                  <span className="inline-flex items-center text-xs text-gray-400">
                    <IoBookOutline className="w-3 h-3 mr-1" />
                    Coming Soon
                  </span>
                ) : chapterProgress[`chapter${chapter.number}`] === 100 ? (
                  <span className="inline-flex items-center text-xs text-pink-500">
                    <IoCheckmarkCircle className="w-3 h-3 mr-1" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <IoBookOutline className="w-3 h-3 mr-1" />
                    Available
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
