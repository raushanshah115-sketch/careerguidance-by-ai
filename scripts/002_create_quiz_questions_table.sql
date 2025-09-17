-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    field TEXT NOT NULL,
    category TEXT NOT NULL,
    question_text TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('rating', 'mcq')),
    options JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_questions_field ON quiz_questions(field);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_category ON quiz_questions(category);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_type ON quiz_questions(type);

-- Enable RLS (Row Level Security)
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read quiz questions
CREATE POLICY "Allow authenticated users to read quiz questions" ON quiz_questions
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Create policy to allow service role to insert/update quiz questions
CREATE POLICY "Allow service role to manage quiz questions" ON quiz_questions
    FOR ALL 
    TO service_role 
    USING (true);
