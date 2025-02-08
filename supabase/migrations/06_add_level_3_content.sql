-- Level 3 Theory
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  3,
  'Understanding Level 3 Hair',
  'Level 3 is characterized as dark brown hair with noticeable but still minimal warm undertones. This level marks the transition from near-black to distinctly brown tones, offering more versatility in color formulation while still maintaining significant depth.',
  ARRAY[
    'Dark brown base color with subtle warmth',
    'More visible undertones than Levels 1-2',
    'Better lifting potential for color changes',
    'Balanced melanin concentration'
  ]
);

-- Level 3 Chemical Process
INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  3,
  'Dark Brown Processing',
  'Level 3 hair processing involves working with still-significant melanin content while managing the emerging warm undertones. The lifting process becomes more predictable compared to darker levels.',
  ARRAY[
    'Controlled oxidation of melanin bonds',
    'Management of emerging warm undertones',
    'Progressive color deposit integration'
  ],
  'While more forgiving than levels 1-2, careful monitoring is still essential. Use appropriate developers and consider underlying warmth in formula calculations.'
);

-- Level 3 Terminology
INSERT INTO hair_terminology (term, definition, category, related_levels)
VALUES 
(
  'Undertone Emergence',
  'The process where warm underlying pigments become visible during lifting',
  'Color Theory',
  ARRAY[3, 4]
),
(
  'Dark Brown Base',
  'The fundamental dark brown color characteristic of Level 3 hair',
  'Hair Classification',
  ARRAY[3]
),
(
  'Transitional Depth',
  'The color depth that marks the transition from black to brown tones',
  'Color Properties',
  ARRAY[2, 3, 4]
);

-- Level 3 Quiz
INSERT INTO level_quizzes (level_id, question, options, correct_answer)
VALUES 
(
  3,
  'What is a key characteristic of Level 3 hair?',
  ARRAY[
    'Pure black color',
    'Dark brown with subtle warmth',
    'Light brown color',
    'No underlying pigments'
  ],
  'Dark brown with subtle warmth'
),
(
  3,
  'How does Level 3 differ from Level 2 in processing?',
  ARRAY[
    'Requires no lifting',
    'More predictable lifting process',
    'Cannot be lightened',
    'No underlying warmth'
  ],
  'More predictable lifting process'
);
