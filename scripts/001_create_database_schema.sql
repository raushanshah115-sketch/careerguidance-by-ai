-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create quiz results table
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  field_scores JSONB NOT NULL,
  top_career_field TEXT NOT NULL,
  personality_type TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for quiz results
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Quiz results policies
CREATE POLICY "quiz_results_select_own" ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "quiz_results_insert_own" ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "quiz_results_update_own" ON public.quiz_results FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "quiz_results_delete_own" ON public.quiz_results FOR DELETE USING (auth.uid() = user_id);

-- Create AI analysis table
CREATE TABLE IF NOT EXISTS public.ai_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_result_id UUID REFERENCES public.quiz_results(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL, -- 'career_match', 'personality', 'learning_path'
  analysis_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for AI analysis
ALTER TABLE public.ai_analysis ENABLE ROW LEVEL SECURITY;

-- AI analysis policies
CREATE POLICY "ai_analysis_select_own" ON public.ai_analysis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ai_analysis_insert_own" ON public.ai_analysis FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_analysis_update_own" ON public.ai_analysis FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "ai_analysis_delete_own" ON public.ai_analysis FOR DELETE USING (auth.uid() = user_id);

-- Create mentor conversations table
CREATE TABLE IF NOT EXISTS public.mentor_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for mentor conversations
ALTER TABLE public.mentor_conversations ENABLE ROW LEVEL SECURITY;

-- Mentor conversations policies
CREATE POLICY "mentor_conversations_select_own" ON public.mentor_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mentor_conversations_insert_own" ON public.mentor_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mentor_conversations_update_own" ON public.mentor_conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "mentor_conversations_delete_own" ON public.mentor_conversations FOR DELETE USING (auth.uid() = user_id);

-- Create mentor messages table
CREATE TABLE IF NOT EXISTS public.mentor_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.mentor_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for mentor messages
ALTER TABLE public.mentor_messages ENABLE ROW LEVEL SECURITY;

-- Mentor messages policies
CREATE POLICY "mentor_messages_select_own" ON public.mentor_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mentor_messages_insert_own" ON public.mentor_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mentor_messages_update_own" ON public.mentor_messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "mentor_messages_delete_own" ON public.mentor_messages FOR DELETE USING (auth.uid() = user_id);

-- Create document verification table
CREATE TABLE IF NOT EXISTS public.document_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_hash TEXT NOT NULL,
  blockchain_hash TEXT,
  ipfs_hash TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for document verifications
ALTER TABLE public.document_verifications ENABLE ROW LEVEL SECURITY;

-- Document verifications policies
CREATE POLICY "document_verifications_select_own" ON public.document_verifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "document_verifications_insert_own" ON public.document_verifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "document_verifications_update_own" ON public.document_verifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "document_verifications_delete_own" ON public.document_verifications FOR DELETE USING (auth.uid() = user_id);
