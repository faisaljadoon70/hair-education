-- Add new columns for formula builder
ALTER TABLE saved_formulas
ADD COLUMN starting_tone text,
ADD COLUMN target_tone text,
ADD COLUMN hair_porosity numeric(3,1);

-- Add comments for clarity
COMMENT ON COLUMN saved_formulas.starting_tone IS 'The initial tone of the hair (e.g., Blue Black, Violet Black)';
COMMENT ON COLUMN saved_formulas.target_tone IS 'The desired tone of the hair (e.g., Natural Light, Light Brown)';
COMMENT ON COLUMN saved_formulas.hair_porosity IS 'Hair porosity value from 0.0 to 10.0';
