import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ImageProcessingState {
  status: 'idle' | 'processing' | 'success' | 'error';
  error: string | null;
  currentImage: string | null;
}

interface TutorialProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

interface TutorialStore {
  // Image Processing State
  imageProcessing: ImageProcessingState;
  setImageProcessingStatus: (status: ImageProcessingState['status']) => void;
  setImageProcessingError: (error: string | null) => void;
  setCurrentImage: (image: string | null) => void;
  resetImageProcessing: () => void;

  // Tutorial Progress State
  progress: TutorialProgress;
  setCurrentStep: (step: number) => void;
  markStepComplete: (step: number) => void;
  resetProgress: () => void;
}

const initialImageProcessingState: ImageProcessingState = {
  status: 'idle',
  error: null,
  currentImage: null,
};

const initialProgress: TutorialProgress = {
  currentStep: 0,
  totalSteps: 0,
  completedSteps: [],
};

export const useTutorialStore = create<TutorialStore>()(
  devtools(
    persist(
      (set) => ({
        // Image Processing State
        imageProcessing: initialImageProcessingState,
        setImageProcessingStatus: (status) =>
          set((state) => ({
            imageProcessing: { ...state.imageProcessing, status },
          })),
        setImageProcessingError: (error) =>
          set((state) => ({
            imageProcessing: { ...state.imageProcessing, error, status: error ? 'error' : state.imageProcessing.status },
          })),
        setCurrentImage: (currentImage) =>
          set((state) => ({
            imageProcessing: { ...state.imageProcessing, currentImage },
          })),
        resetImageProcessing: () =>
          set(() => ({
            imageProcessing: initialImageProcessingState,
          })),

        // Tutorial Progress State
        progress: initialProgress,
        setCurrentStep: (currentStep) =>
          set((state) => ({
            progress: { ...state.progress, currentStep },
          })),
        markStepComplete: (step) =>
          set((state) => ({
            progress: {
              ...state.progress,
              completedSteps: [...new Set([...state.progress.completedSteps, step])],
            },
          })),
        resetProgress: () =>
          set(() => ({
            progress: initialProgress,
          })),
      }),
      {
        name: 'tutorial-store',
        partialize: (state) => ({
          progress: state.progress,
        }),
      }
    )
  )
);
