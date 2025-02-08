-- First clear any existing Level 1 data
DELETE FROM hair_terminology WHERE 1 = ANY(related_levels);
DELETE FROM level_quizzes WHERE level_id = 1;

-- Add Level 1 Theory (keep as is since it's working)
INSERT INTO level_theory (level_id, title, content, key_points) VALUES
(1, 'Understanding Level 1 Hair', 'Level 1 represents the darkest natural hair color, characterized by maximum melanin concentration. This level contains the highest amount of eumelanin, creating an intense black appearance.', 
ARRAY[
  'Contains maximum concentration of dark pigments',
  'Minimal to no red undertones',
  'Most resistant to lightening processes',
  'Requires special consideration for color changes'
]);

-- Add Level 1 Chemical Process (keep as is since it's working)
INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes) VALUES
(1, 'High-Lift Process', 'The process of lifting Level 1 hair requires careful attention to achieve desired results while maintaining hair integrity.',
ARRAY[
  'Oxidation of melanin molecules',
  'Breaking of disulfide bonds',
  'Dispersion of color molecules'
],
'Always perform strand test. Monitor processing time closely. Use appropriate strength developer.');

-- Add Level 1 Terminology (fixed version)
INSERT INTO hair_terminology (term, definition, related_levels, category) VALUES
('Eumelanin', 'The pigment responsible for dark hair colors, particularly abundant in Level 1 hair', '{1}', 'Chemical'),
('Maximum Pigmentation', 'The highest concentration of natural color molecules found in hair', '{1}', 'Color Theory'),
('Natural Black', 'The darkest natural hair color with maximum melanin content', '{1}', 'Color Theory'),
('Lifting Resistance', 'The difficulty in lightening very dark hair due to pigment density', '{1}', 'Technical'),
('Color Saturation', 'The intensity and depth of natural hair color', '{1}', 'Color Theory');

-- Add Level 1 Quizzes (keep as is since it's working)
INSERT INTO level_quizzes (level_id, question, options, correct_answer) VALUES
(1, 'What is the primary type of melanin present in Level 1 hair?', 
'["Eumelanin", "Pheomelanin", "Both in equal amounts", "Neither"]'::jsonb, 
'Eumelanin'),

(1, 'Which developer strength is typically recommended for lifting Level 1 hair?',
'["20 volume", "30 volume", "40 volume", "Depends on desired result and hair condition"]'::jsonb,
'Depends on desired result and hair condition'),

(1, 'What characterizes Level 1 hair?',
'["Maximum pigmentation", "Minimal pigmentation", "Equal mix of warm and cool tones", "No melanin"]'::jsonb,
'Maximum pigmentation'),

(1, 'Why is Level 1 hair considered resistant to lightening?',
'["High concentration of melanin", "Lack of pigmentation", "Presence of artificial color", "Weak protein bonds"]'::jsonb,
'High concentration of melanin');
