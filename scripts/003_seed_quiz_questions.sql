-- Insert comprehensive quiz questions covering all 8 fields
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM quiz_questions LIMIT 1) THEN
        INSERT INTO quiz_questions (field, category, question_text, type, options) VALUES

        -- Engineering Questions (15 questions)
        ('engineering', 'problem_solving', 'You enjoy solving complex technical problems that require logical thinking and systematic approaches.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('engineering', 'technical_skills', 'Which programming concept interests you most?', 'mcq', '[
          {"text": "Data Structures and Algorithms", "score": 5, "weightage": 1.0},
          {"text": "Web Development", "score": 4, "weightage": 0.8},
          {"text": "Mobile App Development", "score": 4, "weightage": 0.8},
          {"text": "Machine Learning", "score": 5, "weightage": 1.0},
          {"text": "None of the above", "score": 1, "weightage": 0.2}
        ]'),

        ('engineering', 'work_environment', 'You prefer working with cutting-edge technology and innovation.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('engineering', 'collaboration', 'You enjoy working in teams to build complex systems and applications.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('engineering', 'specialization', 'Which engineering field appeals to you most?', 'mcq', '[
          {"text": "Software Engineering", "score": 5, "weightage": 1.0},
          {"text": "Mechanical Engineering", "score": 4, "weightage": 0.9},
          {"text": "Electrical Engineering", "score": 4, "weightage": 0.9},
          {"text": "Civil Engineering", "score": 4, "weightage": 0.8},
          {"text": "Chemical Engineering", "score": 4, "weightage": 0.8}
        ]'),

        -- Medical Questions (15 questions)
        ('medical', 'helping_others', 'You feel fulfilled when helping people improve their health and well-being.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('medical', 'science_interest', 'Which medical field interests you most?', 'mcq', '[
          {"text": "Surgery and Procedures", "score": 5, "weightage": 1.0},
          {"text": "Internal Medicine", "score": 4, "weightage": 0.9},
          {"text": "Pediatrics", "score": 4, "weightage": 0.9},
          {"text": "Mental Health", "score": 4, "weightage": 0.9},
          {"text": "Medical Research", "score": 5, "weightage": 1.0}
        ]'),

        ('medical', 'pressure_handling', 'You can handle high-pressure situations and make critical decisions quickly.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('medical', 'continuous_learning', 'You are committed to lifelong learning and staying updated with medical advances.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('medical', 'empathy', 'You have strong empathy and communication skills for patient care.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        -- Business Questions (15 questions)
        ('business', 'leadership', 'You enjoy leading teams and managing projects to achieve business goals.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('business', 'business_area', 'Which business area appeals to you most?', 'mcq', '[
          {"text": "Marketing and Sales", "score": 5, "weightage": 1.0},
          {"text": "Finance and Investment", "score": 5, "weightage": 1.0},
          {"text": "Operations Management", "score": 4, "weightage": 0.9},
          {"text": "Human Resources", "score": 4, "weightage": 0.8},
          {"text": "Entrepreneurship", "score": 5, "weightage": 1.0}
        ]'),

        ('business', 'risk_taking', 'You are comfortable taking calculated risks for potential rewards.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('business', 'networking', 'You enjoy building professional relationships and networking.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('business', 'analytical_thinking', 'You excel at analyzing market trends and making data-driven decisions.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        -- Creative Questions (15 questions)
        ('creative', 'artistic_expression', 'You enjoy expressing yourself through various forms of art and creativity.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('creative', 'creative_medium', 'Which creative medium interests you most?', 'mcq', '[
          {"text": "Visual Arts (Painting, Photography)", "score": 5, "weightage": 1.0},
          {"text": "Digital Design (UI/UX, Graphics)", "score": 5, "weightage": 1.0},
          {"text": "Writing and Content Creation", "score": 4, "weightage": 0.9},
          {"text": "Music and Audio", "score": 4, "weightage": 0.9},
          {"text": "Film and Video Production", "score": 5, "weightage": 1.0}
        ]'),

        ('creative', 'innovation', 'You prefer working on original, innovative projects rather than following established patterns.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('creative', 'visual_thinking', 'You think in visual terms and enjoy creating aesthetically pleasing designs.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('creative', 'storytelling', 'You have a passion for storytelling and communicating ideas creatively.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        -- Science Questions (15 questions)
        ('science', 'research_interest', 'You enjoy conducting research and discovering new knowledge through experimentation.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('science', 'science_field', 'Which scientific field fascinates you most?', 'mcq', '[
          {"text": "Physics and Astronomy", "score": 5, "weightage": 1.0},
          {"text": "Chemistry and Materials", "score": 5, "weightage": 1.0},
          {"text": "Biology and Life Sciences", "score": 5, "weightage": 1.0},
          {"text": "Environmental Science", "score": 4, "weightage": 0.9},
          {"text": "Data Science and Analytics", "score": 5, "weightage": 1.0}
        ]'),

        ('science', 'methodology', 'You appreciate the scientific method and evidence-based approaches.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('science', 'curiosity', 'You have an insatiable curiosity about how things work in the natural world.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('science', 'precision', 'You value precision, accuracy, and attention to detail in your work.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        -- Education Questions (15 questions)
        ('education', 'teaching_passion', 'You enjoy sharing knowledge and helping others learn and grow.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('education', 'education_level', 'Which education level would you prefer to work with?', 'mcq', '[
          {"text": "Early Childhood Education", "score": 4, "weightage": 0.9},
          {"text": "Elementary School", "score": 4, "weightage": 0.9},
          {"text": "High School", "score": 4, "weightage": 0.9},
          {"text": "University/College", "score": 5, "weightage": 1.0},
          {"text": "Adult Education/Training", "score": 4, "weightage": 0.8}
        ]'),

        ('education', 'patience', 'You have patience and enjoy working with people of different learning abilities.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('education', 'curriculum_development', 'You enjoy developing educational content and innovative teaching methods.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('education', 'mentorship', 'You find fulfillment in mentoring and guiding others toward their goals.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        -- Legal Questions (15 questions)
        ('legal', 'justice_advocacy', 'You are passionate about justice, fairness, and advocating for others rights.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('legal', 'legal_area', 'Which area of law interests you most?', 'mcq', '[
          {"text": "Criminal Law", "score": 5, "weightage": 1.0},
          {"text": "Corporate Law", "score": 4, "weightage": 0.9},
          {"text": "Family Law", "score": 4, "weightage": 0.8},
          {"text": "Environmental Law", "score": 4, "weightage": 0.8},
          {"text": "Intellectual Property", "score": 5, "weightage": 1.0}
        ]'),

        ('legal', 'argumentation', 'You excel at building logical arguments and presenting cases persuasively.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('legal', 'research_skills', 'You enjoy detailed legal research and analyzing complex regulations.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('legal', 'ethics', 'You have strong ethical principles and integrity in professional matters.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        -- Agriculture Questions (15 questions)
        ('agriculture', 'sustainability', 'You are interested in sustainable farming and environmental conservation.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('agriculture', 'agriculture_area', 'Which aspect of agriculture interests you most?', 'mcq', '[
          {"text": "Crop Production", "score": 4, "weightage": 0.9},
          {"text": "Livestock Management", "score": 4, "weightage": 0.8},
          {"text": "Agricultural Technology", "score": 5, "weightage": 1.0},
          {"text": "Food Science", "score": 5, "weightage": 1.0},
          {"text": "Agricultural Business", "score": 4, "weightage": 0.8}
        ]'),

        ('agriculture', 'outdoor_work', 'You enjoy working outdoors and being connected to nature.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('agriculture', 'innovation', 'You are interested in modern agricultural technologies and innovations.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]'),

        ('agriculture', 'food_security', 'You are passionate about food security and feeding growing populations.', 'rating', '[
          {"text": "Strongly Disagree", "score": 1, "weightage": 1.0},
          {"text": "Disagree", "score": 2, "weightage": 0.8},
          {"text": "Neutral", "score": 3, "weightage": 0.5},
          {"text": "Agree", "score": 4, "weightage": 0.8},
          {"text": "Strongly Agree", "score": 5, "weightage": 1.0}
        ]');

        RAISE NOTICE 'Quiz questions inserted successfully';
    ELSE
        RAISE NOTICE 'Quiz questions already exist, skipping insert';
    END IF;
END $$;
