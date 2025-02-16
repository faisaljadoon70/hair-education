// Function to get a color based on hair level (1-10)
export const getLevelColor = (level: number): string => {
  // Color mapping for hair levels
  const colorMap: { [key: number]: string } = {
    1: '#000000',   // Level 1 - Black
    2: '#1a1a1a',   // Level 2 - Darkest Brown
    3: '#2a2a2a',   // Level 3 - Dark Brown
    4: '#3a3a3a',   // Level 4 - Medium Brown
    5: '#4a4a4a',   // Level 5 - Light Brown
    6: '#5a5a5a',   // Level 6 - Dark Blonde
    7: '#6a6a6a',   // Level 7 - Medium Blonde
    8: '#7a7a7a',   // Level 8 - Light Blonde
    9: '#8a8a8a',   // Level 9 - Very Light Blonde
    10: '#9a9a9a',  // Level 10 - Lightest Blonde
  };

  // Round the level to the nearest whole number
  const roundedLevel = Math.round(level);
  
  // Return the color for the level, or default to black if level is out of range
  return colorMap[roundedLevel] || '#000000';
};
