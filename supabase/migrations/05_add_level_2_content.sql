-- Level 2 Theory
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  2,
  'Understanding Level 2 Hair',
  'Level 2 represents a very dark brown to black hair color with slightly less melanin concentration than Level 1. While still extremely dark, it may show subtle warm undertones in natural light.',
  ARRAY[
    'Very dark brown to black base color',
    'Slightly more lifting potential than Level 1',
    'May exhibit minimal warm undertones',
    'Requires careful formulation for color changes'
  ]
);

-- Level 2 Chemical Process
INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  2,
  'Dark Base Color Processing',
  'When working with Level 2 hair, the lifting process requires careful consideration of the strong melanin bonds. The process involves strategic oxidation while maintaining hair integrity.',
  ARRAY[
    'Initial melanin bond weakening through controlled oxidation',
    'Gradual pigment dispersal with careful monitoring',
    'Multiple step process for significant level changes'
  ],
  'Monitor lifting process closely to prevent excessive damage. Use appropriate volume developers and consider multiple sessions for major changes.'
);

-- Level 2 Terminology
INSERT INTO hair_terminology (term, definition, category, related_levels)
VALUES 
(
  'Dark Base Pigmentation',
  'The natural dark pigments present in Level 2 hair that influence color results',
  'Color Theory',
  ARRAY[2]
),
(
  'Melanin Density',
  'The concentration of melanin pigments in the hair shaft, particularly high in Level 2',
  'Hair Structure',
  ARRAY[1, 2]
),
(
  'Warm Undertone',
  'Subtle reddish or brown tones that may become visible during lifting process',
  'Color Properties',
  ARRAY[2, 3]
);

-- Level 2 Quiz
INSERT INTO level_quizzes (level_id, question, options, correct_answer)
VALUES 
(
  2,
  'What distinguishes Level 2 hair from Level 1?',
  ARRAY[
    'Slightly less melanin concentration',
    'Completely different pigment type',
    'No melanin present',
    'More red pigments'
  ],
  'Slightly less melanin concentration'
),
(
  2,
  'When lifting Level 2 hair, what is a key consideration?',
  ARRAY[
    'Quick single process',
    'No developer needed',
    'Careful monitoring of oxidation',
    'Immediate results'
  ],
  'Careful monitoring of oxidation'
);
