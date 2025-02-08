-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
DO $$ BEGIN
    CREATE TYPE developer_strength AS ENUM ('low', 'medium', 'high', 'ultra');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create color levels table
CREATE TABLE IF NOT EXISTS public.color_levels (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    level_number INTEGER NOT NULL,
    description TEXT NOT NULL,
    underlying_pigment TEXT NOT NULL,
    lifting_capability TEXT,
    general_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create color guidelines table
CREATE TABLE IF NOT EXISTS public.color_guidelines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    starting_level INTEGER NOT NULL,
    target_level INTEGER NOT NULL,
    developer_strength developer_strength NOT NULL,
    processing_time_range JSONB NOT NULL,
    precautions TEXT[],
    recommendations TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_levels CHECK (starting_level >= 1 AND starting_level <= 10 AND target_level >= 1 AND target_level <= 10)
);

-- Create level theory table
CREATE TABLE IF NOT EXISTS public.level_theory (
    level_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    key_points TEXT[]
);

-- Insert base color levels
INSERT INTO public.color_levels (level_number, description, underlying_pigment, lifting_capability, general_notes)
VALUES 
    (1, 'Black', 'Blue-black', 'Difficult to lift', 'Darkest level, requires strong developer for lifting'),
    (2, 'Darkest Brown', 'Blue', 'Very resistant', 'Deep brown with cool undertones'),
    (3, 'Dark Brown', 'Blue-red', 'Resistant', 'Rich brown with balanced undertones'),
    (4, 'Medium Brown', 'Red', 'Moderately resistant', 'Natural-looking medium brown'),
    (5, 'Light Brown', 'Red-orange', 'Moderate', 'Warm brown with golden undertones'),
    (6, 'Dark Blonde', 'Orange', 'Moderate to easy', 'Rich blonde with warm undertones'),
    (7, 'Medium Blonde', 'Orange-yellow', 'Easy', 'Natural blonde with golden tones'),
    (8, 'Light Blonde', 'Yellow', 'Very easy', 'Bright blonde with yellow undertones'),
    (9, 'Very Light Blonde', 'Pale yellow', 'Ultra easy', 'Pale blonde with minimal undertones'),
    (10, 'Lightest Blonde', 'Pale yellow-white', 'Extremely easy', 'Lightest natural level')
ON CONFLICT (id) DO NOTHING;

-- Ensure level_theory data is preserved
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
    2,
    'Level 2 Hair Color Theory',
    'Level 2, known as Darkest Brown, represents one of the deepest natural hair colors. It contains a high concentration of eumelanin (dark pigment) with minimal pheomelanin (red/brown pigment). Understanding Level 2 is crucial for achieving dark, rich colors and managing the lifting process effectively.',
    ARRAY['Contains high concentration of natural dark pigments', 'Requires careful consideration when lifting or lightening', 'Often used as a base for creating deep, rich colors', 'Important for understanding dark hair color formulation']
)
ON CONFLICT (level_id) DO UPDATE 
SET 
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    key_points = EXCLUDED.key_points;

-- Insert basic guidelines
INSERT INTO public.color_guidelines 
    (starting_level, target_level, developer_strength, processing_time_range, precautions, recommendations)
VALUES
    (8, 6, 'low', '{"min": 25, "max": 35}', 
        ARRAY['Perform strand test', 'Check for previous color treatments'],
        ARRAY['Use warm tones to ensure coverage', 'Consider adding neutral tone for balance']),
    (7, 5, 'low', '{"min": 25, "max": 35}', 
        ARRAY['Check for color buildup', 'Assess hair porosity'],
        ARRAY['Add neutral tone for natural results', 'Monitor processing carefully']),
    (5, 7, 'medium', '{"min": 30, "max": 40}', 
        ARRAY['Perform strand test', 'Check scalp sensitivity'],
        ARRAY['Pre-lighten if necessary', 'Use appropriate toner after lifting'])
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.color_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.color_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.level_theory ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.color_levels
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.color_guidelines
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.level_theory
    FOR SELECT USING (true);
