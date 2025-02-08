import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Theory {
  title: string;
  content: string;
  key_points: string[];
}

interface ChemicalProcess {
  process_name: string;
  description: string;
  chemical_reactions: string[];
  safety_notes: string;
}

interface Terminology {
  term: string;
  definition: string;
  category: string;
}

interface Quiz {
  question: string;
  options: string[];
  correct_answer: string;
}

export const useEducationalContent = (levelId: number) => {
  const [theory, setTheory] = useState<Theory | null>(null);
  const [chemicalProcess, setChemicalProcess] = useState<ChemicalProcess | null>(null);
  const [terminology, setTerminology] = useState<Terminology[]>([]);
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchEducationalContent() {
      try {
        if (!levelId || !isMounted) return;
        setLoading(true);
        
        // Check if we have a valid Supabase connection
        if (!supabase) {
          console.error('Supabase client is not initialized');
          setError('Database connection error');
          return;
        }

        // Log the request details
        console.log('Fetching educational content for level:', levelId);
        
        // Fetch theory content
        const { data: theoryData, error: theoryError } = await supabase
          .from('level_theory')
          .select('*')
          .eq('level_id', levelId)
          .single();
        
        console.log('Theory query result:', {
          data: theoryData,
          error: theoryError,
          query: {
            table: 'level_theory',
            condition: `level_id = ${levelId}`,
            sql: `SELECT * FROM level_theory WHERE level_id = ${levelId}`
          }
        });
        
        if (theoryError) {
          console.error('Theory fetch error:', {
            error: theoryError,
            code: theoryError.code,
            details: theoryError.details,
            hint: theoryError.hint,
            message: theoryError.message
          });
          if (theoryError.code === 'PGRST116') {
            console.log(`No theory content found for level ${levelId}`);
            if (isMounted) setTheory(null);
          } else {
            throw theoryError;
          }
        } else if (isMounted) {
          console.log('Setting theory data:', theoryData);
          setTheory(theoryData);
        }

        // Fetch chemical process
        const { data: processData, error: processError } = await supabase
          .from('chemical_processes')
          .select('*')
          .eq('level_id', levelId)
          .single();
        
        console.log('Chemical process query result:', {
          data: processData,
          error: processError,
          query: {
            table: 'chemical_processes',
            condition: `level_id = ${levelId}`,
            sql: `SELECT * FROM chemical_processes WHERE level_id = ${levelId}`
          }
        });
        
        if (processError) {
          console.error('Chemical process fetch error:', {
            error: processError,
            code: processError.code,
            details: processError.details,
            hint: processError.hint,
            message: processError.message
          });
          throw processError;
        } else if (isMounted) {
          console.log('Setting chemical process data:', processData);
          setChemicalProcess(processData);
        }

        // Fetch terminology
        const { data: termData, error: termError } = await supabase
          .from('hair_terminology')
          .select('*')
          .filter('related_levels', 'cs', `{${levelId}}`);
        
        console.log('Terminology query result:', {
          data: termData,
          error: termError,
          query: {
            table: 'hair_terminology',
            condition: `related_levels @> [${levelId}]`,
            sql: `SELECT * FROM hair_terminology WHERE related_levels @> [${levelId}]`
          }
        });
        
        if (termError) {
          console.error('Terminology fetch error:', {
            error: termError,
            code: termError.code,
            details: termError.details,
            hint: termError.hint,
            message: termError.message
          });
          throw termError;
        } else if (isMounted) {
          console.log('Setting terminology data:', termData);
          setTerminology(termData || []);
        }

        // Fetch quizzes
        const { data: quizData, error: quizError } = await supabase
          .from('level_quizzes')
          .select('*')
          .eq('level_id', levelId);
        
        console.log('Quiz query result:', {
          data: quizData,
          error: quizError,
          query: {
            table: 'level_quizzes',
            condition: `level_id = ${levelId}`,
            sql: `SELECT * FROM level_quizzes WHERE level_id = ${levelId}`
          }
        });
        
        if (quizError) {
          console.error('Quiz fetch error:', {
            error: quizError,
            code: quizError.code,
            details: quizError.details,
            hint: quizError.hint,
            message: quizError.message
          });
          throw quizError;
        } else if (isMounted) {
          console.log('Setting quiz data:', quizData);
          setQuiz(quizData || []);
        }

      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchEducationalContent();

    return () => {
      isMounted = false;
    };
  }, [levelId]);

  return { theory, chemicalProcess, terminology, quiz, loading, error };
}
