-- Level 4 Content
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  4,
  'Understanding Level 4 Hair',
  'Level 4 represents medium brown hair, marking a significant transition point in the level system. This level exhibits clear warm undertones and provides a versatile starting point for both lightening and darkening services.',
  ARRAY[
    'Medium brown base color',
    'Distinct warm undertones visible',
    'Good lifting potential',
    'Versatile for both lightening and darkening'
  ]
);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  4,
  'Medium Brown Processing',
  'Level 4 processing offers balanced options for both lifting and depositing color. The moderate melanin content allows for more predictable results while still requiring attention to underlying warmth.',
  ARRAY[
    'Balanced oxidation process',
    'Controlled warmth exposure',
    'Flexible formulation options'
  ],
  'Monitor lifting process and underlying warmth. Use appropriate volume developers based on desired outcome.'
);

-- Level 5 Content
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  5,
  'Understanding Level 5 Hair',
  'Level 5 is a light brown shade that sits at the middle of the level system. This level shows prominent warm undertones and serves as a crucial reference point for understanding the relationship between depth and tone.',
  ARRAY[
    'Light brown base color',
    'Prominent warm undertones',
    'Excellent versatility for color changes',
    'Key reference point for level system'
  ]
);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  5,
  'Light Brown Processing',
  'Working with Level 5 hair provides excellent versatility in color formulation. The moderate pigment level allows for effective lifting while maintaining hair integrity.',
  ARRAY[
    'Efficient lifting process',
    'Controlled tone manipulation',
    'Balanced deposit integration'
  ],
  'Consider underlying warmth in formula calculations. Monitor processing time for optimal results.'
);

-- Level 6 Content
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  6,
  'Understanding Level 6 Hair',
  'Level 6 represents dark blonde hair, marking the transition from brown to blonde tones. This level is characterized by its strong warm undertones and requires careful consideration of underlying pigments during color formulation.',
  ARRAY[
    'Dark blonde base color',
    'Strong warm undertones',
    'Critical transition level',
    'Important for understanding underlying pigments'
  ]
);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  6,
  'Dark Blonde Processing',
  'Level 6 processing focuses on managing the prominent warm undertones while achieving desired results. This level requires precise formulation to control underlying warmth.',
  ARRAY[
    'Strategic warmth control',
    'Refined lifting process',
    'Tone balancing techniques'
  ],
  'Pay special attention to underlying warm tones. Use appropriate toners when lifting.'
);

-- Level 7 Content
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  7,
  'Understanding Level 7 Hair',
  'Level 7 is a medium blonde that represents the beginning of true blonde territory. This level exhibits minimal remaining natural depth while maintaining noticeable warm undertones.',
  ARRAY[
    'Medium blonde base color',
    'Minimal natural depth',
    'Prominent gold undertones',
    'Key level for blonde services'
  ]
);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  7,
  'Medium Blonde Processing',
  'Processing Level 7 hair involves careful management of remaining natural pigments while working towards desired blonde results. This level is crucial for understanding the relationship between lifting and toning.',
  ARRAY[
    'Refined pigment removal',
    'Strategic toning process',
    'Controlled lift management'
  ],
  'Monitor lifting process carefully. Consider multiple steps for achieving cool tones.'
);

-- Level 8 Content
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  8,
  'Understanding Level 8 Hair',
  'Level 8 represents light blonde hair with minimal remaining natural pigment. This level is characterized by its pale yellow undertones and requires precise formulation for achieving desired tonal results.',
  ARRAY[
    'Light blonde base color',
    'Minimal remaining pigment',
    'Pale yellow undertones',
    'Critical for platinum services'
  ]
);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  8,
  'Light Blonde Processing',
  'Level 8 processing focuses on gentle lifting and precise toning. This level requires careful attention to prevent over-processing while achieving desired results.',
  ARRAY[
    'Gentle lifting techniques',
    'Precise toning methods',
    'Final stage refinement'
  ],
  'Use gentle lifting agents. Monitor processing closely to prevent damage.'
);

-- Level 9 Content
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  9,
  'Understanding Level 9 Hair',
  'Level 9 is very light blonde with almost no remaining natural pigment. This level represents the near-complete removal of natural melanin and serves as the foundation for achieving platinum results.',
  ARRAY[
    'Very light blonde base',
    'Minimal yellow undertones',
    'Near-complete pigment removal',
    'Foundation for platinum'
  ]
);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  9,
  'Very Light Blonde Processing',
  'Processing Level 9 hair requires extreme precision and care. The focus is on maintaining hair integrity while removing final traces of warmth.',
  ARRAY[
    'Final pigment refinement',
    'Precise toner application',
    'Integrity maintenance'
  ],
  'Use minimal lifting agents. Focus on maintaining hair health during processing.'
);

-- Level 10 Content
INSERT INTO level_theory (level_id, title, content, key_points)
VALUES (
  10,
  'Understanding Level 10 Hair',
  'Level 10 represents the lightest possible blonde, with virtually no remaining natural pigment. This level is the palest yellow to white and serves as the ultimate canvas for creative color work.',
  ARRAY[
    'Palest blonde possible',
    'No visible natural pigment',
    'Ultimate light reflection',
    'Perfect creative canvas'
  ]
);

INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
  10,
  'Platinum Blonde Processing',
  'Level 10 processing represents the complete removal of natural pigment while maintaining hair integrity. This level requires the highest level of technical skill and understanding.',
  ARRAY[
    'Complete pigment removal',
    'Maximum lift achievement',
    'Pure tone maintenance'
  ],
  'Extreme care required. Monitor structural integrity throughout process.'
);

-- Additional Terminology for All Levels
INSERT INTO hair_terminology (term, definition, category, related_levels)
VALUES 
(
  'Underlying Pigment',
  'The warm tone that becomes visible during the lifting process',
  'Color Theory',
  ARRAY[4, 5, 6, 7]
),
(
  'Lift and Deposit',
  'The process of removing natural pigment while adding artificial color',
  'Technical Process',
  ARRAY[4, 5, 6, 7, 8]
),
(
  'Tonal Balance',
  'The relationship between cool and warm tones in hair color',
  'Color Theory',
  ARRAY[6, 7, 8, 9, 10]
),
(
  'Double Process',
  'A two-step coloring process involving lifting and toning',
  'Technical Process',
  ARRAY[7, 8, 9, 10]
);

-- Additional Quizzes for Higher Levels
INSERT INTO level_quizzes (level_id, question, options, correct_answer)
VALUES 
(
  7,
  'What is the primary concern when lifting to Level 7?',
  ARRAY[
    'Managing underlying warmth',
    'Adding more pigment',
    'Darkening the hair',
    'Removing all color'
  ],
  'Managing underlying warmth'
),
(
  8,
  'Why is toning crucial at Level 8?',
  ARRAY[
    'To control pale yellow undertones',
    'To add darkness',
    'To remove all color',
    'To add more pigment'
  ],
  'To control pale yellow undertones'
),
(
  9,
  'What characterizes Level 9 hair?',
  ARRAY[
    'Almost no natural pigment',
    'Dark brown color',
    'Red undertones',
    'Maximum pigment'
  ],
  'Almost no natural pigment'
),
(
  10,
  'What is the main consideration for Level 10 processing?',
  ARRAY[
    'Maintaining hair integrity',
    'Adding warm tones',
    'Darkening the hair',
    'Removing texture'
  ],
  'Maintaining hair integrity'
);
