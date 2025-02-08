-- Add Level 2 terminology
INSERT INTO hair_terminology (term, definition, category, related_levels)
SELECT term, definition, category, related_levels
FROM (VALUES
    (
        'Darkest Brown',
        'The second darkest natural hair color level, containing very high concentrations of eumelanin pigments.',
        'Color Levels',
        '[2]'::jsonb
    ),
    (
        'Base Pigment',
        'The underlying warm tone revealed during the lightening process of Level 2 hair, typically a very dark brown/red.',
        'Color Theory',
        '[2]'::jsonb
    ),
    (
        'Lifting Resistance',
        'The natural resistance of Level 2 hair to lightening due to its high concentration of dark pigments.',
        'Technical Process',
        '[2]'::jsonb
    ),
    (
        'Color Saturation',
        'The intensity and depth of color, particularly prominent in Level 2 hair due to its high pigment concentration.',
        'Color Properties',
        '[2]'::jsonb
    )
) AS t(term, definition, category, related_levels)
WHERE NOT EXISTS (
    SELECT 1 FROM hair_terminology 
    WHERE related_levels @> '[2]'::jsonb
);
