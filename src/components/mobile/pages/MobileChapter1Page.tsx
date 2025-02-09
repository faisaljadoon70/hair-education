'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase-client';
import MobileHeader from '../navigation/MobileHeader';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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

Now, the star of the show here is keratin - a remarkably robust and insoluble protein. This fibrous protein, made up of long chains of amino acids, isn't limited to hair; it's also the primary structural component of our nails and the outer layers of our skin, emphasizing its resilience. What's crucial to understand is that the visible hair shaft, the part that we manipulate and style, is biologically inert - a collection of dead keratinized cells. The living, dynamic processes are confined to the follicle itself.

Professional Insight

Understanding the intricacies of hair structure and its growth cycle is fundamental to our craft. It allows us to provide more effective and personalized care for our clients. It guides our selection of products, our application of treatments, and our techniques for styling and coloring. In essence, we're engaging with a marvel of biological engineering, and appreciating its complexity is the first step toward becoming true masters of hair.`
      },
      { text: 'Division of Hair', content: 'Content for Division of Hair...' },
      { text: 'The Hair Root', content: 'Content for The Hair Root...' },
      { text: 'The Hair Shaft', content: 'Content for The Hair Shaft...' }
    ]
  },
  {
    title: 'Hair Structure',
    items: [
      { text: 'Cuticle', content: 'Content for Cuticle...' },
      { text: 'Cortex', content: 'Content for Cortex...' },
      { text: 'Medulla', content: 'Content for Medulla...' }
    ]
  },
  {
    title: 'Natural Hair Color',
    items: [
      { text: 'Eumelanin', content: 'Content for Eumelanin...' },
      { text: 'Trichosiderin', content: 'Content for Trichosiderin...' },
      { text: 'Pheomelanin', content: 'Content for Pheomelanin...' }
    ]
  },
  {
    title: 'Chemical Structure of Hair',
    items: [
      { text: 'The Building Blocks of Proteins', content: 'Content for Building Blocks...' },
      { text: 'Peptide Bonds', content: 'Content for Peptide Bonds...' },
      { text: 'Disulphide Bonds', content: 'Content for Disulphide Bonds...' },
      { text: 'Hydrogen Bonds', content: 'Content for Hydrogen Bonds...' },
      { text: 'Salt Bonds', content: 'Content for Salt Bonds...' },
      { text: 'Sugar Bonds', content: 'Content for Sugar Bonds...' },
      { text: 'How Bonds Form Hair?', content: 'Content for How Bonds Form Hair...' }
    ]
  },
  {
    title: 'Hair Growth Cycle',
    items: [
      { text: 'Anagen', content: 'Content for Anagen...' },
      { text: 'Catagen', content: 'Content for Catagen...' },
      { text: 'Telogen', content: 'Content for Telogen...' }
    ]
  },
  {
    title: 'Exercise',
    items: [
      { text: 'Practice Questions', content: 'Practice questions will be displayed here...' }
    ]
  }
];

export default function MobileChapter1Page() {
  const [progress, setProgress] = useState(0);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [viewedTopics, setViewedTopics] = useState<Set<string>>(new Set());

  // Calculate total number of topics
  const totalTopics = modules.reduce((sum, module) => sum + module.items.length, 0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        // Load from localStorage first
        const savedTopics = localStorage.getItem('beginner-chapter1-viewed-topics');
        if (savedTopics) {
          const topics = new Set(JSON.parse(savedTopics));
          setViewedTopics(topics);
          setProgress(Math.round((topics.size / totalTopics) * 100));
        }

        // Then try to load from Supabase
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('user_progress')
            .select('progress, viewed_topics')
            .eq('user_id', user.id)
            .eq('chapter', 'beginner-1')
            .single();
          
          if (data?.viewed_topics) {
            const topics = new Set(data.viewed_topics);
            setViewedTopics(topics);
            setProgress(Math.round((topics.size / totalTopics) * 100));
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, [totalTopics]);

  const updateProgress = async (topic: string) => {
    const newViewedTopics = new Set(viewedTopics);
    newViewedTopics.add(topic);
    setViewedTopics(newViewedTopics);

    const newProgress = Math.round((newViewedTopics.size / totalTopics) * 100);
    setProgress(newProgress);

    // Save to localStorage
    localStorage.setItem('beginner-chapter1-viewed-topics', JSON.stringify([...newViewedTopics]));

    // Save to Supabase if user is logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            chapter: 'beginner-1',
            progress: newProgress,
            viewed_topics: [...newViewedTopics],
            updated_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleTopicOpen = (topic: string) => {
    if (!viewedTopics.has(topic)) {
      updateProgress(topic);
    }
    setOpenTopic(openTopic === topic ? null : topic);
  };

  const handleNextTopic = (currentSection: string, currentTopic: string) => {
    const next = findNextTopic(currentSection, currentTopic);
    if (next) {
      handleTopicOpen(next.topic);
    }
  };

  const handleReset = async () => {
    setViewedTopics(new Set());
    setProgress(0);
    localStorage.removeItem('beginner-chapter1-viewed-topics');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            chapter: 'beginner-1',
            progress: 0,
            viewed_topics: [],
            updated_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  const findNextTopic = (currentSection: string, currentTopic: string) => {
    let foundCurrent = false;
    for (const module of modules) {
      for (const item of module.items) {
        if (foundCurrent) {
          return { section: module.title, topic: item.text };
        }
        if (module.title === currentSection && item.text === currentTopic) {
          foundCurrent = true;
        }
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader isHomePage={false} />
      
      <main className="pt-12 px-4 pb-20">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-sm font-medium text-gray-900">Chapter Progress</h2>
            <button 
              className="text-pink-500 text-xs font-medium"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-pink-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-3">
          {modules.map((module) => (
            <div key={module.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Static Main Heading */}
              <div className="px-3 py-2 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">{module.title}</h3>
              </div>

              {/* Subtopics */}
              <div className="divide-y divide-gray-50">
                {module.items.map((item) => (
                  <div key={item.text}>
                    <button
                      onClick={() => handleTopicOpen(item.text)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className={`text-xs ${viewedTopics.has(item.text) ? 'text-pink-500' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                      {openTopic === item.text ? (
                        <ChevronUpIcon className="w-3 h-3 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="w-3 h-3 text-gray-400" />
                      )}
                    </button>

                    {openTopic === item.text && (
                      <div className="px-3 py-2 bg-gray-50">
                        <div className="prose prose-sm prose-pink max-w-none text-xs leading-relaxed">
                          <div className="text-gray-600 space-y-2">
                            {item.content}
                          </div>
                        </div>
                        
                        {/* Next Topic Link */}
                        {findNextTopic(module.title, item.text) && (
                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => handleNextTopic(module.title, item.text)}
                              className="text-pink-500 text-xs font-medium hover:text-pink-600"
                            >
                              Next Topic
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
