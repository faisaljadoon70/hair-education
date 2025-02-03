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

export default function BeginnerChapter2Page() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
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

  const calculateProgress = () => {
    let totalWeight = 0;
    let completedWeight = 0;

    const calculateItemWeight = (items: ModuleItem[], depth: number = 0) => {
      const weightMultiplier = Math.pow(0.8, depth);
      items.forEach((item) => {
        totalWeight += weightMultiplier;
        if (completedModules[item.text]) {
          completedWeight += weightMultiplier;
        }
        if (item.subItems) {
          calculateItemWeight(item.subItems, depth + 1);
        }
      });
    };

    modules.forEach((module) => calculateItemWeight(module.items));
    const percentage = Math.round((completedWeight / totalWeight) * 100) || 0;

    if (percentage === 100) {
      const beginnerProgress = JSON.parse(
        localStorage.getItem('completedBeginnerChapters') || '{}'
      );
      if (!beginnerProgress.chapter2) {
        beginnerProgress.chapter2 = true;
        localStorage.setItem(
          'completedBeginnerChapters',
          JSON.stringify(beginnerProgress)
        );
      }
    }
    return { percentage };
  };

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
        <span>Chapter 2</span>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main content layout */}
        <div className="max-w-[95%] mx-auto p-8">
          {!selectedContent && (
            <div className="flex justify-center items-center">
              <div className="w-2/3 bg-white rounded-lg shadow-md px-4 py-6">
                <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                  Table of Contents
                </h2>
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Chapter Progress
                    </span>
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
          {selectedContent && (
            <div className="flex gap-6">
              {/* Sidebar */}
              <div className="w-1/5 bg-white rounded-lg shadow-md pl-4 pr-2 py-6">
                <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                  Table of Contents
                </h2>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Chapter Progress
                    </span>
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
                  <div className="flex-grow">
                    <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center">
                      {selectedTitle}
                    </h2>
                    <div>
                      {typeof selectedContent === 'string' ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: selectedContent }}
                        />
                      ) : (
                        selectedContent
                      )}
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
