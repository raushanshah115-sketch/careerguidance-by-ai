-- Creating a new seeding script with proper quiz questions
-- Seed quiz questions for career assessment
INSERT INTO quiz_questions (id, question_text, type, options, field, category, created_at, updated_at) VALUES
-- Technology Questions
('550e8400-e29b-41d4-a716-446655440001', 'How comfortable are you with learning new programming languages?', 'multiple_choice', '["Very comfortable - I love learning new technologies", "Somewhat comfortable - I can adapt when needed", "Neutral - I prefer sticking to what I know", "Uncomfortable - I prefer stable, established tools"]', 'technology', 'technical_aptitude', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440002', 'What type of technology projects interest you most?', 'multiple_choice', '["Web development and user interfaces", "Mobile app development", "Data analysis and machine learning", "System architecture and backend services", "Cybersecurity and network protection"]', 'technology', 'interests', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440003', 'How do you prefer to solve complex problems?', 'multiple_choice', '["Break them down into smaller, manageable parts", "Research existing solutions and adapt them", "Collaborate with others to brainstorm solutions", "Experiment with different approaches until something works"]', 'technology', 'problem_solving', NOW(), NOW()),

-- Healthcare Questions
('550e8400-e29b-41d4-a716-446655440004', 'How do you feel about working directly with people in need?', 'multiple_choice', '["Very motivated - helping others gives me energy", "Somewhat interested - I like making a difference", "Neutral - I can work with people when needed", "Prefer indirect impact - I like helping from behind the scenes"]', 'healthcare', 'interpersonal', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440005', 'What aspect of healthcare interests you most?', 'multiple_choice', '["Direct patient care and treatment", "Medical research and innovation", "Healthcare administration and policy", "Mental health and counseling", "Public health and prevention"]', 'healthcare', 'interests', NOW(), NOW()),

-- Business Questions
('550e8400-e29b-41d4-a716-446655440006', 'How do you approach making important decisions?', 'multiple_choice', '["Analyze data and metrics thoroughly", "Consider the impact on all stakeholders", "Trust my intuition and experience", "Seek input from others before deciding"]', 'business', 'decision_making', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440007', 'What motivates you most in a work environment?', 'multiple_choice', '["Achieving measurable results and targets", "Building relationships and networks", "Creating innovative solutions", "Having autonomy and flexibility"]', 'business', 'motivation', NOW(), NOW()),

-- Creative Questions
('550e8400-e29b-41d4-a716-446655440008', 'How do you express your creativity?', 'multiple_choice', '["Visual arts - design, photography, illustration", "Writing and storytelling", "Music and audio production", "Performance and entertainment", "Crafts and hands-on creation"]', 'creative', 'expression', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440009', 'What role does creativity play in your ideal job?', 'multiple_choice', '["Central - I want creativity to be my main focus", "Important - I need creative outlets in my work", "Moderate - Some creative elements would be nice", "Minor - I prefer structure and clear guidelines"]', 'creative', 'importance', NOW(), NOW()),

-- Education Questions
('550e8400-e29b-41d4-a716-446655440010', 'How do you prefer to share knowledge with others?', 'multiple_choice', '["One-on-one mentoring and guidance", "Teaching groups and leading workshops", "Creating educational content and materials", "Facilitating discussions and collaborative learning"]', 'education', 'teaching_style', NOW(), NOW()),

-- General Personality Questions
('550e8400-e29b-41d4-a716-446655440011', 'In group projects, you typically:', 'multiple_choice', '["Take the lead and organize the team", "Contribute specialized skills and expertise", "Facilitate communication and collaboration", "Focus on quality and attention to detail"]', 'general', 'teamwork', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440012', 'Your ideal work environment is:', 'multiple_choice', '["Fast-paced and dynamic with constant change", "Collaborative with lots of team interaction", "Quiet and focused with minimal distractions", "Flexible with a mix of independent and team work"]', 'general', 'work_environment', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440013', 'When facing a challenge, you:', 'multiple_choice', '["Jump in immediately and learn as you go", "Research thoroughly before taking action", "Seek advice from experienced colleagues", "Break it down into smaller, manageable steps"]', 'general', 'challenge_approach', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440014', 'What type of impact do you want to make?', 'multiple_choice', '["Direct impact on individuals and communities", "Systemic change through innovation", "Economic growth and business success", "Cultural and artistic influence"]', 'general', 'impact', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440015', 'Your communication style is best described as:', 'multiple_choice', '["Direct and results-focused", "Collaborative and inclusive", "Analytical and detail-oriented", "Creative and inspiring"]', 'general', 'communication', NOW(), NOW());
