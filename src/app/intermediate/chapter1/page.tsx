'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase-client';

interface ModuleItem {
  text: string;
  content: string;
  completed?: boolean;
}

const modules: { title: string; items: ModuleItem[] }[] = [
  {
    title: 'Hair Analysis Fundamentals',
    items: [
      { 
        text: 'Understanding Porosity', 
        content: `Hair porosity is a critical factor in determining how hair interacts with products and chemical treatments. Let's dive deep into the science of porosity analysis.

The Science of Porosity

Porosity refers to the hair's ability to absorb and retain moisture. This characteristic is determined by the condition of the cuticle layer - the outermost layer of the hair shaft. The cuticle consists of overlapping scales that can be either tightly bound or lifted, affecting how substances enter and exit the hair shaft.

Three Levels of Porosity:
1. Low Porosity: Cuticles are tightly bound, making it difficult for moisture to penetrate
2. Normal Porosity: Cuticles have healthy spacing, allowing proper moisture balance
3. High Porosity: Cuticles are lifted or damaged, leading to rapid moisture absorption and loss

Professional Assessment Methods:
- Float Test: Observing how hair behaves in water
- Slide Test: Feeling the texture between fingers
- Visual Microscopic Analysis: Examining cuticle patterns
- Elasticity Test: Measuring stretch and recovery` 
      },
      { text: 'Advanced Structure Analysis', content: 'Content about advanced hair structure...' },
      { text: 'Growth Cycle Assessment', content: 'Content about growth cycle assessment...' },
      { text: 'Professional Diagnostic Tools', content: 'Content about diagnostic tools...' },
    ],
  },
  {
    title: 'Chemical Composition',
    items: [
      { text: 'Protein Analysis', content: 'Content about protein analysis...' },
      { text: 'Lipid Content', content: 'Content about lipid content...' },
      { text: 'Mineral Composition', content: 'Content about mineral composition...' },
    ],
  },
  {
    title: 'Environmental Factors',
    items: [
      { text: 'UV Damage Assessment', content: 'Content about UV damage...' },
      { text: 'Chemical Processing Impact', content: 'Content about chemical processing...' },
      { text: 'Environmental Stress', content: 'Content about environmental stress...' },
    ],
  },
  {
    title: 'Professional Assessment',
    items: [
      { text: 'Client Consultation', content: 'Content about client consultation...' },
      { text: 'Documentation Methods', content: 'Content about documentation...' },
      { text: 'Treatment Planning', content: 'Content about treatment planning...' },
    ],
  },
  {
    title: 'Case Studies',
    items: [
      { text: 'Common Scenarios', content: 'Content about common scenarios...' },
      { text: 'Problem Solving', content: 'Content about problem solving...' },
      { text: 'Treatment Results', content: 'Content about treatment results...' },
    ],
  },
  {
    title: 'Assessment',
    items: [
      { text: 'Practice Questions', content: 'Interactive assessment questions...' },
    ],
  },
];

export default function IntermediateChapter1Page() {
  const [selectedItem, setSelectedItem] = useState<ModuleItem | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('intermediateChapter1Progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage and update completedIntermediateChapters
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      // Save chapter specific progress
      localStorage.setItem('intermediateChapter1Progress', JSON.stringify(progress));
      
      // Check if all items are completed
      const totalItems = modules.reduce((sum, module) => sum + module.items.length, 0);
      const completedItems = Object.values(progress).filter(Boolean).length;
      
      // If all items are completed, update completedIntermediateChapters
      if (completedItems === totalItems) {
        const savedProgress = localStorage.getItem('completedIntermediateChapters');
        const intermediateProgress = savedProgress ? JSON.parse(savedProgress) : {};
        intermediateProgress['Chapter 1'] = true;
        localStorage.setItem('completedIntermediateChapters', JSON.stringify(intermediateProgress));
      }
    }
  }, [progress]);

  const calculateProgress = () => {
    const totalItems = modules.reduce((sum, module) => sum + module.items.length, 0);
    const completedItems = Object.values(progress).filter(Boolean).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const handleItemClick = (item: ModuleItem) => {
    setSelectedItem(item);
    setProgress(prev => ({ ...prev, [item.text]: true }));
  };

  const handleReset = () => {
    setProgress({});
    setSelectedItem(null);
    
    // Clear chapter specific progress
    localStorage.removeItem('intermediateChapter1Progress');
    
    // Update completedIntermediateChapters
    const savedProgress = localStorage.getItem('completedIntermediateChapters');
    if (savedProgress) {
      const intermediateProgress = JSON.parse(savedProgress);
      delete intermediateProgress['Chapter 1'];
      localStorage.setItem('completedIntermediateChapters', JSON.stringify(intermediateProgress));
    }
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
            <span className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md">
              Intermediate
            </span>
            <Link href="/expert" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Expert
            </Link>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span>/</span>
          <Link href="/intermediate" className="hover:text-pink-600">Intermediate</Link>
          <span>/</span>
          <span className="text-gray-900">Chapter 1</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar with table of contents */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
            
            <div className="mb-8">
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
                <h3 className="text-base font-bold mb-3">{module.title}</h3>
                <ul className="space-y-2">
                  {module.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`cursor-pointer text-sm hover:text-pink-600 ${
                        progress[item.text] ? 'text-pink-600 bg-pink-50 rounded-md pl-2' : ''
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-center py-1">
                        <span>{item.text}</span>
                        {progress[item.text] && (
                          <span className="ml-2">✓</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Main content area */}
          <div className="md:col-span-2">
            {selectedItem ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">{selectedItem.text}</h2>
                <div className="prose max-w-none">
                  {selectedItem.content}
                </div>
                <div className="mt-8 flex justify-between items-center pt-4 border-t">
                  <Link href="/intermediate" className="text-pink-600 hover:text-pink-700">
                    ← Back to Chapters
                  </Link>
                  <button
                    onClick={() => {
                      const currentModule = modules.find(m => m.items.some(i => i.text === selectedItem.text));
                      if (!currentModule) return;
                      
                      const currentIndex = currentModule.items.findIndex(i => i.text === selectedItem.text);
                      const nextItem = currentModule.items[currentIndex + 1];
                      
                      if (nextItem) {
                        handleItemClick(nextItem);
                      } else {
                        // Try to find next module's first item
                        const currentModuleIndex = modules.findIndex(m => m.title === currentModule.title);
                        const nextModule = modules[currentModuleIndex + 1];
                        if (nextModule && nextModule.items.length > 0) {
                          handleItemClick(nextModule.items[0]);
                        }
                      }
                    }}
                    className="text-pink-600 hover:text-pink-700"
                  >
                    Next Topic →
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <p>Select a topic from the table of contents to begin learning.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
