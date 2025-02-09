'use client';

import useDeviceDetection from '@/hooks/useDeviceDetection';
import MobileBeginnerChapter1Page from '../pages/MobileBeginnerChapter1Page';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client';

interface ModuleItem {
  text: string;
  content: string;
  completed?: boolean;
}

interface MobileBeginnerChapter1PageContainerProps {
  children: React.ReactNode;
}

export default function MobileBeginnerChapter1PageContainer({ children }: MobileBeginnerChapter1PageContainerProps) {
  const { isMobile } = useDeviceDetection();
  const [isLoading, setIsLoading] = useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState<{ title: string; items: ModuleItem[] }[]>([
    {
      title: 'Hair and Scalp',
      items: [
        { 
          text: 'What is Hair?', 
          content: `Alright, let's really unravel the complexities of what we call 'hair.' It's far more than just a decorative element; it's a sophisticated biological structure with a compelling story to tell at a cellular level.`,
          completed: false
        },
        {
          text: 'Division of Hair',
          content: 'The hair is divided into two main parts: the hair root and the hair shaft.',
          completed: false
        }
      ]
    },
    {
      title: 'Hair Structure',
      items: [
        {
          text: 'Cuticle',
          content: 'The cuticle is the outermost layer of the hair shaft.',
          completed: false
        },
        {
          text: 'Cortex',
          content: 'The cortex makes up the bulk of the hair shaft.',
          completed: false
        }
      ]
    }
  ]);

  // Load progress from Supabase
  useEffect(() => {
    const loadProgress = async () => {
      if (!isMobile) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('chapter_progress')
          .select('*')
          .eq('chapter_id', 1)
          .single();

        if (error) throw error;

        if (data) {
          setProgress(data.progress || 0);
          // Update modules completion based on progress
          const updatedModules = modules.map(module => ({
            ...module,
            items: module.items.map((item, idx) => ({
              ...item,
              completed: idx < data.progress
            }))
          }));
          setModules(updatedModules);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [isMobile]);

  if (isMobile) {
    return (
      <MobileBeginnerChapter1Page 
        isLoading={isLoading}
        modules={modules}
        currentModule={currentModule}
        setCurrentModule={setCurrentModule}
        progress={progress}
      />
    );
  }

  return <>{children}</>;
}
