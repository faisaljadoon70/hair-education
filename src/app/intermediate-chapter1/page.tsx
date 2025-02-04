'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ModuleItem {
  text: string;
  content: string;
  subItems?: ModuleItem[];
}

export default function IntermediateChapter1() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});

  // Only load completedModules from localStorage on initial load
  useEffect(() => {
    const savedModules = localStorage.getItem('completedModulesIntermediateChapter1');
    if (savedModules) {
      setCompletedModules(JSON.parse(savedModules));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (Object.keys(completedModules).length > 0) {
      localStorage.setItem(
        'completedModulesIntermediateChapter1',
        JSON.stringify(completedModules)
      );
    } else {
      localStorage.removeItem('completedModulesIntermediateChapter1');
    }
  }, [completedModules]);

  const handleModuleComplete = (module: string) => {
    setCompletedModules((prev) => ({ ...prev, [module]: true }));
  };

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

  const modules: { title: string; items: ModuleItem[] }[] = [
    {
      title: 'Porosity Analysis',
      items: [
        { text: 'Low Porosity', content: 'Low Porosity Content' },
        { text: 'Medium Porosity', content: 'Medium Porosity Content' },
        { text: 'High Porosity', content: 'High Porosity Content' },
      ]
    },
    {
      title: 'Hair Strand Structure',
      items: [
        { text: 'Cuticle', content: 'Cuticle Content' },
        { text: 'Cortex', content: 'Cortex Content' },
        { text: 'Medulla', content: 'Medulla Content' },
      ]
    },
    {
      title: 'Hair Growth Cycles',
      items: [
        { text: 'Anagen', content: 'Anagen Content' },
        { text: 'Catagen', content: 'Catagen Content' },
        { text: 'Telogen', content: 'Telogen Content' },
        { text: 'Exogen', content: 'Exogen Content' },
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
      const intermediateProgress = JSON.parse(localStorage.getItem('completedIntermediateChapters') || '{}');
      if (!intermediateProgress.chapter1) {
        intermediateProgress.chapter1 = true;
        localStorage.setItem('completedIntermediateChapters', JSON.stringify(intermediateProgress));
      }
    }

    return { percentage };
  };

  // Render module items with checkmarks on leaf nodes only
  const renderModuleItems = (items: ModuleItem[], depth: number = 0) => {
    return (
      <ul className={`space-y-2 ${depth > 0 ? 'ml-6' : ''}`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <button
                onClick={() => {
                  if (!item.subItems) {
                    handleContentClick(item.content, item.text);
                  }
                }}
                className={`text-left hover:text-pink-600 ${
                  !item.subItems ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {item.text}
              </button>
              {item.subItems && renderModuleItems(item.subItems, depth + 1)}
            </div>
            {!item.subItems && (
              <span className="text-green-500">
                {completedModules[item.text] && '✓'}
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Navbar */}
      <div className="bg-pink-600 text-white p-4 flex items-center justify-between">
        {/* Left side navigation */}
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-white text-lg font-semibold hover:underline"
          >
            🏠 Home
          </Link>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <span>{/* User email will go here */}</span>
          <button className="bg-pink-700 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content layout */}
      <div className="max-w-[95%] mx-auto p-8">
        {/* Table of Contents Centered on initial load */}
        {!selectedContent && (
          <div className="flex justify-center items-center">
            <div className="w-2/3 bg-white rounded-lg shadow-md px-4 py-6">
              <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                Table of Contents
              </h2>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Chapter Progress</span>
                  <button 
                    onClick={() => {
                      setCompletedModules({});
                      setSelectedContent(null);
                      localStorage.removeItem('completedModulesIntermediateChapter1');
                    }}
                    className="text-sm text-pink-600 hover:text-pink-700"
                  >
                    Reset
                  </button>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-pink-600 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress().percentage}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-600 mt-1">
                  {calculateProgress().percentage}% Complete
                </div>
              </div>
              {/* Module List */}
              {modules.map((module, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {module.title}
                  </h3>
                  {renderModuleItems(module.items)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Layout with Sidebar */}
        {selectedContent && (
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-1/5 bg-white rounded-lg shadow-md pl-4 pr-2 py-6">
              <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                Table of Contents
              </h2>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Chapter Progress</span>
                  <button 
                    onClick={() => {
                      setCompletedModules({});
                      setSelectedContent(null);
                      localStorage.removeItem('completedModulesIntermediateChapter1');
                    }}
                    className="text-sm text-pink-600 hover:text-pink-700"
                  >
                    Reset
                  </button>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-pink-600 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress().percentage}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-600 mt-1">
                  {calculateProgress().percentage}% Complete
                </div>
              </div>
              {/* Module List */}
              {modules.map((module, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {module.title}
                  </h3>
                  {renderModuleItems(module.items)}
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="w-4/5 bg-white rounded-lg shadow-md px-8 py-6">
              <div className="min-h-[calc(100vh-16rem)] flex flex-col">
                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                    {selectedContent}
                  </h2>
                  <p className="text-gray-600">
                    Detailed content for {selectedContent}.
                  </p>
                </div>

                {/* Navigation Bar */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <a
                      href="/intermediate"
                      className="inline-flex items-center px-4 py-2 text-pink-600 hover:text-pink-700 font-semibold"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 19l-7-7 7-7" 
                        />
                      </svg>
                      Back to Chapters
                    </a>
                    
                    <button
                      onClick={handleNextTopic}
                      disabled={!findNextTopic(selectedContent)}
                      className={`inline-flex items-center px-4 py-2 font-semibold rounded-md transition-colors
                        ${findNextTopic(selectedContent)
                          ? 'text-pink-600 hover:text-pink-700'
                          : 'text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      Next Topic
                      <svg 
                        className="w-5 h-5 ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
