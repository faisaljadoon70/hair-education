'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { levelColors } from '@/components/levelwheel/levelData';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedLevel: number | null;
  mixedWithLevel?: number;
}

interface LevelDetails {
  level: number;
  description: string;
  underlying_pigment: string;
  neutralizing_tone: string;
  tips?: string[];
}

const renderColorDot = (color: string) => {
  // Handle multiple colors (e.g., "Orange/Yellow")
  const colors = color.split('/');
  return (
    <div className="flex gap-1">
      {colors.map((c, index) => (
        <div
          key={index}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: c.toLowerCase().trim() }}
        />
      ))}
    </div>
  );
};

export default function MobileBottomSheet({ isOpen, onClose, selectedLevel, mixedWithLevel }: Props) {
  const [details, setDetails] = useState<LevelDetails | null>(null);
  const [mixedDetails, setMixedDetails] = useState<LevelDetails | null>(null);
  const [sheetState, setSheetState] = useState<'half' | 'full'>('half');

  useEffect(() => {
    const fetchLevelDetails = async (level: number) => {
      try {
        const { data, error } = await supabase
          .from('hair_levels')
          .select('*')
          .eq('level', level)
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching level details:', error);
        return null;
      }
    };

    const loadDetails = async () => {
      if (selectedLevel) {
        const details = await fetchLevelDetails(selectedLevel);
        setDetails(details);

        if (mixedWithLevel) {
          const mixedDetails = await fetchLevelDetails(mixedWithLevel);
          setMixedDetails(mixedDetails);
        }
      }
    };

    loadDetails();
  }, [selectedLevel, mixedWithLevel]);

  if (!isOpen || !selectedLevel) return null;

  const getMixedResult = () => {
    if (!mixedWithLevel) return null;
    const avgLevel = Math.round((selectedLevel + mixedWithLevel) / 2);
    return {
      level: avgLevel,
      color: levelColors[avgLevel as keyof typeof levelColors]
    };
  };

  const mixedResult = getMixedResult();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ 
              y: sheetState === 'half' ? '50%' : '15%'
            }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 top-0 bottom-0 bg-white rounded-t-2xl shadow-lg"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 50) {
                if (sheetState === 'full') {
                  setSheetState('half');
                } else {
                  onClose();
                }
              } else if (info.offset.y < -50) {
                setSheetState('full');
              }
            }}
          >
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />

            {/* Content */}
            <div className="px-4 py-2 overflow-y-auto max-h-[calc(100vh-2rem)] pb-safe">
              {mixedResult ? (
                // Show mixing result
                <div>
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-8 h-8 rounded-full mr-3"
                      style={{ backgroundColor: mixedResult.color }}
                    />
                    <h2 className="text-xl font-semibold">Level {mixedResult.level}</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: levelColors[selectedLevel as keyof typeof levelColors] }}
                      />
                      <p>Level {selectedLevel}</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-12 h-12 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: levelColors[mixedWithLevel as keyof typeof levelColors] }}
                      />
                      <p>Level {mixedWithLevel}</p>
                    </div>
                  </div>
                  {details && mixedDetails && (
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Mixed Result Properties:</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">Description</h4>
                          <p className="text-sm text-gray-600">{details.description} + {mixedDetails.description}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">Underlying Pigment</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{details.underlying_pigment} / {mixedDetails.underlying_pigment}</span>
                            {renderColorDot(`${details.underlying_pigment}/${mixedDetails.underlying_pigment}`)}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">Neutralizing Tone</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{details.neutralizing_tone} / {mixedDetails.neutralizing_tone}</span>
                            {renderColorDot(`${details.neutralizing_tone}/${mixedDetails.neutralizing_tone}`)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Show single level details
                details && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-8 h-8 rounded-full mr-3"
                        style={{ backgroundColor: levelColors[selectedLevel as keyof typeof levelColors] }}
                      />
                      <h2 className="text-xl font-semibold">Level {selectedLevel} Details</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Description</h3>
                        <p className="text-sm text-gray-600">{details.description}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Underlying Pigment</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{details.underlying_pigment}</span>
                          {renderColorDot(details.underlying_pigment)}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Neutralizing Tone</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{details.neutralizing_tone}</span>
                          {renderColorDot(details.neutralizing_tone)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Application Tips</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Best for: {details.description} base colors</li>
                          <li>• Use {details.neutralizing_tone} to neutralize</li>
                          <li>• Natural level contains {details.underlying_pigment}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
