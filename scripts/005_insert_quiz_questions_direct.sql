-- Direct insert of quiz questions with proper JSON formatting
-- This script will populate the quiz_questions table with career assessment questions

-- Clear existing questions first
DELETE FROM quiz_questions;

-- Insert Technology questions
INSERT INTO quiz_questions (id, question_text, type, options, field, category, created_at, updated_at) VALUES
(gen_random_uuid(), 'How comfortable are you with learning new programming languages?', 'multiple_choice', '["Very comfortable - I love learning new tech", "Somewhat comfortable - I can adapt", "Neutral - depends on the situation", "Somewhat uncomfortable - I prefer familiar tools", "Very uncomfortable - I stick to what I know"]', 'technology', 'technical_skills', NOW(), NOW()),

(gen_random_uuid(), 'Which type of problem-solving appeals to you most?', 'multiple_choice', '["Debugging complex code issues", "Designing user-friendly interfaces", "Analyzing large datasets", "Building system architectures", "Creating automated processes"]', 'technology', 'problem_solving', NOW(), NOW()),

(gen_random_uuid(), 'How do you prefer to work on projects?', 'multiple_choice', '["Independently with minimal supervision", "In small collaborative teams", "Leading large project teams", "Following detailed specifications", "Flexible - adapting to project needs"]', 'technology', 'work_style', NOW(), NOW()),

-- Insert Healthcare questions
(gen_random_uuid(), 'How do you handle high-stress situations?', 'multiple_choice', '["I thrive under pressure and stay calm", "I manage well with proper preparation", "I need some time to process but adapt", "I prefer low-stress environments", "I avoid high-stress situations when possible"]', 'healthcare', 'stress_management', NOW(), NOW()),

(gen_random_uuid(), 'What motivates you most in helping others?', 'multiple_choice', '["Direct patient care and healing", "Researching solutions to health problems", "Teaching others about health", "Managing healthcare systems", "Developing medical technologies"]', 'healthcare', 'helping_motivation', NOW(), NOW()),

-- Insert Business questions
(gen_random_uuid(), 'Which business activity interests you most?', 'multiple_choice', '["Strategic planning and decision making", "Building relationships with clients", "Analyzing market trends and data", "Managing teams and operations", "Creating innovative products/services"]', 'business', 'business_interests', NOW(), NOW()),

(gen_random_uuid(), 'How do you approach risk in decision-making?', 'multiple_choice', '["I embrace calculated risks for growth", "I carefully analyze before taking risks", "I prefer moderate, balanced approaches", "I take risks only when necessary", "I prefer safe, proven strategies"]', 'business', 'risk_tolerance', NOW(), NOW()),

-- Insert Creative questions
(gen_random_uuid(), 'What type of creative expression appeals to you?', 'multiple_choice', '["Visual arts and design", "Writing and storytelling", "Music and audio production", "Performance and entertainment", "Digital and interactive media"]', 'creative', 'creative_expression', NOW(), NOW()),

(gen_random_uuid(), 'How important is creative freedom in your work?', 'multiple_choice', '["Essential - I need complete creative control", "Very important - I want significant input", "Moderately important - some freedom is good", "Somewhat important - I can work within guidelines", "Not critical - I can follow creative direction"]', 'creative', 'creative_freedom', NOW(), NOW()),

-- Insert Education questions
(gen_random_uuid(), 'What age group do you most enjoy working with?', 'multiple_choice', '["Young children (ages 3-8)", "Elementary students (ages 9-12)", "Teenagers (ages 13-18)", "Young adults (ages 19-25)", "Adult learners (25+)"]', 'education', 'age_preference', NOW(), NOW()),

(gen_random_uuid(), 'Which teaching approach resonates with you?', 'multiple_choice', '["Hands-on, experiential learning", "Traditional lecture and discussion", "Technology-integrated instruction", "One-on-one personalized tutoring", "Group collaboration and projects"]', 'education', 'teaching_style', NOW(), NOW()),

-- Insert General personality questions
(gen_random_uuid(), 'How do you prefer to communicate with others?', 'multiple_choice', '["Face-to-face conversations", "Written communication (email, chat)", "Phone or video calls", "Group presentations", "Visual presentations and demos"]', 'general', 'communication_style', NOW(), NOW()),

(gen_random_uuid(), 'What work environment energizes you most?', 'multiple_choice', '["Quiet, focused individual workspace", "Collaborative open office", "Dynamic, fast-paced environment", "Outdoor or field-based work", "Remote/flexible location work"]', 'general', 'work_environment', NOW(), NOW()),

(gen_random_uuid(), 'Which best describes your ideal work schedule?', 'multiple_choice', '["Traditional 9-5 weekdays", "Flexible hours with core meetings", "Project-based with deadline focus", "Shift work with variety", "Completely flexible/self-directed"]', 'general', 'schedule_preference', NOW(), NOW()),

(gen_random_uuid(), 'What drives you most in your career?', 'multiple_choice', '["Making a positive impact on society", "Achieving financial success", "Continuous learning and growth", "Recognition and advancement", "Work-life balance and flexibility"]', 'general', 'career_motivation', NOW(), NOW());

-- Verify the insert
SELECT COUNT(*) as total_questions FROM quiz_questions;
SELECT field, COUNT(*) as questions_per_field FROM quiz_questions GROUP BY field;
