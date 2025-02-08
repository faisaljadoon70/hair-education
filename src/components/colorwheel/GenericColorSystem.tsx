import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ColorLevel {
  id: string;
  level_number: number;
  description: string;
  underlying_pigment: string;
  lifting_capability: string;
  general_notes: string;
}

interface ColorGuideline {
  id: string;
  starting_level: number;
  target_level: number;
  developer_strength: 'low' | 'medium' | 'high' | 'ultra';
  processing_time_range: {
    min: number;
    max: number;
  };
  precautions: string[];
  recommendations: string[];
}

interface GenericColorSystemProps {
  onLevelSelect: (level: ColorLevel) => void;
  onGuidelineSelect?: (guideline: ColorGuideline) => void;
}

export default function GenericColorSystem({ onLevelSelect, onGuidelineSelect }: GenericColorSystemProps) {
  const [levels, setLevels] = useState<ColorLevel[]>([]);
  const [guidelines, setGuidelines] = useState<ColorGuideline[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<ColorLevel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadColorSystem() {
      try {
        console.log('Fetching color system data...');
        
        const [levelsResponse, guidelinesResponse] = await Promise.all([
          supabase.from('hair_levels').select('*').order('level_number'),
          supabase.from('level_guidelines').select('*')
        ]);

        console.log('Levels response:', levelsResponse);
        console.log('Guidelines response:', guidelinesResponse);

        if (levelsResponse.error) {
          console.error('Error fetching levels:', levelsResponse.error);
          throw levelsResponse.error;
        }
        if (guidelinesResponse.error) {
          console.error('Error fetching guidelines:', guidelinesResponse.error);
          throw guidelinesResponse.error;
        }

        setLevels(levelsResponse.data || []);
        setGuidelines(guidelinesResponse.data || []);
      } catch (err) {
        console.error('Error in loadColorSystem:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load color system';
        setError(`Error: ${errorMessage}. Please check console for details.`);
      } finally {
        setLoading(false);
      }
    }

    loadColorSystem();
  }, []);

  const handleLevelChange = (levelId: string) => {
    const level = levels.find(l => l.id === levelId);
    if (level) {
      setSelectedLevel(level);
      onLevelSelect(level);
    }
  };

  const findGuidelines = (startLevel: number, targetLevel: number) => {
    return guidelines.find(g => 
      g.starting_level === startLevel && g.target_level === targetLevel
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading color system: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Legal Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <h4 className="font-semibold mb-2">Educational Purpose Only</h4>
        <p>
          This color system is for educational purposes only and provides general guidance
          based on universal hair color principles. Results may vary significantly based on:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Individual hair characteristics</li>
          <li>Previous chemical treatments</li>
          <li>Product selection and application</li>
          <li>Professional expertise</li>
        </ul>
        <p className="mt-2 font-medium">
          Always consult a licensed professional and follow product manufacturers' instructions.
        </p>
      </div>

      {/* Color Level Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Hair Color Level
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
          onChange={(e) => handleLevelChange(e.target.value)}
          value={selectedLevel?.id || ''}
        >
          <option value="">Choose a level...</option>
          {levels.map((level) => (
            <option key={level.id} value={level.id}>
              Level {level.level_number} - {level.description}
            </option>
          ))}
        </select>

        {/* Selected Level Details */}
        {selectedLevel && (
          <div className="mt-4 space-y-3">
            <div className="bg-gray-50 rounded-md p-3">
              <h4 className="font-medium text-gray-900">
                Level {selectedLevel.level_number} - {selectedLevel.description}
              </h4>
              <div className="mt-2 space-y-2 text-sm text-gray-600">
                <p>Underlying Pigment: {selectedLevel.underlying_pigment}</p>
                <p>Lifting Capability: {selectedLevel.lifting_capability}</p>
                {selectedLevel.general_notes && (
                  <p className="text-sm italic">{selectedLevel.general_notes}</p>
                )}
              </div>
            </div>

            {/* Color Guidelines */}
            <div className="bg-gray-50 rounded-md p-3">
              <h4 className="font-medium text-gray-900 mb-2">Processing Guidelines</h4>
              <div className="space-y-2">
                {guidelines
                  .filter(g => g.starting_level === selectedLevel.level_number)
                  .map(guideline => (
                    <div 
                      key={guideline.id} 
                      className="border border-gray-200 rounded p-2 hover:bg-white transition-colors"
                      onClick={() => onGuidelineSelect?.(guideline)}
                    >
                      <p className="font-medium">
                        Level {guideline.starting_level} → Level {guideline.target_level}
                      </p>
                      <p className="text-sm text-gray-600">
                        Developer: {guideline.developer_strength.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Processing Time: {guideline.processing_time_range.min}-{guideline.processing_time_range.max} minutes
                      </p>
                      {guideline.precautions.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-red-600">Precautions:</p>
                          <ul className="text-xs text-red-600 list-disc list-inside">
                            {guideline.precautions.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
