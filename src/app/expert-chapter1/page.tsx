'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ModuleItem {
  text: string;
  content: string;
  subItems?: ModuleItem[];
}

export default function ExpertChapter1() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<{[key: string]: boolean}>({});

  // Only load completedModules from localStorage on initial load
  useEffect(() => {
    const savedModules = localStorage.getItem('completedModulesExpertChapter1');
    if (savedModules) {
      setCompletedModules(JSON.parse(savedModules));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (Object.keys(completedModules).length > 0) {
      localStorage.setItem(
        'completedModulesExpertChapter1',
        JSON.stringify(completedModules)
      );
    } else {
      localStorage.removeItem('completedModulesExpertChapter1');
    }
  }, [completedModules]);

  const handleContentClick = (content: string, module: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedContent(content);
    setCompletedModules((prev) => ({ ...prev, [module]: true }));
  };

  // Find next topic based on current content
  const findNextTopic = (currentContent: string | null): string | null => {
    if (!currentContent) return null;
    
    let found = false;
    let nextTopic: string | null = null;

    const searchItems = (items: ModuleItem[]) => {
      for (const item of items) {
        if (found && !item.subItems) {
          nextTopic = item.content;
          return true;
        }
        if (item.content === currentContent) {
          found = true;
          if (item.subItems && item.subItems.length > 0) {
            nextTopic = item.subItems[0].content;
            return true;
          }
          continue;
        }
        if (item.subItems) {
          if (searchItems(item.subItems)) return true;
        }
      }
      return false;
    };

    modules.forEach(module => {
      searchItems(module.items);
    });

    return nextTopic;
  };

  // Handle next topic click
  const handleNextTopic = () => {
    const nextTopic = findNextTopic(selectedContent);
    if (nextTopic) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSelectedContent(nextTopic);
    }
  };

  const handleReset = () => {
    setCompletedModules({});
    setSelectedContent(null);
    localStorage.removeItem('completedModulesExpertChapter1');
  };

  const handleItemClick = (item: ModuleItem) => {
    handleContentClick(item.content, item.text);
  };

  const modules: { title: string; items: ModuleItem[] }[] = [
    {
      title: 'Module 1: Advanced Color Formulation',
      items: [
        { text: 'Custom Color Mixing', content: 'Custom Color Mixing Content' },
        { text: 'Color Correction', content: 'Color Correction Content' },
      ]
    },
    {
      title: 'Module 2: Business Management',
      items: [
        { text: 'Salon Operations', content: 'Salon Operations Content' },
        { text: 'Client Relations', content: 'Client Relations Content' },
      ]
    },
    {
      title: 'Module 3: Advanced Techniques',
      items: [
        { text: 'Balayage Mastery', content: 'Balayage Mastery Content' },
        { text: 'Creative Color Design', content: 'Creative Color Design Content' },
      ]
    }
  ];

  // Calculate progress percentage using formula
  const calculateProgress = () => {
    let totalWeight = 0;
    let completedWeight = 0;

    const calculateItemWeight = (items: ModuleItem[], depth: number = 0) => {
      const weightMultiplier = Math.pow(0.8, depth);
      
      items.forEach(item => {
        const currentWeight = weightMultiplier;
        totalWeight += currentWeight;
        
        if (completedModules[item.text]) {
          completedWeight += currentWeight;
        }

        if (item.subItems) {
          calculateItemWeight(item.subItems, depth + 1);
        }
      });
    };

    modules.forEach(module => {
      calculateItemWeight(module.items);
    });

    const percentage = Math.round((completedWeight / totalWeight) * 100) || 0;
    
    if (percentage === 100) {
      const expertProgress = JSON.parse(localStorage.getItem('completedExpertChapters') || '{}');
      if (!expertProgress.chapter1) {
        expertProgress.chapter1 = true;
        localStorage.setItem('completedExpertChapters', JSON.stringify(expertProgress));
      }
    }

    return percentage;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <Link
            href="/"
            className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
            aria-label="Go to home page"
          >
            <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
            <span className="text-lg">Home</span>
          </Link>

          <div className="hidden md:flex space-x-14 items-center">
            <Link href="/beginner" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Beginner
            </Link>
            <Link href="/intermediate" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Intermediate
            </Link>
            <span className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md">
              Expert
            </span>
            <Link href="/contact" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/90">faisal_70@yahoo.com</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span>/</span>
          <Link href="/expert" className="hover:text-pink-600">Expert</Link>
          <span>/</span>
          <span className="text-gray-900">Chapter 1</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Table of Contents */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Chapter Progress</span>
                <button
                  onClick={handleReset}
                  className="text-pink-600 text-sm hover:text-pink-700"
                >
                  Reset
                </button>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <div className="text-right text-sm text-gray-500 mt-1">
                {calculateProgress()}% Complete
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
                      onClick={() => handleItemClick(item)}
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

          {/* Content Area */}
          <div className="md:col-span-2">
            {selectedContent ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedContent}</h2>
                <div className="prose max-w-none">
                  <div className="mb-8">
                    Content about {selectedContent.toLowerCase()}...
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <Link
                    href="/expert"
                    className="text-pink-600 hover:text-pink-700"
                  >
                    ← Back to Chapters
                  </Link>
                  
                  {findNextTopic(selectedContent) && (
                    <button
                      onClick={handleNextTopic}
                      className="text-pink-600 hover:text-pink-700"
                    >
                      Next Topic →
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600 bg-white rounded-xl shadow-lg p-6">
                Select a topic from the table of contents to begin learning.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
