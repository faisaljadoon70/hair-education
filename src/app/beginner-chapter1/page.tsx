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
    title: 'Hair and Scalp',
    items: [
      { 
        text: 'What is Hair?', 
        content: `Alright, let's really unravel the complexities of what we call 'hair.' It's far more than just a decorative element; it's a sophisticated biological structure with a compelling story to tell at a cellular level. At its very essence, hair is a slender filament that originates from a follicle - a tiny, specialized invagination of the epidermis, nestled deep within the dermis of our scalp. These follicles are essentially miniature factories, constantly producing and pushing out strands of keratin. And that is where life of hair begins.

The Role of Keratin

Now, the star of the show here is keratin - a remarkably robust and insoluble protein. This fibrous protein, made up of long chains of amino acids, isn't limited to hair; it's also the primary structural component of our nails and the outer layers of our skin, emphasizing its resilience. What's crucial to understand is that the visible hair shaft, the part that we manipulate and style, is biologically inert - a collection of dead keratinized cells. The living, dynamic processes are confined to the base of the follicle, specifically within the dermal papilla, where cell division and keratin synthesis are constantly underway. This is also where the hair's color is determined by the melanocytes.

Physiological Functions

Beyond its aesthetic significance, hair has pivotal physiological roles. It's a natural defense mechanism, offering significant protection against harmful ultraviolet radiation from the sun. It acts as a thermal regulator, trapping air close to the scalp, assisting with heat retention and cooling, depending on environmental temperatures. And let's not underestimate its tactile importance; hair plays a role in enhancing our sensitivity to touch. Think of the way you perceive the slightest breeze on your arm hairs.` 
      },
      { text: 'Division of Hair', content: 'Content about hair division...' },
      { text: 'The Hair Root', content: 'Content about hair root...' },
      { text: 'The Hair Shaft', content: 'Content about hair shaft...' },
    ],
  },
  {
    title: 'Hair Structure',
    items: [
      { text: 'Cuticle', content: 'Content about cuticle...' },
      { text: 'Cortex', content: 'Content about cortex...' },
      { text: 'Medulla', content: 'Content about medulla...' },
    ],
  },
  {
    title: 'Natural Hair Color',
    items: [
      { text: 'Eumelanin', content: 'Content about eumelanin...' },
      { text: 'Trichosiderin', content: 'Content about trichosiderin...' },
      { text: 'Pheomelanin', content: 'Content about pheomelanin...' },
    ],
  },
  {
    title: 'Chemical Structure of Hair',
    items: [
      { text: 'The Building Blocks of Proteins', content: 'Content about protein building blocks...' },
      { text: 'Peptide Bonds', content: 'Content about peptide bonds...' },
      { text: 'Disulphide Bonds', content: 'Content about disulphide bonds...' },
      { text: 'Hydrogen Bonds', content: 'Content about hydrogen bonds...' },
      { text: 'Salt Bonds', content: 'Content about salt bonds...' },
      { text: 'Sugar Bonds', content: 'Content about sugar bonds...' },
      { text: 'How Bonds Form Hair?', content: 'Content about how bonds form hair...' },
    ],
  },
  {
    title: 'Hair Growth Cycle',
    items: [
      { text: 'Anagen', content: 'Content about anagen phase...' },
      { text: 'Catagen', content: 'Content about catagen phase...' },
      { text: 'Telogen', content: 'Content about telogen phase...' },
    ],
  },
  {
    title: 'Exercise',
    items: [
      { text: 'Practice Questions', content: 'Interactive practice questions...' },
    ],
  },
];

export default function BeginnerChapter1Page() {
  const [selectedItem, setSelectedItem] = useState<ModuleItem | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Load progress when component mounts
  useEffect(() => {
    const savedProgress = localStorage.getItem('chapter1Progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem('chapter1Progress', JSON.stringify(progress));
      
      // Check if all items are completed
      const totalItems = modules.reduce((sum, module) => sum + module.items.length, 0);
      const completedItems = Object.values(progress).filter(Boolean).length;
      
      // If all items are completed, update completedBeginnerChapters
      if (completedItems === totalItems) {
        const savedBeginnerProgress = localStorage.getItem('completedBeginnerChapters');
        const beginnerProgress = savedBeginnerProgress ? JSON.parse(savedBeginnerProgress) : {};
        beginnerProgress['Chapter 1'] = true;
        localStorage.setItem('completedBeginnerChapters', JSON.stringify(beginnerProgress));
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
    localStorage.removeItem('chapter1Progress');
    
    // Also update completedBeginnerChapters
    const savedBeginnerProgress = localStorage.getItem('completedBeginnerChapters');
    if (savedBeginnerProgress) {
      const beginnerProgress = JSON.parse(savedBeginnerProgress);
      delete beginnerProgress['Chapter 1'];
      localStorage.setItem('completedBeginnerChapters', JSON.stringify(beginnerProgress));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span>/</span>
          <Link href="/beginner" className="hover:text-pink-600">Beginner</Link>
          <span>/</span>
          <span className="text-gray-900">Chapter 1</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                        progress[item.text] ? 'text-pink-600 bg-pink-50 rounded-md pl-2' : ''
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-center">
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

          <div className="md:col-span-2">
            {selectedItem ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedItem.text}</h2>
                <div className="prose max-w-none">
                  {selectedItem.content}
                </div>
                {selectedItem.text === "What is Hair?" && (
                  <div className="mt-8 bg-pink-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-pink-600">Professional Insight</h3>
                    <p>
                      Understanding the intricacies of hair structure and its growth cycle is fundamental to our craft. It allows us to provide the most effective and personalized care for our clients. It guides our selection of products, our application of treatments, and our techniques for styling and coloring. In essence, we're engaging with a marvel of biological engineering, and appreciating its complexity is the first step toward becoming true masters of hair.
                    </p>
                  </div>
                )}
                
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
                        m.items.some(i => i.text === selectedItem.text)
                      );
                      if (currentModule) {
                        const currentIndex = currentModule.items.findIndex(
                          i => i.text === selectedItem.text
                        );
                        if (currentIndex < currentModule.items.length - 1) {
                          handleItemClick(currentModule.items[currentIndex + 1]);
                        } else {
                          const nextModuleIndex = modules.findIndex(m => m === currentModule) + 1;
                          if (nextModuleIndex < modules.length) {
                            handleItemClick(modules[nextModuleIndex].items[0]);
                          }
                        }
                      }
                    }}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                    disabled={!selectedItem}
                  >
                    Next Topic
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center text-gray-500">
                Select a topic from the table of contents to begin learning.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}