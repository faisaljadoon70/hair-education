import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Theory {
  concepts: Array<{
    title: string;
    description: string;
  }>;
}

interface ChemicalProcess {
  process_name: string;
  description: string;
  steps: string[];
  precautions: string[];
}

interface Term {
  term: string;
  definition: string;
}

interface Quiz {
  questions: Array<{
    text: string;
    options: string[];
    correct_answer: number;
  }>;
}

export const useEducationalContent = (levelId: number) => {
  const [theory, setTheory] = useState<Theory | null>(null);
  const [chemicalProcess, setChemicalProcess] = useState<ChemicalProcess | null>(null);
  const [terminology, setTerminology] = useState<Term[] | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch theory content
        const { data: theoryData, error: theoryError } = await supabase
          .from('level_theory')
          .select('*')
          .eq('level_id', levelId)
          .single();

        if (theoryError) throw theoryError;
        const formattedTheory = {
          concepts: [
            {
              title: theoryData.title,
              description: theoryData.content,
            },
          ],
        };
        setTheory(formattedTheory);

        // Fetch chemical process
        const { data: processData, error: processError } = await supabase
          .from('chemical_processes')
          .select('*')
          .eq('level_id', levelId)
          .single();

        if (processError) throw processError;
        const formattedProcess = {
          process_name: processData.process_name,
          description: processData.description,
          steps: processData.chemical_reactions,
          precautions: [processData.safety_notes],
        };
        setChemicalProcess(formattedProcess);

        // Fetch terminology
        const { data: termsData, error: termsError } = await supabase
          .from('hair_terminology')
          .select('*')
          .filter('related_levels', 'cs', `{${levelId}}`);

        if (termsError) throw termsError;
        const formattedTerms = termsData.map((term) => ({
          term: term.term,
          definition: term.definition,
        }));
        setTerminology(formattedTerms);

        // Fetch quiz
        const { data: quizData, error: quizError } = await supabase
          .from('level_quizzes')
          .select('*')
          .eq('level_id', levelId);

        if (quizError) throw quizError;
        
        // Helper function to shuffle array
        const shuffleArray = <T>(array: T[]): T[] => {
          const newArray = [...array];
          for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          }
          return newArray;
        };

        const formattedQuiz = {
          questions: quizData.map((question) => {
            // Create array of all options including correct answer
            const allOptions = [...question.options];
            
            // Shuffle the options
            const shuffledOptions = shuffleArray(allOptions);
            
            // Find the new index of the correct answer after shuffling
            const correctAnswerIndex = shuffledOptions.indexOf(question.correct_answer);
            
            return {
              text: question.question,
              options: shuffledOptions,
              correct_answer: correctAnswerIndex
            };
          }),
        };
        setQuiz(formattedQuiz);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (levelId) {
      fetchContent();
    }
  }, [levelId]);

  return { theory, chemicalProcess, terminology, quiz, loading, error };
};
