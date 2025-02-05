-- First, drop the table if it exists
DROP TABLE IF EXISTS hair_levels;

-- Create the hair_levels table
CREATE TABLE hair_levels (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    level INTEGER NOT NULL,
    description TEXT NOT NULL,
    underlying_pigment TEXT NOT NULL,
    neutralizing_tone TEXT NOT NULL,
    example_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the hair levels data
INSERT INTO hair_levels (level, description, underlying_pigment, neutralizing_tone) VALUES
(1, 'Black', 'None/Blue-Black', 'N/A'),
(2, 'Darkest Brown', 'Blue', 'Orange'),
(3, 'Dark Brown', 'Blue/Red', 'Orange/Green'),
(4, 'Medium Brown', 'Red', 'Green'),
(5, 'Light Brown', 'Red/Orange', 'Green/Blue'),
(6, 'Dark Blonde', 'Orange', 'Blue'),
(7, 'Medium Blonde', 'Orange/Yellow', 'Blue/Violet'),
(8, 'Light Blonde', 'Yellow', 'Violet'),
(9, 'Very Light Blonde', 'Pale Yellow', 'Violet'),
(10, 'Lightest Blonde', 'Yellow/Pale Yellow', 'Violet');

-- Enable Row Level Security (RLS)
ALTER TABLE hair_levels ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to read hair_levels
CREATE POLICY "Allow public read access to hair_levels"
    ON hair_levels
    FOR SELECT
    TO authenticated
    USING (true);

-- Create a policy that allows anon to read hair_levels
CREATE POLICY "Allow public read access to hair_levels for anon"
    ON hair_levels
    FOR SELECT
    TO anon
    USING (true);
