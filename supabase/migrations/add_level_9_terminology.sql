-- Add Level 9 terminology with correct ARRAY format
INSERT INTO hair_terminology (term, definition, related_levels, category) VALUES
('Pale Blonde', 'The lightest natural blonde shade, characterized by minimal warm undertones', ARRAY[9], 'Color Theory'),
('Pre-Lightening', 'The process of removing natural pigment to achieve very light levels', ARRAY[9], 'Technique'),
('Cool Undertone', 'The presence of ash or neutral tones in very light hair', ARRAY[9], 'Color Theory'),
('Level 9 Base', 'The natural or artificial hair color at level 9, very light blonde', ARRAY[9], 'Color Theory'),
('Toner Application', 'The process of neutralizing unwanted warm tones in lightened hair', ARRAY[9], 'Technique');
