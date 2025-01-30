'use client';

import { useState } from 'react';
import HomeButton from '@/components/HomeButton';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface DropdownItemProps {
  text: string;
  preview?: string;
  content?: string;
}

function Modal({
  isOpen,
  onClose,
  content,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-gray-600 whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
}

function DropdownItem({
  text,
  preview,
  content,
  onClick,
}: DropdownItemProps & { onClick: () => void }) {
  return (
    <div
      className="flex items-center justify-between cursor-pointer py-1 hover:bg-purple-50 rounded px-2 -ml-2"
      onClick={onClick}
    >
      <span className="font-medium text-gray-800">{text}</span>
    </div>
  );
}

export default function IntermediatePage() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const handleContentClick = (content: string) => {
    setSelectedContent(content);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
        <HomeButton />
        <div className={`max-w-6xl mx-auto ${selectedContent ? 'flex' : ''}`}>
          {/* Table of Contents */}
          <div
            className={`${
              selectedContent ? 'w-1/4' : 'w-full'
            } bg-white rounded-lg shadow-md p-6 ${
              selectedContent ? 'mr-6' : ''
            }`}
          >
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">
              Table of Contents
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Porosity Analysis
                </h3>
                <div className="space-y-2 text-gray-700 ml-4">
                  <DropdownItem
                    text="Low Porosity: Tightly closed cuticles, resists color"
                    onClick={() => handleContentClick('Low Porosity Content')}
                  />
                  <DropdownItem
                    text="Medium Porosity: Ideal for coloring, even absorption"
                    onClick={() =>
                      handleContentClick('Medium Porosity Content')
                    }
                  />
                  <DropdownItem
                    text="High Porosity: Quick absorption, needs pre-treatment"
                    onClick={() => handleContentClick('High Porosity Content')}
                  />
                </div>
              </div>

              {/* Hair Strand Structure */}
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Hair Strand Structure
                </h3>
                <div className="space-y-2 text-gray-700 ml-4">
                  <DropdownItem
                    text="Cuticle: Outer protective layer"
                    onClick={() => handleContentClick('Cuticle Content')}
                  />
                  <DropdownItem
                    text="Cortex: Middle layer with pigment"
                    onClick={() => handleContentClick('Cortex Content')}
                  />
                  <DropdownItem
                    text="Medulla: Innermost core"
                    onClick={() => handleContentClick('Medulla Content')}
                  />
                </div>
              </div>

              {/* Hair Growth Cycles */}
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Hair Growth Cycles
                </h3>
                <div className="space-y-2 text-gray-700 ml-4">
                  <DropdownItem
                    text="Anagen: Active growth, 2-7 years"
                    onClick={() => handleContentClick('Anagen Content')}
                  />
                  <DropdownItem
                    text="Catagen: Transition phase, 2-3 weeks"
                    onClick={() => handleContentClick('Catagen Content')}
                  />
                  <DropdownItem
                    text="Telogen: Resting phase, 3 months"
                    onClick={() => handleContentClick('Telogen Content')}
                  />
                  <DropdownItem
                    text="Exogen: Shedding phase"
                    onClick={() => handleContentClick('Exogen Content')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Display */}
          {selectedContent && (
            <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-purple-600 mb-4">
                {selectedContent}
              </h2>
              <p className="text-gray-600">
                Detailed content for {selectedContent}.
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
