'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import MobileHeader from '../navigation/MobileHeader';
import { useSession } from '@/hooks/useSession';

interface ModuleItem {
  text: string;
  content: string;
  completed?: boolean;
}

interface MobileBeginnerChapter1PageProps {
  isLoading: boolean;
  modules: { title: string; items: ModuleItem[] }[];
  currentModule: number;
  setCurrentModule: (index: number) => void;
  progress: number;
}

const MobileBeginnerChapter1Page: React.FC<MobileBeginnerChapter1PageProps> = ({
  isLoading,
  modules,
  currentModule,
  setCurrentModule,
  progress
}) => {
  const router = useRouter();
  const { session } = useSession();
  const userEmail = session?.user?.email || '';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader isHomePage={false} />
      
      <main className="flex-1 px-4 pt-16">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / Beginner / Chapter 1
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 pb-20">
            {/* Progress Bar */}
            <div className="px-4 pt-4 pb-2">
              <div className="text-sm text-gray-600 mb-2">Progress: {Math.round((progress / (modules.reduce((acc, m) => acc + m.items.length, 0))) * 100)}%</div>
              <div className="h-2 bg-pink-100 rounded-full">
                <div 
                  className="h-full bg-pink-600 rounded-full transition-all duration-300"
                  style={{ width: `${(progress / (modules.reduce((acc, m) => acc + m.items.length, 0))) * 100}%` }}
                />
              </div>
            </div>

            {/* Module Navigation */}
            <div className="flex gap-2 px-4 overflow-x-auto pb-2 hide-scrollbar">
              {modules.map((module, idx) => (
                <button
                  key={module.title}
                  onClick={() => setCurrentModule(idx)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    currentModule === idx 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  {module.title}
                </button>
              ))}
            </div>

            {/* Current Module Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={currentModule}
              className="flex-1 overflow-y-auto px-4 py-2"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {modules[currentModule].title}
              </h2>
              
              {modules[currentModule].items.map((item, idx) => (
                <div 
                  key={item.text}
                  className={`p-4 rounded-lg mb-4 ${
                    item.completed 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <h3 className="text-base font-semibold mb-2 flex items-center">
                    {item.completed && (
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {item.text}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.content}</p>
                </div>
              ))}
            </motion.div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <div className="flex justify-between">
                <button
                  onClick={() => router.push('/beginner-chapter1-overview')}
                  className="px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg flex items-center"
                >
                  <IoChevronBack className="mr-1" />
                  Back to Overview
                </button>
                <button
                  onClick={() => router.push('/beginner-chapter2-overview')}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Next Chapter
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MobileBeginnerChapter1Page;
