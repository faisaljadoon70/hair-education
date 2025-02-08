-- Check if we have Level 2 content in all tables
SELECT 'level_theory' as table_name, COUNT(*) as count 
FROM level_theory 
WHERE level_id = 2
UNION ALL
SELECT 'chemical_processes' as table_name, COUNT(*) as count 
FROM chemical_processes 
WHERE level_id = 2
UNION ALL
SELECT 'hair_terminology' as table_name, COUNT(*) as count 
FROM hair_terminology 
WHERE related_levels::jsonb ? '2'
UNION ALL
SELECT 'level_quizzes' as table_name, COUNT(*) as count 
FROM level_quizzes 
WHERE level_id = 2;
