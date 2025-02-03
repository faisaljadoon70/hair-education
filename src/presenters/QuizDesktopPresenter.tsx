'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function QuizDesktopPresenter({
  data,
  userAnswers,
  score,
  isLoading,
  error,
  onAnswer,
  onSubmit
}: QuizPresenterProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded max-w-4xl mx-auto">
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
        className="max-w-4xl mx-auto px-6 py-8 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
          <div className="inline-block p-8 rounded-full bg-gray-50">
            <div className="text-6xl font-bold mb-2">{Math.round(score)}%</div>
            <p className="text-gray-600">
              {score >= data.passingScore ? 'Congratulations! You passed!' : 'Keep practicing and try again!'}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {data.questions.map((question: any, index: number) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${
                userAnswers[index] === question.correctAnswer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-start gap-6">
                {question.image && (
                  <div className="w-1/3">
                    <ResponsiveImage
                      src={question.image}
                      alt="Question illustration"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-lg mb-4">{question.question}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">
                      <span className="font-medium">Your answer: </span>
                      {question.options[userAnswers[index]]}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Correct answer: </span>
                      {question.options[question.correctAnswer]}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 bg-white bg-opacity-50 p-4 rounded">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-8 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Questions Section */}
        <div className="col-span-8">
          <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700">{data.description}</p>
          </div>

          <div className="space-y-8">
            {data.questions.map((question: any, questionIndex: number) => (
              <div key={questionIndex} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">
                      {questionIndex + 1}. {question.question}
                    </h3>

                    {question.image && (
                      <div className="mb-6">
                        <ResponsiveImage
                          src={question.image}
                          alt="Question illustration"
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      {question.options.map((option: string, optionIndex: number) => (
                        <button
                          key={optionIndex}
                          onClick={() => onAnswer(questionIndex, optionIndex)}
                          className={`w-full p-4 text-left rounded-lg transition-colors ${
                            userAnswers[questionIndex] === optionIndex
                              ? 'bg-blue-500 text-white'
                              : 'bg-white hover:bg-gray-100'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="col-span-4">
          <div className="sticky top-6 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Quiz Progress</h3>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Questions Answered</span>
                <span>{userAnswers.filter(a => a !== undefined).length} of {data.questions.length}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(userAnswers.filter(a => a !== undefined).length / data.questions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {data.questions.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    userAnswers[index] !== undefined
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  Question {index + 1}
                </div>
              ))}
            </div>

            <button
              onClick={onSubmit}
              className="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              disabled={userAnswers.length !== data.questions.length}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
