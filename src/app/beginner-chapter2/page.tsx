'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DeviceCapabilitiesTest } from '@/components/DeviceCapabilitiesTest';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';

interface ModuleItem {
  text: string;
  content: string;
  isCategory?: boolean;
  subItems?: ModuleItem[];
}

export default function BeginnerChapter2Page() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [completedModules, setCompletedModules] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  // Only load completedModules from localStorage on initial load
  useEffect(() => {
    const savedModules = localStorage.getItem('completedModulesChapter2');
    if (savedModules) {
      setCompletedModules(JSON.parse(savedModules));
    }
  }, []);

  // Whenever completedModules state changes, update localStorage
  useEffect(() => {
    if (Object.keys(completedModules).length > 0) {
      localStorage.setItem(
        'completedModulesChapter2',
        JSON.stringify(completedModules)
      );
    }
  }, [completedModules]);

  // Update the click handler to accept both content and title
  const handleContentClick = (content: string, title: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedContent(content);
    setSelectedTitle(title);
    setCompletedModules((prev) => ({ ...prev, [title]: true }));
  };

  // Section icons mapping
  const sectionIcons: { [key: string]: string } = {
    'Level System': '📏',
    'Identifying Natural Hair Level and Tone': '🔍',
    'The Level System': '📊',
    'Natural Levels of Hair': '🎨',
    'Categories of Colour': '🌈'
  };

  // Define modules outside of calculateProgress
  const modules: { title: string; items: ModuleItem[] }[] = [
    {
      title: 'Level System',
      items: [
        {
          text: 'Identifying Natural Hair Level and Tone',
          content: `
            <p>
              Learning to identify a client’s natural hair colour is the most important step in becoming a good colourist. Natural hair colour ranges from black to dark brown to red, and from dark blond to light blond. Hair colour is unique to everyone; no two people have exactly the same colour.
            </p>
            <p class="mt-4">The kinds of melanin determining natural hair colour are:</p>
            <ul class="list-disc list-inside ml-4">
              <li><strong style="color: #D7D7BF;">EUMELANIN</strong> (brown-black)</li>
              <li><strong style="color: #FF4B4B;">TRICHOSIDERIN</strong> (red)</li>
              <li><strong style="color: #814D00;">PHEOMELANIN</strong> (yellow)</li>
            </ul>
            <p class="mt-4">
              Contributing pigment, also known as undertone, is the varying degrees of warmth exposed during a permanent colour or lightening process.
            </p>
          `,
        },
        {
          text: 'The Level System',
          content:
            'Level is the unit of measurement used to identify the lightness or darkness of a color. Levels are arranged on a scale of 1 to 10, with 1 being the darkest and 10 the lightest. It answers the question: How much color? The system helps colorists determine the depth of each level, although names may vary among manufacturers.',
        },
        {
          text: 'Natural Levels of Hair',
          content:
            'Natural hair levels refer to the inherent lightness or darkness of hair without any artificial color. Understanding natural levels helps in selecting the right hair color formulas.',
        },
        {
          text: 'Shade System',
          content:
            'The shade system categorizes colors based on their tones and hues. It helps in selecting complementary colors and achieving the desired hair color outcome.',
        },
        {
          text: 'Categories of Colour',
          content:
            'Hair colors are divided into categories such as natural, fashion, and corrective colors. Understanding these categories helps in addressing specific client needs.',
        },
        {
          text: 'Identifying Natural Level',
          content: `<p>To identify natural level:</p>
            <ol>
                <li>Take a ½-inch square section in the crown area and hold it up from the scalp.</li>
                <li>Use natural level-finder swatches provided by manufacturers to match the hair.</li>
                <li>Move the swatch along the strand to ensure accuracy.</li>
                <li>Determine the depth of the natural-hair color level.</li>
            </ol>`,
        },
        {
          text: 'Grey Hair',
          content:
            'Grey hair lacks natural pigment and requires special consideration when coloring. It may be more resistant to color absorption and may need pre-pigmentation or specific formulations.',
        },
        {
          text: 'Roots, Length, and Points',
          content:
            'Hair presents different structural characteristics at roots, lengths, and points. <strong>ROOTS:</strong> Not fully keratinized, easy absorption, dyeing influenced by body heat. <strong>LENGTH:</strong> Fully keratinized, uniform color, less influenced by body heat. <strong>POINTS:</strong> More porous, higher absorption, potential for uneven color.',
        },
        {
          text: 'Exercise',
          content:
            'Practical exercises to apply the knowledge of the level system and hair structure in real-life scenarios.',
        },
      ],
    },
  ];

  // Calculate progress percentage using formula
  const calculateProgress = () => {
    let totalClickableItems = 0;
    let completedClickableItems = 0;

    const countClickableItems = (items: ModuleItem[]) => {
      items.forEach((item) => {
        if (item.content) {
          totalClickableItems++;
          if (completedModules[item.text]) {
            completedClickableItems++;
          }
        }
        if (item.subItems) {
          countClickableItems(item.subItems);
        }
      });
    };

    modules.forEach((module) => {
      countClickableItems(module.items);
    });

    return totalClickableItems === 0
      ? 0
      : Math.round((completedClickableItems / totalClickableItems) * 100);
  };

  const renderModuleItems = (items: ModuleItem[], depth: number = 0) => {
    return (
      <ul className={`space-y-2 ${depth > 0 ? 'ml-6' : ''}`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex-1">
              {item.isCategory ? (
                <div className="text-gray-700 font-semibold">{item.text}</div>
              ) : (
                <button
                  onClick={() => handleContentClick(item.content, item.text)}
                  className="text-left hover:text-pink-600 cursor-pointer"
                >
                  {item.text}
                </button>
              )}
              {item.subItems && renderModuleItems(item.subItems, depth + 1)}
            </div>
            {!item.isCategory && !item.subItems && (
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
    <ProtectedRoute>
      {isLoading && (
        <div className="fixed inset-0 bg-pink-600/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        </div>
      )}
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-pink-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                  Home
                </Link>
                <span className="block text-white bg-white/15 px-3 py-2 w-full text-left">
                  Beginner
                </span>
                <Link href="/intermediate" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                  Intermediate
                </Link>
                <Link href="/expert" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                  Expert
                </Link>
                <Link href="/contact" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                  Contact
                </Link>
              </div>
            </div>
          )}
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
              <Link href="/beginner-chapter2-overview" className="text-pink-600 hover:text-pink-700">
                Chapter 2
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-8">
            {/* Left Sidebar - Table of Contents */}
            <div className="w-1/4 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Table of Contents</h2>
              
              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Chapter Progress</span>
                  <button
                    onClick={() => {
                      setCompletedModules({});
                      localStorage.removeItem('completedModulesChapter2');
                    }}
                    className="text-sm text-pink-600 hover:text-pink-700"
                  >
                    Reset
                  </button>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 mt-1">
                  {calculateProgress()}% Complete
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.title}>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      {module.title} {sectionIcons[module.title]}
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      {renderModuleItems(module.items)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content Area */}
            <div className="w-3/4 bg-white rounded-xl shadow-lg p-8">
              {selectedContent && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">{selectedTitle}</h2>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedContent }}
                  />
                  
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
                        const currentModule = modules.find(m =>
                          m.items.some(i => i.text === selectedTitle)
                        );
                        if (currentModule) {
                          const currentIndex = currentModule.items.findIndex(
                            i => i.text === selectedTitle
                          );
                          if (currentIndex < currentModule.items.length - 1) {
                            handleContentClick(currentModule.items[currentIndex + 1].content, currentModule.items[currentIndex + 1].text);
                          } else {
                            const nextModuleIndex = modules.findIndex(m => m === currentModule) + 1;
                            if (nextModuleIndex < modules.length) {
                              handleContentClick(modules[nextModuleIndex].items[0].content, modules[nextModuleIndex].items[0].text);
                            }
                          }
                        }
                      }}
                      className="text-pink-600 hover:text-pink-700 flex items-center"
                      disabled={!selectedTitle}
                    >
                      Next Topic
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              )}
              {!selectedContent && (
                <div className="text-center text-gray-500">
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
