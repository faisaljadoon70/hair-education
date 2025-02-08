-- Add Level 2 theory content if missing
INSERT INTO level_theory (level_id, title, content, key_points)
SELECT 2, 
       'Level 2 Hair Color Theory',
       'Level 2, known as Darkest Brown, represents one of the deepest natural hair colors. It contains a high concentration of eumelanin (dark pigment) with minimal pheomelanin (red/brown pigment). Understanding Level 2 is crucial for achieving dark, rich colors and managing the lifting process effectively.',
       ARRAY[
         'Contains high concentration of natural dark pigments',
         'Requires careful consideration when lifting or lightening',
         'Often used as a base for creating deep, rich colors',
         'Important for understanding dark hair color formulation'
       ]
WHERE NOT EXISTS (
    SELECT 1 FROM level_theory WHERE level_id = 2
);

-- Add Level 2 chemical process content if missing
INSERT INTO chemical_processes (level_id, process_name, description, chemical_reactions, safety_notes)
SELECT 2,
       'Level 2 Color Processing',
       'Level 2 hair requires specific chemical considerations due to its high melanin content. When lifting Level 2 hair, the process must be carefully controlled to achieve desired results without compromising hair integrity.',
       ARRAY[
         'Oxidation of existing melanin pigments',
         'Gradual dispersal of dark pigment molecules',
         'Careful alkaline processing to maintain structure'
       ],
       'Monitor processing time carefully. Due to high pigment concentration, Level 2 hair may require longer processing times but should be checked frequently to prevent over-processing.'
WHERE NOT EXISTS (
    SELECT 1 FROM chemical_processes WHERE level_id = 2
);
