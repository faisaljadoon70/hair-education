import React from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { BookOpenIcon, BeakerIcon, AcademicCapIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface Theory {
  title: string;
  content: string;
  key_points: string[];
}

interface ChemicalProcess {
  process_name: string;
  description: string;
  steps: string[];
  precautions: string[];
}

interface Terminology {
  term: string;
  definition: string;
  category: string;
}

interface Quiz {
  question: string;
  options: string[];
  correct_answer: string;
}

interface LevelEducationProps {
  levelId: number;
  theory: Theory | null;
  chemicalProcess: ChemicalProcess | null;
  terminology: Terminology[];
  quiz: Quiz[];
}

export default function LevelEducation({ levelId, theory, chemicalProcess, terminology, quiz }: LevelEducationProps) {
  // Add state for tracking answered questions and feedback
  const [answeredQuestions, setAnsweredQuestions] = React.useState<{[key: number]: string}>({});
  const [feedback, setFeedback] = React.useState<{[key: number]: boolean}>({});

  // Function to handle answer selection
  const handleAnswerSelect = (questionIndex: number, selectedOption: string, correctAnswer: string) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
    setFeedback(prev => ({
      ...prev,
      [questionIndex]: selectedOption === correctAnswer
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tab.Group>
        <Tab.List className="flex rounded-xl bg-pink-100/80 p-0.5">
          <Tab className={({ selected }) => `
            flex-1 rounded-lg px-2 py-1 text-sm font-medium min-w-0
            ${selected 
              ? 'bg-pink-500 text-white shadow'
              : 'text-pink-700 hover:bg-pink-100 hover:text-pink-900'
            }
          `}>
            <div className="flex items-center justify-center space-x-1 min-w-0">
              <BookOpenIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Theory</span>
            </div>
          </Tab>
          <Tab className={({ selected }) => `
            flex-1 rounded-lg px-2 py-1 text-sm font-medium min-w-0
            ${selected 
              ? 'bg-pink-500 text-white shadow'
              : 'text-pink-700 hover:bg-pink-100 hover:text-pink-900'
            }
          `}>
            <div className="flex items-center justify-center space-x-1 min-w-0">
              <BeakerIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Process</span>
            </div>
          </Tab>
          <Tab className={({ selected }) => `
            flex-1 rounded-lg px-2 py-1 text-sm font-medium min-w-0
            ${selected 
              ? 'bg-pink-500 text-white shadow'
              : 'text-pink-700 hover:bg-pink-100 hover:text-pink-900'
            }
          `}>
            <div className="flex items-center justify-center space-x-1 min-w-0">
              <AcademicCapIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Terms</span>
            </div>
          </Tab>
          <Tab className={({ selected }) => `
            flex-1 rounded-lg px-2 py-1 text-sm font-medium min-w-0
            ${selected 
              ? 'bg-pink-500 text-white shadow'
              : 'text-pink-700 hover:bg-pink-100 hover:text-pink-900'
            }
          `}>
            <div className="flex items-center justify-center space-x-1 min-w-0">
              <QuestionMarkCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Quiz</span>
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          {/* Theory Panel */}
          <Tab.Panel className="bg-white rounded-xl p-6 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {theory ? (
                <>
                  <div className="border-b border-pink-100 pb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{theory.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{theory.content}</p>
                  </div>
                  {theory.key_points && theory.key_points.length > 0 && (
                    <div className="pt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Points:</h4>
                      <ul className="space-y-3">
                        {theory.key_points.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No theory content available for this level.</p>
                </div>
              )}
            </motion.div>
          </Tab.Panel>

          {/* Chemical Process Panel */}
          <Tab.Panel className="bg-white rounded-xl p-6 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {chemicalProcess ? (
                <div>
                  <h2 className="text-xl font-bold mb-4">{chemicalProcess.process_name}</h2>
                  <p className="text-gray-700 mb-4">{chemicalProcess.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">Chemical Reactions:</h3>
                  <ol className="list-decimal pl-5 space-y-2 mb-4">
                    {chemicalProcess.steps && chemicalProcess.steps.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ol>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      ⚠️ Safety Notes:
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {chemicalProcess.precautions && chemicalProcess.precautions.map((note, index) => (
                        <li key={index} className="text-yellow-700">{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No chemical process information available for this level.</p>
                </div>
              )}
            </motion.div>
          </Tab.Panel>

          {/* Terminology Panel */}
          <Tab.Panel className="bg-white rounded-xl p-6 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {terminology.length > 0 ? (
                <div className="grid gap-6">
                  {terminology.map((term, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-pink-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{term.term}</h3>
                        <span className="px-3 py-1 text-sm font-medium text-pink-600 bg-pink-100 rounded-full">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-gray-700">{term.definition}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No terminology available for this level.</p>
                </div>
              )}
            </motion.div>
          </Tab.Panel>

          {/* Quiz Panel */}
          <Tab.Panel className="bg-white rounded-xl p-6 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {quiz.length > 0 ? (
                quiz.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optIndex) => {
                        const isAnswered = answeredQuestions[index] !== undefined;
                        const isSelected = answeredQuestions[index] === option;
                        const isCorrect = feedback[index] && isSelected;
                        const isWrong = !feedback[index] && isSelected;
                        
                        return (
                          <button
                            key={optIndex}
                            onClick={() => !isAnswered && handleAnswerSelect(index, option, question.correct_answer)}
                            disabled={isAnswered}
                            className={`w-full text-left p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                              isAnswered
                                ? isSelected
                                  ? isCorrect
                                    ? 'bg-green-50 border-green-300 ring-green-500'
                                    : 'bg-red-50 border-red-300 ring-red-500'
                                  : option === question.correct_answer
                                    ? 'bg-green-50 border-green-300'
                                    : 'bg-gray-50 border-gray-200'
                                : 'border-gray-200 hover:bg-pink-50 hover:border-pink-300 focus:ring-pink-500'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 mr-3 ${
                                  isSelected
                                    ? isCorrect
                                      ? 'border-green-500 text-green-500'
                                      : 'border-red-500 text-red-500'
                                    : isAnswered && option === question.correct_answer
                                      ? 'border-green-500 text-green-500'
                                      : 'border-gray-300 text-gray-500'
                                }`}>
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                {option}
                              </div>
                              {isAnswered && (
                                <div className="flex-shrink-0">
                                  {isSelected ? (
                                    isCorrect ? (
                                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    ) : (
                                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    )
                                  ) : option === question.correct_answer && (
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              )}
                            </div>
                            {isAnswered && isSelected && (
                              <div className={`mt-2 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {isCorrect ? 'Correct!' : `Incorrect. The correct answer is "${question.correct_answer}"`}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No quiz questions available for this level.</p>
                </div>
              )}
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
