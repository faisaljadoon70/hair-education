'use client';

import React, { useEffect } from 'react';
import { useDevice } from '@/hooks/useDevice';
import { useAuth } from '@/context/AuthContext';
import { useTutorialStore } from '@/store/tutorialStore';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { useImageUpload } from '@/utils/imageProcessing';
import PracticeMobilePresenter from '@/presenters/PracticeMobilePresenter';
import PracticeDesktopPresenter from '@/presenters/PracticeDesktopPresenter';
import { supabase } from '@/lib/supabaseClient';

interface PracticeData {
  id: string;
  title: string;
  instructions: string;
  referenceImages: string[];
  expectedOutcome: string;
}

export function PracticeContainer() {
  const { isMobile } = useDevice();
  const { user } = useAuth();
  const { uploadImage, status: uploadStatus, error: uploadError } = useImageUpload();
  const { progress, markStepComplete } = useTutorialStore();
  const [practiceData, setPracticeData] = React.useState<PracticeData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch from both databases
        const [practiceResponse, solverResponse] = await Promise.all([
          supabase.from('practice').select('*').single(),
          supabase.from('solver').select('*').single()
        ]);

        if (practiceResponse.error) throw practiceResponse.error;
        if (solverResponse.error) throw solverResponse.error;

        setPracticeData({
          ...practiceResponse.data,
          solverData: solverResponse.data
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch practice data'));
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleImageUpload = async (file: File) => {
    try {
      const processedImage = await uploadImage(file);
      
      // Update both databases with the submission
      await Promise.all([
        supabase.from('practice_submissions').insert({
          user_id: user?.id,
          practice_id: practiceData?.id,
          image_url: processedImage.url,
          status: 'submitted',
          metadata: processedImage.metadata
        }),
        supabase.from('solver_submissions').insert({
          user_id: user?.id,
          reference_id: practiceData?.id,
          image_url: processedImage.url,
          type: 'practice',
          status: 'pending_review'
        })
      ]);

      return processedImage;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload image'));
      throw err;
    }
  };

  const handleComplete = async () => {
    try {
      await Promise.all([
        supabase.from('practice_progress').upsert({
          user_id: user?.id,
          practice_id: practiceData?.id,
          completed_at: new Date().toISOString()
        }),
        supabase.from('solver_progress').upsert({
          user_id: user?.id,
          reference_id: practiceData?.id,
          type: 'practice',
          completed_at: new Date().toISOString()
        })
      ]);

      markStepComplete(progress.currentStep);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mark practice as complete'));
    }
  };

  const PracticePresenter = isMobile ? PracticeMobilePresenter : PracticeDesktopPresenter;

  return (
    <ErrorBoundary>
      <PracticePresenter
        data={practiceData}
        isLoading={isLoading}
        error={error}
        uploadStatus={uploadStatus}
        uploadError={uploadError}
        onImageUpload={handleImageUpload}
        onComplete={handleComplete}
      />
    </ErrorBoundary>
  );
}
