-- Create enums for various color system attributes
CREATE TYPE hair_color_type AS ENUM ('permanent', 'semi-permanent', 'demi-permanent', 'temporary');
CREATE TYPE developer_strength AS ENUM ('low', 'medium', 'high', 'ultra');

-- Generic color levels
CREATE TABLE color_levels (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    level_number INTEGER NOT NULL,
    description TEXT NOT NULL,
    underlying_pigment TEXT NOT NULL,
    lifting_capability TEXT,
    general_notes TEXT,
    processing_time_range VARCHAR(50),
    recommended_developer VARCHAR(100),
    porosity_considerations TEXT,
    common_challenges TEXT,
    best_practices TEXT,
    color_balance_tips TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Generic color formulation guidelines
CREATE TABLE color_guidelines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    starting_level INTEGER NOT NULL,
    target_level INTEGER NOT NULL,
    developer_strength developer_strength NOT NULL,
    processing_time_range JSONB NOT NULL, -- {"min": 30, "max": 45}
    precautions TEXT[],
    recommendations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_levels CHECK (starting_level >= 1 AND starting_level <= 10 AND target_level >= 1 AND target_level <= 10)
);

-- Insert generic color levels
INSERT INTO color_levels (level_number, description, underlying_pigment, lifting_capability, general_notes) VALUES
(1, 'Black', 'Blue', 'Difficult to lift', 'Darkest level, requires strong developer for lifting'),
(2, 'Brown/Black', 'Blue-Violet', 'Very resistant', 'Deep brown with cool undertones'),
(3, 'Dark Brown', 'Violet', 'Resistant', 'Rich brown with balanced undertones'),
(4, 'Medium Brown', 'Red-Violet', 'Moderately resistant', 'Natural-looking medium brown'),
(5, 'Light Brown', 'Red-Orange', 'Moderate', 'Warm brown with golden undertones'),
(6, 'Dark Blonde', 'Orange-Red', 'Moderate to easy', 'Rich blonde with warm undertones'),
(7, 'Medium Blonde', 'Orange', 'Easy', 'Natural blonde with golden tones'),
(8, 'Light Blonde', 'Yellow-Orange', 'Very easy', 'Bright blonde with yellow undertones'),
(9, 'Very Light Blonde', 'Yellow', 'Ultra easy', 'Pale blonde with minimal undertones'),
(10, 'Lightest Blonde', 'Pale Yellow', 'Extremely easy', 'Lightest natural level');

-- Update example data for Level 9
UPDATE color_levels
SET 
    processing_time_range = '35-45 minutes',
    recommended_developer = '30-40 volume depending on starting level',
    porosity_considerations = 'High porosity common at this level. May require protein treatments before coloring.',
    common_challenges = 'Brassiness, uneven lift, damage risk',
    best_practices = 'Use bond builder, apply to mid-lengths first, then roots',
    color_balance_tips = 'Use violet/blue based toners to neutralize yellow/gold'
WHERE level_number = 9;

-- Insert generic guidelines
INSERT INTO color_guidelines (starting_level, target_level, developer_strength, processing_time_range, precautions, recommendations) VALUES
-- Darkening
(8, 6, 'low', '{"min": 25, "max": 35}', 
  ARRAY['Perform strand test', 'Check for previous color treatments'],
  ARRAY['Use warm tones to ensure coverage', 'Consider adding neutral tone for balance']),
(7, 5, 'low', '{"min": 25, "max": 35}', 
  ARRAY['Check for color buildup', 'Assess hair porosity'],
  ARRAY['Add neutral tone for natural results', 'Monitor processing carefully']),

-- Lifting
(5, 7, 'medium', '{"min": 30, "max": 40}', 
  ARRAY['Perform strand test', 'Check scalp sensitivity'],
  ARRAY['Pre-lighten if necessary', 'Use appropriate toner after lifting']),
(4, 6, 'medium', '{"min": 30, "max": 40}', 
  ARRAY['Test hair strength', 'Check previous treatments'],
  ARRAY['Consider two-step process', 'Monitor lifting process']),

-- Major Changes
(3, 7, 'high', '{"min": 35, "max": 45}', 
  ARRAY['Multiple sessions may be needed', 'Assess hair condition carefully'],
  ARRAY['Plan multi-session approach', 'Include treatment plan']),
(2, 6, 'high', '{"min": 35, "max": 45}', 
  ARRAY['Professional assessment required', 'Multiple sessions needed'],
  ARRAY['Start with gentle lifting', 'Include bond builders']);

-- Add RLS policies
ALTER TABLE color_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_guidelines ENABLE ROW LEVEL SECURITY;

-- Everyone can read
CREATE POLICY "Everyone can read color levels" ON color_levels FOR SELECT USING (true);
CREATE POLICY "Everyone can read color guidelines" ON color_guidelines FOR SELECT USING (true);

-- Only authenticated users can modify
CREATE POLICY "Authenticated users can modify color levels" ON color_levels
    FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify color guidelines" ON color_guidelines
    FOR ALL USING (auth.role() = 'authenticated');

-- Add Display-P3 color space support
ALTER TABLE mobile_shade_card
ADD COLUMN IF NOT EXISTS display_p3_r NUMERIC,
ADD COLUMN IF NOT EXISTS display_p3_g NUMERIC,
ADD COLUMN IF NOT EXISTS display_p3_b NUMERIC,
ADD COLUMN IF NOT EXISTS color_space VARCHAR DEFAULT 'srgb',
ADD COLUMN IF NOT EXISTS color_profile JSONB;

-- Add color calibration metadata
ALTER TABLE mobile_shade_card
ADD COLUMN IF NOT EXISTS color_calibration_data JSONB,
ADD COLUMN IF NOT EXISTS device_specific_adjustments JSONB;

-- Add comment explaining the color space columns
COMMENT ON COLUMN mobile_shade_card.display_p3_r IS 'Display-P3 red channel value (0-1)';
COMMENT ON COLUMN mobile_shade_card.display_p3_g IS 'Display-P3 green channel value (0-1)';
COMMENT ON COLUMN mobile_shade_card.display_p3_b IS 'Display-P3 blue channel value (0-1)';
