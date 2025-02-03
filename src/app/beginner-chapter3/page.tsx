'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DeviceCapabilitiesTest } from '@/components/DeviceCapabilitiesTest'

interface ModuleItem {
  text: string;
  content: string;
  isCategory?: boolean;
  subItems?: ModuleItem[];
}

const modules = [
  {
    title: 'Basic Principles of Color',
    items: [
      { 
        text: 'Understanding Color Basics',
        content: 'Content about basic principles of color...'
      },
      {
        text: 'Translucent vs Opaque Colors',
        content: 'Content about the difference between translucent and opaque colors...'
      },
      {
        text: 'Laws of Color',
        content: 'Content about the fundamental laws of color...'
      }
    ]
  },
  {
    title: 'Color Classifications',
    items: [
      {
        text: 'Primary Colors',
        content: 'Content about primary colors...'
      },
      {
        text: 'Secondary Colors',
        content: 'Content about secondary colors...'
      },
      {
        text: 'Tertiary/Complementary Colors',
        content: 'Content about tertiary and complementary colors...'
      }
    ]
  },
  {
    title: 'Color Theory Applications',
    items: [
      {
        text: 'The Color Wheel',
        content: 'Content about the color wheel and its use...'
      },
      {
        text: 'Light Effects on Color',
        content: 'Content about how light affects color perception...'
      },
      {
        text: 'Tone and Hue',
        content: 'Content about understanding tone and hue in colors...'
      }
    ]
  },
  {
    title: 'Color Systems',
    items: [
      {
        text: 'The Shade System',
        content: 'Content about the shade system in hair coloring...'
      }
    ]
  },
  {
    title: 'Exercise',
    items: [
      {
        text: 'Practice Questions',
        content: 'Interactive practice questions about color theory...'
      }
    ]
  }
];

export default function BeginnerChapter3Page() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  // Only load completedModules from localStorage on initial load
  useEffect(() => {
    const savedProgress = localStorage.getItem('completedModulesBeginnerChapter3');
    if (savedProgress) {
      setCompletedModules(JSON.parse(savedProgress));
    }
  }, []);

  // Save completedModules to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'completedModulesBeginnerChapter3',
      JSON.stringify(completedModules)
    );
  }, [completedModules]);

  return (
    <ProtectedRoute>
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <a
            href="/"
            className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
            aria-label="Go to home page"
          >
            <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
            <span className="text-lg">Home</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-14" role="navigation" aria-label="Main navigation">
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Home page"
            >
              Home
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/beginner"
              onClick={(e) => { e.preventDefault(); handleNavigation('/beginner'); }}
              className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md"
              aria-current="page"
            >
              Beginner
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/intermediate"
              onClick={(e) => { e.preventDefault(); handleNavigation('/intermediate'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Intermediate courses"
            >
              Intermediate
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/expert"
              onClick={(e) => { e.preventDefault(); handleNavigation('/expert'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Expert courses"
            >
              Expert
            </a>
            <div className="h-4 w-px bg-white/20 transform -skew-x-12"></div>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}
              className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md px-2"
              aria-label="Contact page"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-transform duration-200 transform origin-center" 
                 style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(2px, 8px)' : 'none' }}></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-200"
                 style={{ opacity: isMobileMenuOpen ? '0' : '1' }}></div>
            <div className="w-6 h-0.5 bg-white transition-transform duration-200 transform origin-center"
                 style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(2px, -8px)' : 'none' }}></div>
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <span className="text-white/90">faisal_70@yahoo.com</span>
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
            <button 
              className="text-white bg-gradient-to-r from-white/25 to-white/20 hover:from-white/30 hover:to-white/25 py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600"
              aria-label="Sign out of your account"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-pink-600 shadow-lg transform transition-transform duration-200 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="px-4 py-3 space-y-2">
            <a href="/" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Home</a>
            <a href="/beginner" className="block py-2 px-4 text-white bg-white/15 rounded-md">Beginner</a>
            <a href="/intermediate" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Intermediate</a>
            <a href="/expert" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Expert</a>
            <a href="/contact" className="block py-2 px-4 text-white/90 hover:bg-white/10 rounded-md">Contact</a>
            <div className="pt-2 mt-2 border-t border-white/10">
              <span className="block px-4 py-2 text-white/90 text-sm">faisal_70@yahoo.com</span>
              <button className="w-full mt-2 px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors">
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-pink-50/50 py-2 px-4 text-sm text-pink-700">
        <span>Your path: </span>
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }} className="hover:underline">Home</a>
        <span className="mx-2">/</span>
        <a href="/beginner" onClick={(e) => { e.preventDefault(); handleNavigation('/beginner'); }} className="hover:underline">Beginner</a>
        <span className="mx-2">/</span>
        <span>Chapter 3</span>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main content layout */}
        <div className="max-w-[95%] mx-auto p-8">
          <div className="flex flex-col md:flex-row gap-8 p-8">
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
                        localStorage.removeItem('completedModulesBeginnerChapter3');
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
                          onClick={() => {
                            setSelectedContent(item.content);
                            setCompletedModules(prev => ({ ...prev, [item.text]: true }));
                          }}
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
                  <div className="prose max-w-none">
                    {selectedContent}
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="mt-8 flex justify-between items-center">
                    <a
                      href="/beginner"
                      className="text-pink-600 hover:text-pink-700 flex items-center"
                    >
                      <span className="mr-2">←</span>
                      Back to Chapters
                    </a>
                    <button
                      onClick={() => {
                        const allItems = modules.flatMap(m => m.items);
                        const currentIndex = allItems.findIndex(item => item.content === selectedContent);
                        if (currentIndex < allItems.length - 1) {
                          const nextItem = allItems[currentIndex + 1];
                          setSelectedContent(nextItem.content);
                          setCompletedModules(prev => ({ ...prev, [nextItem.text]: true }));
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
