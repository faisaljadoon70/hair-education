'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';

const modules = [
  {
    title: 'Hair Color Basics',
    items: [
      { 
        text: 'Classification of Hair Color',
        content: 'Content about different classifications of hair color...'
      },
      {
        text: 'Temporary Colors',
        content: 'Content about temporary hair colors...'
      },
      {
        text: 'Semi-permanent Colors',
        content: 'Content about semi-permanent hair colors...'
      },
      {
        text: 'Demi-permanent Colors',
        content: 'Content about demi-permanent hair colors...'
      },
      {
        text: 'Permanent Colors',
        content: 'Content about permanent hair colors...'
      },
      {
        text: 'Natural and Metallic Hair Colors',
        content: 'Content about natural and metallic hair colors...'
      }
    ]
  },
  {
    title: 'Color Selection and Formulation',
    items: [
      {
        text: 'Rules for Selecting Hair Colors',
        content: 'Content about rules and guidelines for selecting hair colors...'
      },
      {
        text: 'Hydrogen Peroxide Basics',
        content: 'Content about hydrogen peroxide...'
      },
      {
        text: 'Role of Hydrogen Peroxide',
        content: 'Content about the role of hydrogen peroxide in hair coloring...'
      },
      {
        text: 'How Hydrogen Peroxide Works',
        content: 'Content about how hydrogen peroxide works in the coloring process...'
      },
      {
        text: 'Storing Hydrogen Peroxide',
        content: 'Content about proper storage of hydrogen peroxide...'
      },
      {
        text: 'Selecting Correct Formula',
        content: 'Content about selecting the right color formula...'
      }
    ]
  },
  {
    title: 'Pre-Color Procedures',
    items: [
      {
        text: 'Color Theory in Practice',
        content: 'Content about applying color theory in real-world scenarios...'
      },
      {
        text: 'Patch Test',
        content: 'Content about performing and interpreting patch tests...'
      },
      {
        text: 'Strand Test',
        content: 'Content about performing and interpreting strand tests...'
      },
      {
        text: 'Client Consultation',
        content: 'Content about conducting thorough client consultations...'
      },
      {
        text: 'Hair Color Formula',
        content: 'Content about creating the right hair color formula...'
      }
    ]
  },
  {
    title: 'Application Techniques',
    items: [
      {
        text: 'Sectioning and Saturation',
        content: 'Content about proper sectioning and saturation techniques...'
      },
      {
        text: 'Virgin Hair Application',
        content: 'Content about permanent single process color on virgin hair...'
      },
      {
        text: 'Achieving Darker Shade',
        content: 'Content about techniques for achieving darker shades...'
      },
      {
        text: 'Achieving Lighter Shade',
        content: 'Content about techniques for achieving lighter shades...'
      }
    ]
  },
  {
    title: 'Color Maintenance',
    items: [
      {
        text: 'Retouch Basics',
        content: 'Content about basic retouch procedures...'
      },
      {
        text: 'Retouch with Color Bath',
        content: 'Content about retouch procedures with color bath...'
      }
    ]
  }
];

export default function BeginnerChapter4Page() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  // Load completed modules from localStorage on initial load
  useEffect(() => {
    const savedProgress = localStorage.getItem('completedModulesChapter4');
    if (savedProgress) {
      setCompletedModules(JSON.parse(savedProgress));
    }
  }, []);

  // Save completed modules to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'completedModulesChapter4',
      JSON.stringify(completedModules)
    );
  }, [completedModules]);

  const handleContentClick = (content: string, title: string) => {
    setSelectedContent(content);
    setSelectedTitle(title);
    setCompletedModules(prev => ({ ...prev, [title]: true }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
          <div className="flex items-center justify-between px-4 h-full relative">
            <Link
              href="/"
              className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
            >
              <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
              <span className="text-lg">Home</span>
            </Link>

            <div className="hidden md:flex space-x-14 items-center">
              <span className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md">
                Beginner
              </span>
              <Link href="/intermediate" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                Intermediate
              </Link>
              <Link href="/expert" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                Expert
              </Link>
              <Link href="/contact" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-white/90">{user?.email}</span>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
                className="bg-white/25 px-4 py-1 rounded-md shadow-md hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-2 text-sm">
              <span className="text-gray-500">Your path: </span>
              <Link href="/" className="text-pink-600 hover:text-pink-700">
                Home
              </Link>
              <span className="text-gray-500"> / </span>
              <Link href="/beginner" className="text-pink-600 hover:text-pink-700">
                Beginner
              </Link>
              <span className="text-gray-500"> / </span>
              <span className="text-gray-900">Chapter 4</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Table of Contents */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Chapter Progress</span>
                    <button
                      onClick={() => {
                        setCompletedModules({});
                        localStorage.removeItem('completedModulesChapter4');
                      }}
                      className="text-pink-600 text-sm hover:text-pink-700"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ 
                        width: `${Math.round(
                          (Object.values(completedModules).filter(Boolean).length /
                            modules.reduce((sum, module) => sum + module.items.length, 0)) *
                            100
                        )}%` 
                      }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {Math.round(
                      (Object.values(completedModules).filter(Boolean).length /
                        modules.reduce((sum, module) => sum + module.items.length, 0)) *
                        100
                    )}% Complete
                  </div>
                </div>

                {modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="mb-6">
                    <h3 className="font-medium mb-2">{module.title}</h3>
                    <ul className="space-y-2">
                      {module.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={`cursor-pointer text-sm hover:text-pink-600 ${
                            completedModules[item.text] ? 'text-pink-600 bg-pink-50 rounded-md pl-2' : ''
                          }`}
                          onClick={() => handleContentClick(item.content, item.text)}
                        >
                          <div className="flex items-center">
                            <span>{item.text}</span>
                            {completedModules[item.text] && (
                              <span className="ml-2">✓</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content Area */}
            <div className="md:w-3/4">
              {selectedContent ? (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">{selectedTitle}</h2>
                  <div className="prose max-w-none">
                    {selectedContent}
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="mt-8 flex justify-between items-center">
                    <Link
                      href="/beginner"
                      className="text-pink-600 hover:text-pink-700 flex items-center"
                    >
                      <span className="mr-2">←</span>
                      Back to Chapters
                    </Link>
                    <button
                      onClick={() => {
                        const allItems = modules.flatMap(m => m.items);
                        const currentIndex = allItems.findIndex(item => item.content === selectedContent);
                        if (currentIndex < allItems.length - 1) {
                          const nextItem = allItems[currentIndex + 1];
                          handleContentClick(nextItem.content, nextItem.text);
                        }
                      }}
                      className="text-pink-600 hover:text-pink-700 flex items-center"
                      disabled={!selectedContent}
                    >
                      Next Topic
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center text-gray-500">
                  <p className="text-xl">Select a topic from the table of contents to begin learning.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
