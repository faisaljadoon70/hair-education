'use client';

import { useState, useEffect } from 'react';
import MobileHeader from '../navigation/MobileHeader';
import { supabase } from '@/utils/supabase-client';
import Link from 'next/link';

export default function MobileChapterOverviewContainer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('user_progress')
            .select('progress')
            .eq('user_id', user.id)
            .eq('chapter', 'beginner-overview')
            .single();
          
          if (data) {
            setProgress(data.progress);
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader isHomePage={false} />
      
      <main className="pt-12 px-4 pb-20">
        <div className="mb-4">
          <h1 className="text-lg font-medium text-gray-900 mb-2">Chapter 1: Hair and Scalp</h1>
          <p className="text-sm text-gray-600 mb-4">
            Welcome to Chapter 1 of your hair education journey! In this chapter, we'll explore the fundamental concepts of hair structure and composition. Understanding these basics is crucial for becoming a skilled colorist.
          </p>
        </div>

        {/* What You'll Learn Section */}
        <div className="bg-pink-50 rounded-lg p-3 mb-4">
          <h2 className="text-sm font-medium text-gray-900 mb-2">What You'll Learn</h2>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">Understanding hair structure and its components</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">The different parts of the hair shaft</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">Natural hair color and pigmentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">Hair and scalp anatomy basics</span>
            </li>
          </ul>
        </div>

        {/* Chapter Highlights */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-2">Chapter Highlights</h2>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">Interactive learning modules</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">Detailed diagrams and illustrations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">Progress tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              <span className="text-xs text-gray-600">Practical exercises</span>
            </li>
          </ul>
        </div>

        {/* Start Chapter Button */}
        <div className="mt-4">
          <Link href="/beginner-chapter1" className="block w-fit mx-auto">
            <button className="bg-pink-500 text-white py-2 px-6 rounded text-xs font-medium hover:bg-pink-600 transition-colors">
              Start Chapter 1
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
