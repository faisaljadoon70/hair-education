'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface TutorialPreferences {
  theme?: 'light' | 'dark';
  fontSize?: 'small' | 'medium' | 'large';
  language?: string;
}

interface TutorialProgress {
  currentStep: string;
  completedSteps: string[];
  lastAccessed: string;
}

interface TutorialContextType {
  preferences: TutorialPreferences;
  progress: TutorialProgress;
  updatePreferences: (newPrefs: Partial<TutorialPreferences>) => Promise<void>;
  updateProgress: (newProgress: Partial<TutorialProgress>) => Promise<void>;
}

const defaultContext: TutorialContextType = {
  preferences: {},
  progress: {
    currentStep: '',
    completedSteps: [],
    lastAccessed: new Date().toISOString()
  },
  updatePreferences: async () => {},
  updateProgress: async () => {}
};

const TutorialContext = createContext<TutorialContextType>(defaultContext);

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const supabase = createClientComponentClient();
  const [preferences, setPreferences] = useState<TutorialPreferences>({});
  const [progress, setProgress] = useState<TutorialProgress>(defaultContext.progress);

  // Load preferences and progress from Supabase when user changes
  useEffect(() => {
    if (!user?.id) return;

    async function loadUserData() {
      try {
        // Load preferences
        const { data: prefsData } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (prefsData) {
          setPreferences(prefsData.preferences);
        }

        // Load progress
        const { data: progressData } = await supabase
          .from('tutorial_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (progressData) {
          setProgress(progressData.progress);
        }
      } catch (error) {
        console.error('Error loading tutorial data:', error);
      }
    }

    loadUserData();
  }, [user?.id, supabase]);

  const updatePreferences = async (newPrefs: Partial<TutorialPreferences>) => {
    if (!user?.id) return;

    const updatedPrefs = { ...preferences, ...newPrefs };
    setPreferences(updatedPrefs);

    try {
      await supabase
        .from('user_preferences')
        .upsert({ 
          user_id: user.id, 
          preferences: updatedPrefs,
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const updateProgress = async (newProgress: Partial<TutorialProgress>) => {
    if (!user?.id) return;

    const updatedProgress = { ...progress, ...newProgress };
    setProgress(updatedProgress);

    try {
      await supabase
        .from('tutorial_progress')
        .upsert({ 
          user_id: user.id, 
          progress: updatedProgress,
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <TutorialContext.Provider value={{
      preferences,
      progress,
      updatePreferences,
      updateProgress
    }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
