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

  // Center coordinates
  const centerX = 154;
  const centerY = 154;
  
  // Inner circle radius (based on inset of 42px from 330px container)
  const innerCircleRadius = 115; // Adjusted to match inner background circle exactly
  
  // Color circle ring radius - exactly matching inner circle
  const colorRingRadius = innerCircleRadius;
  
  // Color circle size
  const colorCircleRadius = 20;

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
    <div className="relative w-full flex flex-col items-center justify-center" style={{ height: '500px', paddingBottom: '40px' }}>
      <div className="relative w-[330px] h-[330px]">
        {/* Background circles */}
        <div className="absolute rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border-[25px] border-gray-200/90 shadow-[0_0_30px_rgba(0,0,0,0.08)]"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
        />
        
        {/* Inner background circle */}
        <div className="absolute rounded-full bg-white border-[12px] border-gray-200/80 shadow-inner"
          style={{
            inset: '42px'
          }}
        />

        {/* Center pink dot with white ring - matching desktop style */}
        <div 
          className="absolute rounded-full bg-white shadow-sm"
          style={{
            width: '16px',
            height: '16px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10 // Ensure dot is above guide lines
          }}
        >
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-pink-400 to-pink-500">
            <div className="absolute inset-0 rounded-full bg-white/20" />
          </div>
        </div>

        {/* SVG container for circles */}
        <svg
          width="308"
          height="308"
          viewBox="0 0 308 308"
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Level circles positioned around pink dot */}
          {hairLevels.map((level, index) => {
            // Calculate angle based on position (5 circles in top half, 5 in bottom half)
            let angle;
            if (index < 5) {
              // Top semicircle: distribute 5 circles from -160° to -20° (more spread out)
              angle = -160 + (index * 35);
            } else {
              // Bottom semicircle: distribute 5 circles from 20° to 160° (more spread out)
              angle = 20 + ((index - 5) * 35);
            }
            
            // Calculate position using inner circle radius - no offsets needed
            const x = centerX + innerCircleRadius * Math.cos((angle * Math.PI) / 180);
            const y = centerY + innerCircleRadius * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.g
                key={level.level}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLevelClick(level.level)}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: (index + 1) * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {/* Shadow circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={colorCircleRadius + 2}
                  className="fill-gray-200/15"
                  filter="url(#shadow-filter)"
                  transform={`translate(2, 2)`}
                />
                {/* Main color circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={colorCircleRadius}
                  fill={levelColors[level.level - 1]}
                  className="filter drop-shadow-xl transition-transform duration-200"
                  stroke="white"
                  strokeWidth="1.5"
                />
                {/* Circle highlight with enhanced gradient */}
                <circle
                  cx={x}
                  cy={y}
                  r={colorCircleRadius}
                  fill={`url(#highlight-${level.level})`}
                  className="opacity-25"
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={level.level <= 2 ? '#fff' : '#000'}
                  className="text-sm font-medium select-none"
                >
                  {level.level}
                </text>
              </motion.g>
            );
          })}

          {/* Enhanced gradients and filters */}
          <defs>
            <radialGradient id="lineGradient">
              <stop offset="0%" stopColor="#E5E7EB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E5E7EB" stopOpacity="0.1" />
            </radialGradient>
            <filter id="shadow-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feFlood floodColor="rgba(0,0,0,0.25)" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {hairLevels.map((level) => (
              <radialGradient
                key={`highlight-${level.level}`}
                id={`highlight-${level.level}`}
                cx="30%"
                cy="30%"
                r="70%"
              >
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>
        </svg>
      </div>

      {/* Instruction text at bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="font-bold text-gray-700 text-base tracking-wide">
          Click color to see detail
        </span>
      </div>
    </div>
  );
}
