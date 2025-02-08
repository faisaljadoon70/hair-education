'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoBookOutline, IoCheckmarkCircle } from 'react-icons/io5';
import MobileHeader from '../navigation/MobileHeader';

interface Chapter {
  number: number;
  title: string;
  description: string;
  path: string;
}

interface Props {
  chapters: Chapter[];
  completedChapters: { [key: string]: boolean };
  setCompletedChapters: (chapters: { [key: string]: boolean }) => void;
  calculateProgress: () => number;
  handleReset: () => void;
}

export default function MobileIntermediatePage({
  chapters,
  completedChapters,
  setCompletedChapters,
  calculateProgress,
  handleReset
}: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader isHomePage={false} />
      
      <main className="flex-1 px-4 pt-16"> 
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span className="mx-2">/</span>
          <span>Intermediate</span>
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
          <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-pink-600"
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-sm text-gray-600">{calculateProgress()}% Complete</span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter.number}
              href={chapter.path}
              className={`block ${
                chapter.description === 'Coming soon...'
                  ? 'opacity-75 cursor-not-allowed'
                  : ''
              }`}
            >
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Chapter {chapter.number}: {chapter.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{chapter.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {chapter.description === 'Coming soon...' ? (
                      <span className="text-gray-400">
                        <IoBookOutline size={20} />
                      </span>
                    ) : completedChapters[`chapter${chapter.number}`] ? (
                      <span className="text-green-500">
                        <IoCheckmarkCircle size={20} />
                      </span>
                    ) : (
                      <span className="text-pink-600">
                        <IoBookOutline size={20} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
