'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface ModuleItem {
  text: string;
  content: string;
  subItems?: ModuleItem[];
}

export default function IntermediatePage() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<{
    [key: string]: boolean;
  }>({});

  // Load completed modules from localStorage
  useEffect(() => {
    const savedModules = localStorage.getItem('completedModulesIntermediate');
    if (savedModules) {
      setCompletedModules(JSON.parse(savedModules));
    }
  }, []);

  // Save completed modules to localStorage
  useEffect(() => {
    if (Object.keys(completedModules).length > 0) {
      localStorage.setItem(
        'completedModulesIntermediate',
        JSON.stringify(completedModules)
      );
    }
  }, [completedModules]);

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

    return {
      percentage: Math.round((completedWeight / totalWeight) * 100) || 0
    };
  };

  const modules = [
    {
      title: 'Porosity Analysis',
      items: [
        {
          text: 'Low Porosity',
          content: 'Tightly closed cuticles, resists color',
        },
        {
          text: 'Medium Porosity',
          content: 'Ideal for coloring, even absorption',
        },
        {
          text: 'High Porosity',
          content: 'Quick absorption, needs pre-treatment',
        }
      ]
    },
    {
      title: 'Hair Strand Structure',
      items: [
        {
          text: 'Cuticle',
          content: 'Outer protective layer',
        },
        {
          text: 'Cortex',
          content: 'Middle layer with pigment',
        },
        {
          text: 'Medulla',
          content: 'Innermost core',
        }
      ]
    },
    {
      title: 'Hair Growth Cycles',
      items: [
        {
          text: 'Anagen',
          content: 'Active growth, 2-7 years',
        },
        {
          text: 'Catagen',
          content: 'Transition phase, 2-3 weeks',
        },
        {
          text: 'Telogen',
          content: 'Resting phase, 3 months',
        },
        {
          text: 'Exogen',
          content: 'Shedding phase',
        }
      ]
    }
  ];

  const handleContentClick = (content: string, module: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedContent(content);
    setCompletedModules((prev) => ({ ...prev, [module]: true }));
  };

  const renderModuleItems = (items: ModuleItem[]) => {
    return items.map((item) => (
      <div key={item.text}>
        <div
          className="flex items-center justify-between cursor-pointer py-1 hover:bg-pink-50 rounded px-2"
          onClick={() => handleContentClick(item.content, item.text)}
        >
          <span className="font-medium text-gray-800">{item.text}</span>
          <span>
            {!item.subItems && (completedModules[item.text] ? '✔' : '○')}
          </span>
        </div>
        {item.subItems && (
          <div className="ml-4">
            {renderModuleItems(item.subItems)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="bg-pink-600 text-white p-4 flex items-center justify-between">
          <a href="/" className="text-white text-lg font-semibold hover:underline">
            Home
          </a>
          <button className="bg-pink-700 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </div>

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
                    <span className="text-sm text-gray-600">Course Progress</span>
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
            </div>
          )}

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
                    <span className="text-sm text-gray-600">Course Progress</span>
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
                <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                  {selectedContent}
                </h2>
                <p className="text-gray-600">
                  {selectedContent}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
