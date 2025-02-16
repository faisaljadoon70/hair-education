import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { SavedFormula, FormulaError } from '@/types/formula';

export const useFormulas = (userId: string) => {
  const [formulas, setFormulas] = useState<SavedFormula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FormulaError | null>(null);

  const loadFormulas = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_formulas')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw { message: error.message };
      setFormulas(data || []);
    } catch (e) {
      setError(e as FormulaError);
    } finally {
      setLoading(false);
    }
  };

  const saveFormula = async (formula: Omit<SavedFormula, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('saved_formulas')
        .insert([{ ...formula, user_id: userId }])
        .select()
        .single();

      if (error) throw { message: error.message };
      setFormulas([data, ...formulas]);
      return data;
    } catch (e) {
      const error = e as FormulaError;
      setError(error);
      throw error;
    }
  };

  const deleteFormula = async (formulaId: string) => {
    try {
      const { error } = await supabase
        .from('saved_formulas')
        .delete()
        .eq('id', formulaId)
        .eq('user_id', userId);

      if (error) throw { message: error.message };
      setFormulas(formulas.filter(f => f.id !== formulaId));
    } catch (e) {
      const error = e as FormulaError;
      setError(error);
      throw error;
    }
  };

  const updateFormula = async (formulaId: string, updates: Partial<SavedFormula>) => {
    try {
      const { data, error } = await supabase
        .from('saved_formulas')
        .update(updates)
        .eq('id', formulaId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw { message: error.message };
      setFormulas(formulas.map(f => f.id === formulaId ? data : f));
      return data;
    } catch (e) {
      const error = e as FormulaError;
      setError(error);
      throw error;
    }
  };

  useEffect(() => {
    if (userId) {
      loadFormulas();
    }
  }, [userId]);

  return {
    formulas,
    loading,
    error,
    saveFormula,
    deleteFormula,
    updateFormula,
    refreshFormulas: loadFormulas
  };
};
