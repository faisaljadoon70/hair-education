'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { levelColors } from '@/components/levelwheel/levelData';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  onLevelClick: (level: number) => void;
}

interface HairLevel {
  level: number;
  description: string;
  underlying_pigment: string;
  neutralizing_tone: string;
  tips?: string[];
}

export default function MobileWheelComponent({ onLevelClick }: Props) {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [hairLevels, setHairLevels] = useState<HairLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const radius = 120;
  const centerX = 154;
  const centerY = 154;

  const handleLevelClick = (level: number) => {
    onLevelClick(level);
  };

  useEffect(() => {
    const fetchHairLevels = async () => {
      try {
        const { data, error } = await supabase
          .from('hair_levels')
          .select('*')
          .order('level', { ascending: true });

        if (error) throw error;
        setHairLevels(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHairLevels();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center mt-24">
        <div className="relative w-[308px] h-[308px]">
          <svg
            width="308"
            height="308"
            viewBox="0 0 308 308"
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
                    onClick={() => handleLevelClick(level.level)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx="0"
                      cy={-radius}
                      r="21"
                      fill={levelColors[level.level - 1] || '#000'}
                      className="transition-transform duration-200"
                      style={{
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <text
                      x="0"
                      y={-radius}
                      textAnchor="middle"
                      dy=".3em"
                      fill={level.level <= 5 ? 'white' : 'black'}
                      className="text-sm font-medium select-none"
                    >
                      {level.level}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-8">
        Click a color to get more info
      </p>
    </div>
  );
}
