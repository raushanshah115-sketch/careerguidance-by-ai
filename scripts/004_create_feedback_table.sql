-- Create feedback table for user reviews and ratings
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  quiz_rating INTEGER CHECK (quiz_rating >= 1 AND quiz_rating <= 5),
  mentor_rating INTEGER CHECK (mentor_rating >= 1 AND mentor_rating <= 5),
  verification_rating INTEGER CHECK (verification_rating >= 1 AND verification_rating <= 5),
  ease_of_use INTEGER NOT NULL CHECK (ease_of_use >= 1 AND ease_of_use <= 5),
  recommendation_likelihood INTEGER NOT NULL CHECK (recommendation_likelihood >= 1 AND recommendation_likelihood <= 10),
  favorite_feature TEXT,
  improvement_suggestions TEXT,
  additional_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "feedback_select_own" ON public.feedback 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "feedback_insert_own" ON public.feedback 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "feedback_update_own" ON public.feedback 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "feedback_delete_own" ON public.feedback 
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_feedback_updated_at 
  BEFORE UPDATE ON public.feedback 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
