'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import MobileToneCard from './MobileToneCard';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface MobileTonesBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  levelName: string;
}

interface Tone {
  id: string;
  name: string;
  hex_color: string;
  rgb_r: number;
  rgb_g: number;
  rgb_b: number;
  primary_tone: number;
}

const ADDITIONAL_TONES = {
  '1.11': { name: 'Chocolate Black', hex_color: '#2C1A14' },
  '1.12': { name: 'Mocha Black', hex_color: '#261815' },
  '1.13': { name: 'Darkest Brown', hex_color: '#231716' }
};

export default function MobileTonesBottomSheet({
  isOpen,
  onClose,
  level,
  levelName
}: MobileTonesBottomSheetProps) {
  const [tones, setTones] = useState<Tone[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchTones() {
      if (!isOpen) return;
      
      setLoading(true);
      console.log('Fetching tones for level:', level);
      const { data, error } = await supabase
        .from('mobile_shade_card')
        .select(`
          id, 
          name, 
          hex_color, 
          rgb_r,
          rgb_g,
          rgb_b,
          primary_tone
        `)
        .eq('level', level)
        .order('primary_tone');

      if (error) {
        console.error('Error fetching tones:', error);
      } else if (data) {
        console.log('Received data from Supabase:', data);
        // Add the additional tones for level 1
        if (level === 1) {
          const additionalTones = Object.entries(ADDITIONAL_TONES).map(([key, value], index) => {
            const rgb = {
              r: parseInt(value.hex_color.substr(1, 2), 16),
              g: parseInt(value.hex_color.substr(3, 2), 16),
              b: parseInt(value.hex_color.substr(5, 2), 16)
            };
            
            return {
              id: `additional-${index}`,
              name: value.name,
              hex_color: value.hex_color,
              rgb_r: rgb.r,
              rgb_g: rgb.g,
              rgb_b: rgb.b,
              primary_tone: parseInt(key.split('.')[1])
            };
          });
          setTones([...data, ...additionalTones].sort((a, b) => a.primary_tone - b.primary_tone));
        } else {
          setTones(data);
        }
      }
      setLoading(false);
    }

    fetchTones();
  }, [level, isOpen, supabase]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl p-4 max-h-[85vh] overflow-y-auto z-40"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">
                Level {level} - {levelName}
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-800"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="min-h-[200px]">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
                </div>
              ) : tones.length === 0 ? (
                <div className="flex justify-center items-center h-32 text-white">
                  No tones found for this level
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {tones.map((tone) => (
                    <MobileToneCard
                      key={tone.id}
                      toneNumber={`${level}.${tone.primary_tone}`}
                      name={tone.name}
                      hexColor={tone.hex_color}
                      rgbR={tone.rgb_r}
                      rgbG={tone.rgb_g}
                      rgbB={tone.rgb_b}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
