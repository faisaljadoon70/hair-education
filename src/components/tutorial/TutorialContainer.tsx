'use client';

import React, { useState } from 'react';
import { useTutorial } from '@/context/TutorialContext';
import { Container } from '../responsive/Container';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  id: string;
  title: string;
  type: 'theory' | 'practice' | 'quiz';
  content: React.ReactNode;
}

interface TutorialContainerProps {
  chapterId: string;
  steps: TutorialStep[];
  onComplete?: () => void;
}

export function TutorialContainer({ chapterId, steps, onComplete }: TutorialContainerProps) {
  const { progress, updateProgress } = useTutorial();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const handleNext = async () => {
    if (currentStepIndex < steps.length - 1) {
      // Update progress before moving to next step
      await updateProgress({
        ...progress,
        currentStep: steps[currentStepIndex + 1].id,
        completedSteps: [...progress.completedSteps, currentStep.id],
      });
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Chapter completed
      await updateProgress({
        ...progress,
        completedSteps: [...progress.completedSteps, currentStep.id],
      });
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <Container>
      {({ isMobile }) => (
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className="flex space-x-1">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-2 w-8 rounded ${
                    index <= currentStepIndex ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">{currentStep.title}</h2>
              <div className="prose max-w-none">{currentStep.content}</div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-between'} mt-6`}>
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded ${
                currentStepIndex === 0
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {currentStepIndex === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
