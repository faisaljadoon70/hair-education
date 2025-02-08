-- Add Level 2 chemical process content
INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
VALUES (
    2,
    'Level 2 Color Processing',
    'Level 2 hair requires specific chemical considerations due to its high melanin content. When lifting Level 2 hair, the process must be carefully controlled to achieve desired results without compromising hair integrity.',
    ARRAY[
        'Oxidation of existing melanin pigments',
        'Gradual dispersal of dark pigment molecules',
        'Careful alkaline processing to maintain structure'
    ],
    'Monitor processing time carefully. Due to high pigment concentration, Level 2 hair may require longer processing times but should be checked frequently to prevent over-processing.'
);
