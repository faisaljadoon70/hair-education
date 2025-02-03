import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChapterProgress {
  completed: boolean;
  lastVisited: string;
  score?: number;
}

interface CourseProgress {
  [chapterId: string]: ChapterProgress;
}

interface TutorialState {
  beginner: CourseProgress;
  intermediate: CourseProgress;
  expert: CourseProgress;
  currentChapter: string | null;
  setChapterProgress: (level: string, chapterId: string, progress: ChapterProgress) => void;
  setCurrentChapter: (chapterId: string | null) => void;
  calculateLevelProgress: (level: string) => number;
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      beginner: {},
      intermediate: {},
      expert: {},
      currentChapter: null,

      setChapterProgress: (level, chapterId, progress) =>
        set((state) => ({
          [level]: {
            ...state[level as keyof Pick<TutorialState, 'beginner' | 'intermediate' | 'expert'>],
            [chapterId]: progress,
          },
        })),

      setCurrentChapter: (chapterId) =>
        set(() => ({
          currentChapter: chapterId,
        })),

      calculateLevelProgress: (level) => {
        const state = get();
        const chapters = state[level as keyof Pick<TutorialState, 'beginner' | 'intermediate' | 'expert'>];
        const completedChapters = Object.values(chapters).filter((chapter) => chapter.completed).length;
        const totalChapters = Object.keys(chapters).length || 1; // Avoid division by zero
        return (completedChapters / totalChapters) * 100;
      },
    }),
    {
      name: 'tutorial-progress',
      // Only persist these fields
      partialize: (state) => ({
        beginner: state.beginner,
        intermediate: state.intermediate,
        expert: state.expert,
      }),
    }
  )
);
