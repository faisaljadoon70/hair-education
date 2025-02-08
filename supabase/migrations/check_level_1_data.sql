-- Check Level 1 data in all tables
SELECT 'terminology' as table_name, COUNT(*) as count FROM hair_terminology WHERE 1 = ANY(related_levels);

SELECT 'quizzes' as table_name, COUNT(*) as count FROM level_quizzes WHERE level_id = 1;

-- Show actual terminology entries
SELECT term, definition, related_levels, category 
FROM hair_terminology 
WHERE 1 = ANY(related_levels);

-- Show actual quiz entries
SELECT question, options, correct_answer 
FROM level_quizzes 
WHERE level_id = 1;
