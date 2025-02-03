'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeGesture } from '@/utils/gestureHandling';
import { ResponsiveImage } from '@/components/responsive/ResponsiveImage';

interface QuizPresenterProps {
  data: any;
  userAnswers: number[];
  score: number | null;
  isLoading: boolean;
  error: Error | null;
  onAnswer: (questionIndex: number, answerIndex: number) => void;
  onSubmit: () => void;
}

export default function QuizMobilePresenter({
  data,
  userAnswers,
  score,
  isLoading,
  error,
  onAnswer,
  onSubmit
}: QuizPresenterProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const swipeGesture = useSwipeGesture({
    onSwipeLeft: () => {
      if (currentQuestion < (data?.questions?.length || 0) - 1) {
        setCurrentQuestion(prev => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  if (score !== null) {
    return (
      <motion.div
        className="px-4 py-6 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2">{Math.round(score)}%</div>
          <p className="text-gray-600">
            {score >= data.passingScore ? 'Congratulations! You passed!' : 'Keep practicing and try again!'}
          </p>
        </div>

        <div className="space-y-6">
          {data.questions.map((question: any, index: number) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                userAnswers[index] === question.correctAnswer
                  ? 'bg-green-50'
                  : 'bg-red-50'
              }`}
            >
              <p className="font-medium mb-2">{question.question}</p>
              <p className="text-sm">
                Your answer: {question.options[userAnswers[index]]}
              </p>
              <p className="text-sm">
                Correct answer: {question.options[question.correctAnswer]}
              </p>
              <p className="text-sm mt-2 text-gray-600">
                {question.explanation}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  const question = data.questions[currentQuestion];

  return (
    <motion.div
      {...swipeGesture()}
      className="px-4 py-6 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {data.questions.length}
        </div>
        <div className="h-2 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / data.questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold">{question.question}</h2>

          {question.image && (
            <div className="mb-4">
              <ResponsiveImage
                src={question.image}
                alt="Question illustration"
                className="rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="space-y-3">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => onAnswer(currentQuestion, index)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  userAnswers[currentQuestion] === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestion < data.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
              disabled={userAnswers.length !== data.questions.length}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Swipe left/right to navigate between questions
      </div>
    </motion.div>
  );
}
