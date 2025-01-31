'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface ModuleItem {
  text: string;
  content: string;
  subItems?: ModuleItem[]; // New field for nested subtopics
}

export default function BeginnerChapter1Page() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<{
    [key: string]: boolean;
  }>({});

  // Only load completedModules from localStorage on initial load
  useEffect(() => {
    const savedModules = localStorage.getItem('completedModulesChapter1');
    if (savedModules) {
      setCompletedModules(JSON.parse(savedModules)); // Populate state from localStorage
    }
  }, []); // This effect runs only once when the component mounts

  // Whenever completedModules state changes, update localStorage
  useEffect(() => {
    if (Object.keys(completedModules).length > 0) {
      localStorage.setItem(
        'completedModulesChapter1',
        JSON.stringify(completedModules)
      );
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

  // Updated modules with nested subtopics
  const modules: { title: string; items: ModuleItem[] }[] = [
    {
      title: 'Hair and Scalp',
      items: [
        {
          text: 'What is Hair?',
          content: 'What is Hair Content',
        },
        {
          text: 'Hair Structure',
          content: 'Hair Structure Content',
          subItems: [
            {
              text: 'Cuticle',
              content: 'Cuticle Content',
            },
            {
              text: 'Cortex',
              content: 'Cortex Content',
            },
            {
              text: 'Medulla',
              content: 'Medulla Content',
            },
          ],
        },
        {
          text: 'Natural Hair Color',
          content: 'Natural Hair Color Content',
          subItems: [
            {
              text: 'Eumelanin',
              content: 'Eumelanin Content',
            },
            {
              text: 'Trichosiderin',
              content: 'Trichosiderin Content',
            },
            {
              text: 'Pheomelanin',
              content: 'Pheomelanin Content',
            },
          ],
        },
        {
          text: 'Hair Root',
          content: 'Hair Root Content',
        },
        {
          text: 'Characteristics of Hair',
          content: 'Characteristics of Hair Content',
          subItems: [
            {
              text: 'Texture',
              content: 'Texture Content',
            },
            {
              text: 'Porosity',
              content: 'Porosity Content',
              subItems: [
                {
                  text: 'Low Porosity',
                  content: 'Low Porosity Content',
                },
                {
                  text: 'Average Porosity',
                  content: 'Average Porosity Content',
                },
                {
                  text: 'High Porosity',
                  content: 'High Porosity Content',
                },
              ],
            },
            {
              text: 'Porosity Test',
              content: 'Porosity Test Content',
            },
            {
              text: 'Elasticity',
              content: 'Elasticity Content',
            },
            {
              text: 'Density',
              content: 'Density Content',
            },
          ],
        },
        {
          text: 'Chemical Structure of Hair',
          content: 'Chemical Structure of Hair Content',
          subItems: [
            {
              text: 'Building Blocks of Protein',
              content: 'Building Blocks of Protein Content',
            },
            {
              text: 'Peptide Bonds',
              content: 'Peptide Bonds Content',
            },
            {
              text: 'Disulphide Bonds',
              content: 'Disulphide Bonds Content',
            },
            {
              text: 'Hydrogen Bonds',
              content: 'Hydrogen Bonds Content',
            },
            {
              text: 'Salt Bonds',
              content: 'Salt Bonds Content',
            },
            {
              text: 'Sugar Bonds',
              content: 'Sugar Bonds Content',
            },
          ],
        },
        {
          text: 'How is Hair Made (Bonds)?',
          content: 'How is Hair Made Content',
        },
        {
          text: 'Hair Growth Cycles',
          content: 'Hair Growth Cycles Content',
        },
      ],
    },
  ];

  // Calculate progress percentage using formula
  const calculateProgress = () => {
    let totalWeight = 0;
    let completedWeight = 0;

    const calculateItemWeight = (items: ModuleItem[], depth: number = 0) => {
      const weightMultiplier = Math.pow(0.8, depth); // Decrease weight for deeper levels
      
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
    
    // If chapter is 100% complete, mark it in the main beginner progress
    if (percentage === 100) {
      const beginnerProgress = JSON.parse(localStorage.getItem('completedBeginnerChapters') || '{}');
      if (!beginnerProgress.chapter1) {
        beginnerProgress.chapter1 = true;
        localStorage.setItem('completedBeginnerChapters', JSON.stringify(beginnerProgress));
      }
    }

    return { percentage };
  };

  // Render module items with checkmarks on leaf nodes only
  const renderModuleItems = (items: ModuleItem[]) => {
    return items.map((item) => (
      <div key={item.text}>
        <div
          className="flex items-center justify-between cursor-pointer py-1 hover:bg-pink-50 rounded px-2 -ml-2"
          onClick={() => handleContentClick(item.content, item.text)}
        >
          <span className="font-medium text-gray-800">{item.text}</span>
          <span>
            {!item.subItems && (completedModules[item.text] ? '✔' : '○')}
          </span>
        </div>
        {/* Render nested items if they exist */}
        {item.subItems && (
          <div className="ml-4">
            {renderModuleItems(item.subItems)} {/* Recursive call */}
          </div>
        )}
      </div>
    ));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        {/* Navbar */}
        <div className="bg-pink-600 text-white p-4 flex items-center justify-between">
          {/* Left side navigation */}
          <div className="flex items-center space-x-6">
            <a href="/" className="text-white text-lg font-semibold hover:underline">
              Home
            </a>
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
                      onClick={() => setCompletedModules({})}
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-pink-600 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress().percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm font-medium text-gray-700">
                      {calculateProgress().percentage}% Complete
                    </span>
                  </div>
                </div>
                <div className="space-y-4 pl-2">
                  {modules.map((module) => (
                    <div key={module.title}>
                      <h3 className="text-xl font-medium text-gray-800 mb-3">
                        {module.title}
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        {renderModuleItems(module.items)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Content Display */}
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
                      onClick={() => setCompletedModules({})}
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-pink-600 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress().percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm font-medium text-gray-700">
                      {calculateProgress().percentage}% Complete
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.title}>
                      <h3 className="text-xl font-medium text-gray-800 mb-3">
                        {module.title}
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        {renderModuleItems(module.items)}
                      </div>
                    </div>
                  ))}
                </div>
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
                        href="/beginner"
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
    </ProtectedRoute>
  );
}
