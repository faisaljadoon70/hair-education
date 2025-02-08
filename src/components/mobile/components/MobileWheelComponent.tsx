'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { levelColors } from '@/components/levelwheel/levelData';
import type { HairLevel } from '@/components/levelwheel/types';
import { supabase } from '@/lib/supabaseClient';

export default function MobileWheelComponent() {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [hairLevels, setHairLevels] = useState<HairLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const radius = 160;
  const centerX = 220;
  const centerY = 220;

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const { data: levels, error: dbError } = await supabase
          .from('hair_levels')
          .select('*')
          .order('level');

        if (dbError) throw dbError;
        if (!levels?.length) throw new Error('No hair levels found');

        setHairLevels(levels);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hair levels');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative w-[440px] h-[440px]">
      <motion.svg
        width="440"
        height="440"
        viewBox="0 0 440 440"
        style={{ transform: `rotate(${currentRotation}deg)` }}
      >
        <g transform={`translate(${centerX}, ${centerY})`}>
          {hairLevels.map((level, index) => {
            const angle = (index * 360) / hairLevels.length;
            const isHovered = hoveredLevel === level.level;
            
            return (
              <g
                key={level.level}
                transform={`rotate(${angle})`}
                onMouseEnter={() => setHoveredLevel(level.level)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                <circle
                  cx="0"
                  cy={-radius}
                  r="30"
                  fill={levelColors[level.level - 1] || '#000'}
                  className="transition-transform duration-200 cursor-pointer"
                  style={{
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <text
                  x="0"
                  y={-radius}
                  textAnchor="middle"
                  dy=".3em"
                  fill="#fff"
                  className="text-sm pointer-events-none select-none"
                >
                  {level.level}
                </text>
              </g>
            );
          })}
        </g>
      </motion.svg>
    </div>
  );
}
