import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizContainer from '@/containers/QuizContainer';
import { useAuth } from '@/context/AuthContext';
import { useTutorialStore } from '@/stores/tutorialStore';

// Mock hooks
jest.mock('@/context/AuthContext');
jest.mock('@/stores/tutorialStore');

describe('QuizContainer', () => {
  const mockUser = { id: 'test-user-id' };
  const mockQuizData = {
    title: 'Test Quiz',
    questions: [
      {
        question: 'Test Question 1',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
      },
    ],
    passingScore: 70,
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (useTutorialStore as jest.Mock).mockReturnValue({
      quizData: mockQuizData,
      setQuizData: jest.fn(),
      updateProgress: jest.fn(),
    });
  });

  it('renders quiz content correctly', () => {
    render(<QuizContainer />);
    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    expect(screen.getByText('Test Question 1')).toBeInTheDocument();
  });

  it('handles answer selection', async () => {
    render(<QuizContainer />);
    const answerButton = screen.getByText('A');
    fireEvent.click(answerButton);
    
    await waitFor(() => {
      expect(answerButton).toHaveClass('bg-blue-500');
    });
  });

  it('shows loading state', () => {
    (useTutorialStore as jest.Mock).mockReturnValue({
      quizData: null,
      isLoading: true,
    });

    render(<QuizContainer />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const error = new Error('Test error');
    (useTutorialStore as jest.Mock).mockReturnValue({
      quizData: null,
      error,
    });

    render(<QuizContainer />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('submits quiz and shows results', async () => {
    const mockUpdateProgress = jest.fn();
    (useTutorialStore as jest.Mock).mockReturnValue({
      quizData: mockQuizData,
      updateProgress: mockUpdateProgress,
    });

    render(<QuizContainer />);
    
    // Select answer
    fireEvent.click(screen.getByText('A'));
    
    // Submit quiz
    fireEvent.click(screen.getByText('Submit Quiz'));

    await waitFor(() => {
      expect(mockUpdateProgress).toHaveBeenCalled();
      expect(screen.getByText(/Quiz Results/)).toBeInTheDocument();
    });
  });
});
