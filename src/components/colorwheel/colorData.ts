import { supabase } from '@/lib/supabase';
import type { HairLevel, Formula, PracticeResult } from './types';

// Professional hair color level system colors
export const levelColors = {
    1: "#010101", // Level 1 - Black
    2: "#1C1410", // Level 2 - Darkest Brown
    3: "#2A1810", // Level 3 - Dark Brown
    4: "#4A2D1C", // Level 4 - Medium Brown
    5: "#6B4435", // Level 5 - Light Brown
    6: "#8B6A4F", // Level 6 - Dark Blonde
    7: "#B68E68", // Level 7 - Medium Blonde
    8: "#D4B190", // Level 8 - Light Blonde
    9: "#E8C9A4", // Level 9 - Very Light Blonde
    10: "#F2DFC4" // Level 10 - Lightest Blonde/Platinum
};

export async function getHairLevels() {
    const { data, error } = await supabase
        .from('hair_levels')
        .select('*')
        .order('level');
    
    if (error) {
        console.error('Error fetching hair levels:', error);
        throw error;
    }
    return data as HairLevel[];
}

export async function saveFormula(formula: Omit<Formula, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('formulas')
        .insert(formula)
        .select()
        .single();
    
    if (error) {
        console.error('Error saving formula:', error);
        throw error;
    }
    return data;
}

export async function savePracticeResult(result: Omit<PracticeResult, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('practice_results')
        .insert(result)
        .select()
        .single();
    
    if (error) {
        console.error('Error saving practice result:', error);
        throw error;
    }
    return data;
}

// Get formulas for a specific user
export async function getUserFormulas(userId: string) {
    const { data, error } = await supabase
        .from('formulas')
        .select('*')
        .eq('created_by', userId)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching user formulas:', error);
        throw error;
    }
    return data as Formula[];
}

// Get practice results for a specific formula
export async function getFormulaResults(formulaId: string) {
    const { data, error } = await supabase
        .from('practice_results')
        .select('*')
        .eq('formula_id', formulaId)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching formula results:', error);
        throw error;
    }
    return data as PracticeResult[];
}
