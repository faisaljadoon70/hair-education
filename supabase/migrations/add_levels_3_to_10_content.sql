-- Level 3 to 10 Theory
INSERT INTO level_theory (level_id, title, content, key_points) VALUES
(3, 'Understanding Level 3 Hair', 'Level 3 is a dark brown shade with visible warm undertones. This level marks the beginning of more noticeable underlying pigments while still maintaining significant depth.',
ARRAY['Medium to dark brown base', 'Visible warm undertones', 'Strong resistance to lifting', 'Requires precise formulation']),

(4, 'Understanding Level 4 Hair', 'Level 4 represents medium brown hair with a balanced mix of depth and warmth. This level shows more prominent underlying pigments during color processes.',
ARRAY['Medium brown base', 'Prominent warm undertones', 'Moderate lifting resistance', 'Versatile color possibilities']),

(5, 'Understanding Level 5 Hair', 'Level 5 is a light brown shade that marks the middle point of the level system. It features a perfect balance of depth and underlying warm tones.',
ARRAY['Light brown base', 'Equal balance of cool and warm', 'Moderate lifting ease', 'Excellent color versatility']),

(6, 'Understanding Level 6 Hair', 'Level 6 is a dark blonde that bridges the brown-to-blonde transition. This level shows significant underlying warmth and responds well to both lifting and depositing processes.',
ARRAY['Dark blonde base', 'Strong underlying warmth', 'Good lifting response', 'Requires toning consideration']),

(7, 'Understanding Level 7 Hair', 'Level 7 is a medium blonde with prominent underlying golden tones. This level marks the beginning of the true blonde family.',
ARRAY['Medium blonde base', 'Golden underlying pigments', 'Lifts easily', 'Toning often required']),

(8, 'Understanding Level 8 Hair', 'Level 8 represents a light blonde with subtle underlying warm tones. This level requires careful formulation to achieve desired tone.',
ARRAY['Light blonde base', 'Pale golden undertones', 'Very responsive to lifting', 'Precise toning needed']),

(9, 'Understanding Level 9 Hair', 'Level 9 is a very light blonde with minimal underlying pigment. This level is highly responsive to color processes and requires gentle formulations.',
ARRAY['Very light blonde base', 'Minimal underlying pigment', 'Extremely responsive to color', 'Gentle processing required']),

(10, 'Understanding Level 10 Hair', 'Level 10 is the lightest natural level, representing pale blonde with virtually no underlying pigment. This level requires the most careful handling.',
ARRAY['Palest blonde base', 'No visible undertones', 'Maximum lightness achieved', 'Extremely delicate structure']);

-- Level 3 to 10 Chemical Processes
INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes) VALUES
(3, 'Progressive Lifting', 'Level 3 hair requires careful lifting to manage underlying warmth while achieving desired level.',
ARRAY['Gradual melanin oxidation', 'Controlled bond breaking', 'Pigment dispersion'],
'Monitor lifting progress. Use appropriate developer strength. Consider underlying warmth.'),

(4, 'Balanced Processing', 'Level 4 hair responds well to both lifting and depositing processes, requiring balanced formulation.',
ARRAY['Controlled oxidation', 'Even pigment dispersal', 'Balanced lift and deposit'],
'Check processing frequently. Balance lift with deposit needs. Watch underlying warmth.'),

(5, 'Mid-Level Processing', 'Level 5 represents a pivotal point in processing, requiring precise timing and formulation.',
ARRAY['Moderate oxidation', 'Steady pigment removal', 'Controlled tone exposure'],
'Monitor processing time carefully. Balance lifting and toning needs.'),

(6, 'Blonde Transition', 'Level 6 processing focuses on managing the transition from brown to blonde tones.',
ARRAY['Enhanced oxidation', 'Warm pigment exposure', 'Tone modification'],
'Watch underlying warmth. Consider toning needs. Monitor lift carefully.'),

(7, 'Golden Management', 'Level 7 processing requires careful management of underlying golden tones.',
ARRAY['Accelerated oxidation', 'Golden pigment control', 'Tonal adjustment'],
'Control lifting speed. Prepare for toning. Monitor underlying warmth.'),

(8, 'High-Lift Control', 'Level 8 processing focuses on achieving and maintaining desired blonde tone.',
ARRAY['Refined oxidation', 'Precise pigment removal', 'Careful toning'],
'Use appropriate strength products. Monitor closely. Consider toning requirements.'),

(9, 'Delicate Lifting', 'Level 9 processing requires gentle approach to maintain integrity while achieving results.',
ARRAY['Gentle oxidation', 'Final pigment removal', 'Precise toning'],
'Use gentle products. Monitor carefully. Maintain structural integrity.'),

(10, 'Ultra-Light Processing', 'Level 10 processing demands the most careful and precise approach.',
ARRAY['Minimal oxidation', 'Final refinement', 'Pure tone achievement'],
'Use gentlest formulation. Monitor constantly. Maintain maximum care for integrity.');

-- Level 3 to 10 Terminology
INSERT INTO hair_terminology (term, definition, related_levels, category) VALUES
('Warm Undertone', 'Natural underlying warm pigments visible during lightening process', '{3,4}', 'Color Theory'),
('Color Balance', 'The relationship between cool and warm tones in hair color', '{4,5}', 'Technical'),
('Neutral Base', 'Hair color showing equal balance of warm and cool tones', '{5}', 'Color Theory'),
('Blonde Transition', 'The point where hair color shifts from brown to blonde family', '{6}', 'Technical'),
('Golden Pigment', 'Underlying warm tones characteristic of medium blonde hair', '{7}', 'Chemical'),
('Tonal Control', 'Management of underlying warmth in blonde hair', '{8}', 'Technical'),
('Refined Lifting', 'Careful lightening process for very light blonde hair', '{9}', 'Technical'),
('Pure Tone', 'Absence of visible underlying pigments in lightest blonde', '{10}', 'Color Theory');

-- Level 3 to 10 Quizzes
INSERT INTO level_quizzes (level_id, question, options, correct_answer) VALUES
(3, 'What characterizes Level 3 hair?',
'["Dark brown with visible warmth", "Pure black", "Light brown", "Blonde base"]'::jsonb,
'Dark brown with visible warmth'),

(4, 'How does Level 4 differ from Level 3?',
'["More visible underlying warmth", "Less underlying warmth", "No underlying warmth", "Blue undertones"]'::jsonb,
'More visible underlying warmth'),

(5, 'What makes Level 5 unique?',
'["Perfect balance of depth and warmth", "Maximum darkness", "No underlying pigment", "Pure cool tones"]'::jsonb,
'Perfect balance of depth and warmth'),

(6, 'What is significant about Level 6?',
'["Transition point to blonde family", "Darkest brown", "No undertones", "Maximum lift achieved"]'::jsonb,
'Transition point to blonde family'),

(7, 'What undertone is most prominent in Level 7?',
'["Golden", "Ash", "Violet", "Green"]'::jsonb,
'Golden'),

(8, 'What is a key consideration for Level 8 hair?',
'["Precise toning needs", "Maximum lift required", "No toning needed", "Dark pigment removal"]'::jsonb,
'Precise toning needs'),

(9, 'What characterizes Level 9 processing?',
'["Gentle approach required", "Maximum developer needed", "No special care needed", "Dark pigment removal"]'::jsonb,
'Gentle approach required'),

(10, 'What is unique about Level 10 hair?',
'["Virtually no underlying pigment", "Maximum warm undertones", "Moderate resistance", "Dark base color"]'::jsonb,
'Virtually no underlying pigment');
