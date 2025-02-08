-- Add Level 2 terminology if not exists
INSERT INTO hair_terminology (term, definition, category, related_levels)
VALUES 
    (
        'Darkest Brown',
        'The second darkest natural hair color level, containing very high concentrations of eumelanin pigments.',
        'Color Levels',
        '[2]'
    ),
    (
        'Base Pigment',
        'The underlying warm tone revealed during the lightening process of Level 2 hair, typically a very dark brown/red.',
        'Color Theory',
        '[2]'
    ),
    (
        'Lifting Resistance',
        'The natural resistance of Level 2 hair to lightening due to its high concentration of dark pigments.',
        'Technical Process',
        '[2]'
    ),
    (
        'Color Saturation',
        'The intensity and depth of color, particularly prominent in Level 2 hair due to its high pigment concentration.',
        'Color Properties',
        '[2]'
    )
WHERE NOT EXISTS (
    SELECT 1 FROM hair_terminology 
    WHERE related_levels::jsonb ? '2'
);
