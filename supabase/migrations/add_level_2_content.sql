-- Add Level 2 Theory
INSERT INTO level_theory (level_id, title, content, key_points) VALUES
(2, 'Understanding Level 2 Hair', 'Level 2 represents a very dark brown to soft black hair color. This level contains a high concentration of eumelanin but slightly less than Level 1, allowing for some subtle undertones to be visible.', 
ARRAY[
  'High concentration of dark pigments',
  'Subtle warm undertones may be visible',
  'Very resistant to lightening processes',
  'Requires careful formulation for color changes'
]);

-- Add Level 2 Chemical Process
INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes) VALUES
(2, 'Double-Process Lightening', 'Level 2 hair often requires a double-process approach to achieve significant lift while maintaining hair integrity.',
ARRAY[
  'Initial oxidation of melanin',
  'Progressive breaking of disulfide bonds',
  'Gradual dispersion of pigments',
  'Secondary lift for desired level'
],
'Perform strand test before each process. Monitor lifting progress carefully. Allow adequate processing time between treatments. Use appropriate strength developer based on hair condition.');

-- Add Level 2 Terminology
INSERT INTO hair_terminology (term, definition, related_levels, category) VALUES
('Dark Brown', 'The natural hair color characteristic of Level 2, slightly lighter than black', '{2}', 'Color Theory'),
('Double Process', 'A two-step coloring technique often required for dark hair levels', '{2}', 'Technical'),
('Undertone Exposure', 'The process of revealing underlying warm pigments during lightening', '{2}', 'Chemical'),
('Color Resistance', 'The hair''s natural resistance to color penetration and lifting', '{2}', 'Technical'),
('Progressive Lightening', 'The gradual process of lifting very dark hair through multiple steps', '{2}', 'Technical');

-- Add Level 2 Quizzes
INSERT INTO level_quizzes (level_id, question, options, correct_answer) VALUES
(2, 'What is the primary visible difference between Level 1 and Level 2 hair?', 
'["Subtle warm undertones", "Cool undertones", "No visible undertones", "Green undertones"]'::jsonb, 
'Subtle warm undertones'),

(2, 'Why is a double-process often recommended for Level 2 hair?',
'["To achieve significant lift safely", "To darken the hair", "To add more pigment", "To remove curl pattern"]'::jsonb,
'To achieve significant lift safely'),

(2, 'What characterizes Level 2 hair during the lightening process?',
'["Progressive color change", "Immediate lift", "No color change", "Blue undertones"]'::jsonb,
'Progressive color change'),

(2, 'Which statement is true about Level 2 hair?',
'["Contains high eumelanin but less than Level 1", "Contains more eumelanin than Level 1", "Contains no eumelanin", "Contains only pheomelanin"]'::jsonb,
'Contains high eumelanin but less than Level 1');
