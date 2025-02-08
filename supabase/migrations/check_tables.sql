-- Check counts from all educational content tables
SELECT 'hair_terminology' as table_name, COUNT(*) as count FROM hair_terminology
UNION ALL
SELECT 'level_theory' as table_name, COUNT(*) as count FROM level_theory
UNION ALL
SELECT 'chemical_processes' as table_name, COUNT(*) as count FROM chemical_processes
UNION ALL
SELECT 'level_quizzes' as table_name, COUNT(*) as count FROM level_quizzes;
