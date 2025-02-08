-- First clear any existing Level 1 data
DELETE FROM hair_terminology WHERE 1 = ANY(related_levels);
DELETE FROM level_quizzes WHERE level_id = 1;

-- Add Level 1 Terminology (fixed array syntax)
INSERT INTO hair_terminology (term, definition, related_levels, category) VALUES
('Eumelanin', 'The pigment responsible for dark hair colors, particularly abundant in Level 1 hair', ARRAY[1]::integer[], 'Chemical'),
('Maximum Pigmentation', 'The highest concentration of natural color molecules found in hair', ARRAY[1]::integer[], 'Color Theory'),
('Natural Black', 'The darkest natural hair color with maximum melanin content', ARRAY[1]::integer[], 'Color Theory'),
('Lifting Resistance', 'The difficulty in lightening very dark hair due to pigment density', ARRAY[1]::integer[], 'Technical'),
('Color Saturation', 'The intensity and depth of natural hair color', ARRAY[1]::integer[], 'Color Theory');

-- Let's verify the data was inserted correctly
SELECT term, definition, related_levels, category 
FROM hair_terminology 
WHERE 1 = ANY(related_levels);
