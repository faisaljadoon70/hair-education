-- Add sample educational content for Level 1 (Black)
INSERT INTO level_theory (level_id, title, content, key_points) VALUES
(1, 'Understanding Level 1 Hair', 'Level 1 represents the darkest natural hair color, characterized by maximum melanin concentration. This level contains the highest amount of eumelanin, creating an intense black appearance.', 
ARRAY[
  'Contains maximum concentration of dark pigments',
  'Minimal to no red undertones',
  'Most resistant to lightening processes',
  'Requires special consideration for color changes'
]);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes) VALUES
(1, 'High-Lift Process', 'The process of lifting Level 1 hair requires careful attention to achieve desired results while maintaining hair integrity.',
ARRAY[
  'Oxidation of melanin molecules',
  'Breaking of disulfide bonds',
  'Dispersion of color molecules'
],
'Always perform strand test. Monitor processing time closely. Use appropriate strength developer.');

INSERT INTO hair_terminology (term, definition, related_levels, category) VALUES
('Eumelanin', 'The pigment responsible for dark hair colors, particularly abundant in Level 1 hair', ARRAY[1], 'Chemical'),
('High-Lift', 'A strong lifting process used to achieve very light levels', ARRAY[1, 2], 'Technique'),
('Double Process', 'A two-step coloring technique often required for dark hair', ARRAY[1, 2, 3], 'Technique');

INSERT INTO level_quizzes (level_id, question, options, correct_answer) VALUES
(1, 'What is the primary type of melanin present in Level 1 hair?', 
ARRAY['Eumelanin', 'Pheomelanin', 'Both in equal amounts', 'Neither'], 
'Eumelanin'),
(1, 'Which developer strength is typically recommended for lifting Level 1 hair?',
ARRAY['20 volume', '30 volume', '40 volume', 'Depends on desired result and hair condition'],
'Depends on desired result and hair condition');
