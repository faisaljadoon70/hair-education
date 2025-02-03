'use client';

import React, { useEffect, useState } from 'react';
import { useDevice } from '@/hooks/useDevice';
import { useAuth } from '@/context/AuthContext';
import { useTutorial } from '@/context/TutorialContext';
import { supabase } from '@/lib/supabaseClient';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import TheoryMobilePresenter from '@/presenters/TheoryMobilePresenter';
import TheoryDesktopPresenter from '@/presenters/TheoryDesktopPresenter';

interface TheoryData {
  id: string;
  title: string;
  content: string;
  images: string[];
  videos?: string[];
}

export function TheoryContainer() {
  const { isMobile } = useDevice();
  const { user } = useAuth();
  const { progress, updateProgress } = useTutorial();
  const [theoryData, setTheoryData] = useState<TheoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch from both databases
        const [theoryResponse, solverResponse] = await Promise.all([
          supabase.from('theory').select('*').single(),
          supabase.from('solver').select('*').single()
        ]);

        if (theoryResponse.error) throw theoryResponse.error;
        if (solverResponse.error) throw solverResponse.error;

        // Combine the data
        setTheoryData({
          ...theoryResponse.data,
          solverData: solverResponse.data
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleUpdateProgress = async (newProgress: number) => {
    try {
      // Update both databases
      const [theoryUpdate, solverUpdate] = await Promise.all([
        supabase.from('theory_progress').upsert({
          user_id: user?.id,
          progress: newProgress,
          updated_at: new Date().toISOString()
        }),
        supabase.from('solver_progress').upsert({
          user_id: user?.id,
          progress: newProgress,
          updated_at: new Date().toISOString()
        })
      ]);

      if (theoryUpdate.error) throw theoryUpdate.error;
      if (solverUpdate.error) throw solverUpdate.error;

      updateProgress(newProgress);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update progress'));
    }
  };

  const TheoryPresenter = isMobile ? TheoryMobilePresenter : TheoryDesktopPresenter;

  return (
    <ErrorBoundary>
      <TheoryPresenter
        data={theoryData}
        progress={progress}
        isLoading={isLoading}
        error={error}
        onProgressUpdate={handleUpdateProgress}
      />
    </ErrorBoundary>
  );
}
