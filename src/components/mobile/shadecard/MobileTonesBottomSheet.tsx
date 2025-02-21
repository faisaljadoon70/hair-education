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
      const { data, error } = await supabase
        .from('mobile_shade_card')
        .select('id, name, hex_color, primary_tone')
        .eq('level', level)
        .order('primary_tone');

      if (error) {
        console.error('Error fetching tones:', error);
      } else if (data) {
        // Add the additional tones for level 1
        if (level === 1) {
          const additionalTones = Object.entries(ADDITIONAL_TONES).map(([key, value], index) => ({
            id: `additional-${index}`,
            name: value.name,
            hex_color: value.hex_color,
            primary_tone: parseInt(key.split('.')[1])
          }));
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
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl shadow-xl"
            style={{ maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-medium text-white">Level {level} - {levelName}</h2>
              <button onClick={onClose} className="p-1">
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 60px)' }}>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-pink-500 rounded-full animate-spin border-t-transparent" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {tones.map((tone) => (
                    <MobileToneCard
                      key={tone.id}
                      toneNumber={`${level}.${tone.primary_tone}`}
                      name={tone.name}
                      hexColor={tone.hex_color}
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
