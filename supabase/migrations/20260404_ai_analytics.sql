-- Migration: Create AI Analytics Table
CREATE TABLE IF NOT EXISTS public.ai_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    query_type TEXT NOT NULL, -- 'p4_response', 'workflow_step', etc.
    model_used TEXT,
    status TEXT DEFAULT 'success',
    latency_ms INTEGER,
    action_triggered TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for rate limiting and analytics
CREATE INDEX IF NOT EXISTS idx_ai_analytics_profile_created ON public.ai_analytics (profile_id, created_at);

-- RLS
ALTER TABLE public.ai_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all AI analytics" ON public.ai_analytics
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert their own AI analytics" ON public.ai_analytics
    FOR INSERT WITH CHECK (auth.uid() = profile_id);
