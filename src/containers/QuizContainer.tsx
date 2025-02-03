'use client';

import React, { useEffect } from 'react';
import { useDevice } from '@/hooks/useDevice';
import { useAuth } from '@/context/AuthContext';
import { useTutorialStore } from '@/store/tutorialStore';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import QuizMobilePresenter from '@/presenters/QuizMobilePresenter';
import QuizDesktopPresenter from '@/presenters/QuizDesktopPresenter';
import { supabase } from '@/lib/supabaseClient';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export function QuizContainer() {
  const { isMobile } = useDevice();
  const { user } = useAuth();
  const { progress, markStepComplete } = useTutorialStore();
  const [quizData, setQuizData] = React.useState<QuizData | null>(null);
  const [userAnswers, setUserAnswers] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [score, setScore] = React.useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch from both databases
        const [quizResponse, solverResponse] = await Promise.all([
          supabase.from('quiz').select('*').single(),
          supabase.from('solver').select('*').single()
        ]);

        if (quizResponse.error) throw quizResponse.error;
        if (solverResponse.error) throw solverResponse.error;

        setQuizData({
          ...quizResponse.data,
          solverData: solverResponse.data
        });

        // Fetch any existing answers
        const { data: answersData } = await supabase
          .from('quiz_answers')
          .select('answers')
          .eq('user_id', user?.id)
          .eq('quiz_id', quizResponse.data.id)
          .single();

        if (answersData) {
          setUserAnswers(answersData.answers);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch quiz data'));
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleAnswer = async (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    try {
      // Update both databases
      await Promise.all([
        supabase.from('quiz_answers').upsert({
          user_id: user?.id,
          quiz_id: quizData?.id,
          answers: newAnswers,
          updated_at: new Date().toISOString()
        }),
        supabase.from('solver_answers').upsert({
          user_id: user?.id,
          reference_id: quizData?.id,
          type: 'quiz',
          answers: newAnswers,
          updated_at: new Date().toISOString()
        })
      ]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save answer'));
    }
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
      return count + (answer === quizData.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return (correctAnswers / quizData.questions.length) * 100;
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);

    try {
      // Update both databases with the final score
      await Promise.all([
        supabase.from('quiz_results').upsert({
          user_id: user?.id,
          quiz_id: quizData?.id,
          score: finalScore,
          passed: finalScore >= (quizData?.passingScore || 0),
          completed_at: new Date().toISOString()
        }),
        supabase.from('solver_results').upsert({
          user_id: user?.id,
          reference_id: quizData?.id,
          type: 'quiz',
          score: finalScore,
          passed: finalScore >= (quizData?.passingScore || 0),
          completed_at: new Date().toISOString()
        })
      ]);

      if (finalScore >= (quizData?.passingScore || 0)) {
        markStepComplete(progress.currentStep);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to submit quiz'));
    }
  };

  const QuizPresenter = isMobile ? QuizMobilePresenter : QuizDesktopPresenter;

  return (
    <ErrorBoundary>
      <QuizPresenter
        data={quizData}
        userAnswers={userAnswers}
        score={score}
        isLoading={isLoading}
        error={error}
        onAnswer={handleAnswer}
        onSubmit={handleSubmit}
      />
    </ErrorBoundary>
  );
}
