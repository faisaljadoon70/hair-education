-- Rename tables
ALTER TABLE color_levels RENAME TO hair_levels;
ALTER TABLE color_guidelines RENAME TO level_guidelines;

-- Update enum type
ALTER TYPE hair_color_type RENAME TO hair_level_type;

-- Drop old policies
DROP POLICY IF EXISTS "Everyone can read color levels" ON hair_levels;
DROP POLICY IF EXISTS "Everyone can read color guidelines" ON level_guidelines;
DROP POLICY IF EXISTS "Authenticated users can modify color levels" ON hair_levels;
DROP POLICY IF EXISTS "Authenticated users can modify color guidelines" ON level_guidelines;

-- Create new policies with updated names
CREATE POLICY "Everyone can read hair levels" ON hair_levels FOR SELECT USING (true);
CREATE POLICY "Everyone can read level guidelines" ON level_guidelines FOR SELECT USING (true);

CREATE POLICY "Authenticated users can modify hair levels" ON hair_levels
    FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify level guidelines" ON level_guidelines
    FOR ALL USING (auth.role() = 'authenticated');

-- Update column comments to reflect new terminology
COMMENT ON TABLE hair_levels IS 'Hair level system (formerly color levels)';
COMMENT ON TABLE level_guidelines IS 'Hair level guidelines (formerly color guidelines)';

-- Update any references in the code
UPDATE hair_levels
SET general_notes = REPLACE(general_notes, 'color', 'level')
WHERE general_notes LIKE '%color%';
