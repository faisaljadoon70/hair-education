'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEducationalContent } from '../../hooks/useEducationalContent';
import LevelEducation from './LevelEducation';
import { Tab } from '@headlessui/react';

// Types
interface HairLevel {
  level: number;
  name: string;
  underlying_pigment: string;
  neutralizing_tone: string;
}

interface ColorNode {
  id: string;
  x: number;
  y: number;
  properties: HairLevel;
  edges: {
    [key: string]: ColorNode;
  };
}

const radius = 180;
const centerX = 220;
const centerY = 220;

export const AdvancedLevelWheel = () => {
  const [colorGraph, setColorGraph] = useState<{ [key: string]: ColorNode }>({});
  const [selectedNode, setSelectedNode] = useState<ColorNode | null>(null);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'levelWheel' | 'colorMixing' | 'formulaBuilder' | 'reverseFormula' | 'colorPrediction' | 'liftingProcess'>('levelWheel');
  const [activeContent, setActiveContent] = useState<'theory' | 'process' | 'terms' | 'quiz'>('theory');
  const [showColorInfo, setShowColorInfo] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{[key: number]: number}>({});
  const [feedback, setFeedback] = useState<{[key: number]: boolean}>({});

  const levelId = selectedNode ? (selectedNode.properties as HairLevel).level : null;
  const { theory, chemicalProcess, terminology, quiz: quizData } = useEducationalContent(levelId || 0);

  useEffect(() => {
    const fetchColorSystem = async () => {
      try {
        setLoading(true);
        const graph: { [key: string]: ColorNode } = {};
        
        // Create nodes for each level
        const levels: HairLevel[] = Array.from({ length: 10 }, (_, i) => ({
          level: i + 1,
          name: `Level ${i + 1}`,
          underlying_pigment: getUndertone(i + 1),
          neutralizing_tone: 'neutral'
        }));

        levels.forEach((level, index) => {
          const angle = (index * (360 / levels.length) - 90) * (Math.PI / 180);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          graph[`level_${level.level}`] = {
            id: `level_${level.level}`,
            x,
            y,
            properties: level,
            edges: {}
          };
        });

        // Connect nodes
        Object.values(graph).forEach((node) => {
          const level = (node.properties as HairLevel).level;
          if (level > 1) {
            node.edges['darker'] = graph[`level_${level - 1}`];
          }
          if (level < 10) {
            node.edges['lighter'] = graph[`level_${level + 1}`];
          }
        });

        setColorGraph(graph);
      } catch (error) {
        console.error('Error fetching color system:', error);
        setError('Failed to load color system');
      } finally {
        setLoading(false);
      }
    };

    fetchColorSystem();
  }, []);

  useEffect(() => {
    if (quizData) {
      setQuiz(JSON.parse(JSON.stringify(quizData)));
    }
  }, [quizData]);

  useEffect(() => {
    setAnsweredQuestions({});
    setFeedback({});
  }, [levelId]);

  const getUndertone = (level: number): string => {
    if (level <= 2) return "Blue/Black";
    if (level <= 4) return "Deep Red/Orange";
    if (level <= 6) return "Red/Copper";
    if (level <= 8) return "Orange/Gold";
    return "Yellow";
  };

  const getLevelColor = (level: number): string => {
    const colors = {
      1: "#000000", // Level 1 - Black
      2: "#1a1a1a", // Level 2 - Darkest Brown
      3: "#2a1810", // Level 3 - Dark Brown
      4: "#3b2218", // Level 4 - Medium Brown
      5: "#4a3020", // Level 5 - Light Brown
      6: "#5c4030", // Level 6 - Dark Blonde
      7: "#8b6a4f", // Level 7 - Medium Blonde
      8: "#b6916c", // Level 8 - Light Blonde
      9: "#d4b795", // Level 9 - Very Light Blonde
      10: "#e8d6b5" // Level 10 - Lightest Blonde
    };
    return colors[level as keyof typeof colors] || '#000000';
  };

  const rotateWheel = (direction: 'left' | 'right') => {
    const newRotation = rotation + (direction === 'left' ? -45 : 45);
    setRotation(newRotation);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <div className="flex space-x-2">
          <Link href="/advanced-level-wheel" className={`px-6 py-2 rounded-t ${activeTab === 'levelWheel' ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}>Level Wheel</Link>
          <Link href="/advanced-level-wheel/color-mixing" className={`px-6 py-2 rounded-t ${activeTab === 'colorMixing' ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}>Color Mixing</Link>
          <Link href="/advanced-level-wheel/formula-builder" className={`px-6 py-2 rounded-t ${activeTab === 'formulaBuilder' ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}>Formula Builder</Link>
          <Link href="/advanced-level-wheel/reverse-formula" className={`px-6 py-2 rounded-t ${activeTab === 'reverseFormula' ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}>Reverse Formula</Link>
          <Link href="/advanced-level-wheel/color-prediction" className={`px-6 py-2 rounded-t ${activeTab === 'colorPrediction' ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}>Color Prediction</Link>
          <Link href="/advanced-level-wheel/lifting-process" className={`px-6 py-2 rounded-t ${activeTab === 'liftingProcess' ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}>Lifting Process</Link>
        </div>
        <div className="h-px bg-gray-200 -mt-px"></div>
      </div>

      <div className="flex">
        {/* Quick Navigation - Only show in Level Wheel tab */}
        {activeTab === 'levelWheel' && (
          <div className="w-40 flex-shrink-0">
            <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
            <div className="space-y-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedNode(colorGraph[`level_${level}`])}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-pink-50 rounded-lg"
                >
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0"
                    style={{ 
                      backgroundColor: level === 1 ? '#000000' 
                        : level === 2 ? '#1a1a1a'
                        : level === 3 ? '#2a1f1f'
                        : level === 4 ? '#3a2a2a'
                        : level === 5 ? '#4a3535'
                        : level === 6 ? '#5c4040'
                        : level === 7 ? '#6b4b4b'
                        : level === 8 ? '#8c6b6b'
                        : level === 9 ? '#b39999'
                        : '#d4c3c3'
                    }}
                  />
                  <span className="text-sm">Level {level}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <div className="relative">
            <motion.div
              className="w-full"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <svg viewBox="0 0 440 440" className="w-full max-w-[500px] mx-auto">
                {/* Background circle */}
                <circle
                  cx="220"
                  cy="220"
                  r={radius + 40}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />

                {/* Center point */}
                <circle cx="220" cy="220" r="5" fill="#E91E63" />

                {/* Relationship lines */}
                {Object.entries(colorGraph).map(([key, node]) => (
                  Object.entries(node.edges).map(([type, target]) => (
                    <motion.line
                      key={`${node.id}-${target.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#666"
                      strokeWidth="2"
                      strokeDasharray="4"
                    />
                  ))
                ))}

                {/* Level circles */}
                {Object.entries(colorGraph).map(([key, node]) => {
                  const level = (node.properties as HairLevel).level;
                  return (
                    <motion.g
                      key={key}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: level * 0.1 }}
                    >
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r="30"
                        fill={getLevelColor(level)}
                        stroke={selectedNode?.id === node.id ? '#E91E63' : '#666'}
                        strokeWidth="2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedNode(node)}
                        className="cursor-pointer"
                      />
                      <text
                        x={node.x}
                        y={node.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        className="text-sm font-bold pointer-events-none"
                      >
                        {level}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </motion.div>

            {/* Rotation controls */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => rotateWheel('left')}
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors"
              >
                Rotate Left
              </button>
              <button
                onClick={() => rotateWheel('right')}
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors"
              >
                Rotate Right
              </button>
            </div>
          </div>

          {/* Level title and navigation under wheel */}
          {selectedNode && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Level {(selectedNode.properties as HairLevel).level}
                </h2>
              </div>

              {/* Bottom Navigation Tabs - these will sync with right panel */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => setActiveContent('theory')}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    activeContent === 'theory' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  <span className="mr-2">🎨</span>Theory
                </button>
                <button 
                  onClick={() => setActiveContent('process')}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    activeContent === 'process' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  <span className="mr-2">⚗️</span>Process
                </button>
                <button 
                  onClick={() => setActiveContent('terms')}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    activeContent === 'terms' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  <span className="mr-2">📖</span>Terms
                </button>
                <button 
                  onClick={() => setActiveContent('quiz')}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    activeContent === 'quiz' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  <span className="mr-2">❓</span>Quiz
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel Content */}
        <AnimatePresence>
          {selectedNode && activeTab === 'levelWheel' && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="w-96 bg-white rounded-lg shadow-lg"
            >
              {/* Top Tab Navigation */}
              <div className="flex justify-between p-4 border-b">
                <button
                  onClick={() => setShowColorInfo(true)}
                  className={`px-4 py-2 rounded-md ${
                    showColorInfo ? 'bg-pink-500 text-white' : 'text-gray-600'
                  }`}
                >
                  Color Info
                </button>
                <button
                  onClick={() => setShowColorInfo(false)}
                  className={`px-4 py-2 rounded-md ${
                    !showColorInfo ? 'bg-pink-500 text-white' : 'text-gray-600'
                  }`}
                >
                  Education
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {showColorInfo ? (
                  // Color Info Content
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-blue-900 uppercase mb-1">
                        Technical Description
                      </h4>
                      <p className="text-gray-900">
                        {(selectedNode.properties as HairLevel).name}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-blue-900 uppercase mb-2">
                        Underlying Pigment
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-sm border border-gray-200"
                          style={{ backgroundColor: (selectedNode.properties as HairLevel).underlying_pigment }}
                        />
                        <div className="text-sm">
                          <div className="text-gray-900">
                            {(selectedNode.properties as HairLevel).underlying_pigment}
                          </div>
                          <div className="text-xs text-gray-500">
                            Natural Pigment
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-blue-900 uppercase mb-2">
                        Neutralizing Tone
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-sm border border-gray-200"
                          style={{ backgroundColor: (selectedNode.properties as HairLevel).neutralizing_tone }}
                        />
                        <div className="text-sm">
                          <div className="text-gray-900">
                            {(selectedNode.properties as HairLevel).neutralizing_tone}
                          </div>
                          <div className="text-xs text-gray-500">
                            Corrective Tone
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-blue-900 uppercase mb-2">
                        Level Relationships
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(selectedNode.edges).map(([type, target]) => (
                          <div key={type} className="flex items-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded-sm"
                              style={{ backgroundColor: getLevelColor((target.properties as HairLevel).level) }}
                            />
                            <span className="text-sm">
                              <span className="text-gray-600 capitalize">{type}:</span>
                              <span className="ml-1">Level {(target.properties as HairLevel).level}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Educational Content
                  <div>
                    {/* Education Navigation */}
                    <div className="flex space-x-1 mb-6">
                      <button 
                        onClick={() => setActiveContent('theory')}
                        className={`flex items-center px-2 py-1.5 text-sm rounded-md ${
                          activeContent === 'theory' 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                        }`}
                      >
                        <span className="mr-1">📚</span>Theory
                      </button>
                      <button 
                        onClick={() => setActiveContent('process')}
                        className={`flex items-center px-2 py-1.5 text-sm rounded-md ${
                          activeContent === 'process' 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                        }`}
                      >
                        <span className="mr-1">⚗️</span>Process
                      </button>
                      <button 
                        onClick={() => setActiveContent('terms')}
                        className={`flex items-center px-2 py-1.5 text-sm rounded-md ${
                          activeContent === 'terms' 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                        }`}
                      >
                        <span className="mr-1">📖</span>Terms
                      </button>
                      <button 
                        onClick={() => setActiveContent('quiz')}
                        className={`flex items-center px-2 py-1.5 text-sm rounded-md ${
                          activeContent === 'quiz' 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                        }`}
                      >
                        <span className="mr-1">❓</span>Quiz
                      </button>
                    </div>

                    {/* Theory Content */}
                    {activeContent === 'theory' && theory && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Color Theory</h2>
                        <div className="space-y-4">
                          {theory.concepts.map((concept, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                              <h3 className="text-lg font-semibold mb-2">{concept.title}</h3>
                              <p className="text-gray-700">{concept.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Process Content */}
                    {activeContent === 'process' && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">High-Lift Process</h2>
                        <p className="text-gray-700 mb-4">
                          The process of lifting Level {(selectedNode.properties as HairLevel).level} hair
                          requires careful attention to achieve desired results while maintaining hair integrity.
                        </p>

                        <h3 className="text-lg font-semibold mb-2">Chemical Reactions:</h3>
                        <ol className="list-decimal pl-5 space-y-2 mb-4">
                          <li>Oxidation of melanin molecules</li>
                          <li>Breaking of disulfide bonds</li>
                          <li>Dispersion of color molecules</li>
                        </ol>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                            ⚠️ Safety Notes:
                          </h3>
                          <p className="text-yellow-700">
                            Always perform strand test. Monitor processing time closely. Use
                            appropriate strength developer.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Terms Content */}
                    {activeContent === 'terms' && terminology && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Technical Terms</h2>
                        <div className="space-y-4">
                          {terminology.map((term, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                              <h3 className="text-lg font-semibold text-pink-600 mb-1">{term.term}</h3>
                              <p className="text-gray-700">{term.definition}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quiz Content */}
                    {activeContent === 'quiz' && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Knowledge Check</h2>
                        {quiz ? (
                          <div className="space-y-6">
                            {quiz.questions.map((question, qIndex) => (
                              <div key={qIndex} className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">
                                  {qIndex + 1}. {question.text}
                                </h3>
                                <div className="space-y-3">
                                  {question.options.map((option, oIndex) => {
                                    const isAnswered = answeredQuestions[qIndex] !== undefined;
                                    const isSelected = answeredQuestions[qIndex] === oIndex;
                                    const isCorrect = oIndex === question.correct_answer;
                                    const shouldHighlight = isAnswered && (isSelected || isCorrect);
                                    
                                    return (
                                      <button
                                        key={oIndex}
                                        onClick={() => {
                                          setAnsweredQuestions(prev => ({
                                            ...prev,
                                            [qIndex]: oIndex
                                          }));
                                          setFeedback(prev => ({
                                            ...prev,
                                            [qIndex]: oIndex === question.correct_answer
                                          }));
                                        }}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                          shouldHighlight
                                            ? isCorrect
                                              ? 'bg-green-100 border-2 border-green-500'
                                              : isSelected
                                                ? 'bg-red-100 border-2 border-red-500'
                                                : 'bg-gray-50'
                                            : 'bg-gray-50 hover:bg-pink-50'
                                        }`}
                                        disabled={isAnswered}
                                      >
                                        <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                                          shouldHighlight
                                            ? isCorrect
                                              ? 'border-green-500 text-green-500'
                                              : isSelected
                                                ? 'border-red-500 text-red-500'
                                                : 'border-gray-300 text-gray-500'
                                            : 'border-gray-300 text-gray-500'
                                        }`}>
                                          {String.fromCharCode(65 + oIndex)}
                                        </div>
                                        <span className={
                                          shouldHighlight
                                            ? isCorrect
                                              ? 'text-green-700'
                                              : isSelected
                                                ? 'text-red-700'
                                                : 'text-gray-700'
                                            : 'text-gray-700'
                                        }>{option}</span>
                                        {shouldHighlight && (
                                          <span className="ml-2">
                                            {isCorrect ? '✓' : isSelected ? '✗' : ''}
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                                {answeredQuestions[qIndex] !== undefined && !feedback[qIndex] && (
                                  <div className="mt-4">
                                    <div className="text-red-600 mb-2">
                                      That's not the correct answer.
                                    </div>
                                    <button
                                      onClick={() => {
                                        setAnsweredQuestions(prev => {
                                          const newAnswers = { ...prev };
                                          delete newAnswers[qIndex];
                                          return newAnswers;
                                        });
                                        setFeedback(prev => {
                                          const newFeedback = { ...prev };
                                          delete newFeedback[qIndex];
                                          return newFeedback;
                                        });
                                      }}
                                      className="text-pink-600 hover:text-pink-700 font-medium flex items-center"
                                    >
                                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                      </svg>
                                      Try Again
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No quiz questions available for this level.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
