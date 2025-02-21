'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import MobileToneCard from './MobileToneCard';

interface Tone {
  id: string;
  name: string;
  hex_color: string;
  primary_tone: number;
}

interface MobileToneListProps {
  level: number;
  isVisible: boolean;
}

export default function MobileToneList({ level, isVisible }: MobileToneListProps) {
  const [tones, setTones] = useState<Tone[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchTones() {
      if (!isVisible) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('mobile_shade_card')
        .select('id, name, hex_color, primary_tone')
        .eq('level', level)
        .order('primary_tone');

      if (error) {
        console.error('Error fetching tones:', error);
      } else if (data) {
        setTones(data);
      }
      setLoading(false);
    }

    fetchTones();
  }, [level, isVisible, supabase]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto py-3 pl-2"
      >
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-pink-500 rounded-full animate-spin border-t-transparent" />
          </div>
        ) : (
          <div className="flex">
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
      </motion.div>
    </AnimatePresence>
  );
}
