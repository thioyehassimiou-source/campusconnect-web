-- Migration to add auth_logs for rate limiting
CREATE TABLE IF NOT EXISTS public.auth_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier TEXT NOT NULL, -- e.g. student_id or IP
    event_type TEXT NOT NULL, -- 'login_attempt'
    status TEXT NOT NULL,      -- 'success' | 'failure'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast lookup of recent attempts
CREATE INDEX IF NOT EXISTS idx_auth_logs_identifier_created_at ON public.auth_logs (identifier, created_at);

-- RLS: Only admins can read logs
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view auth logs" ON public.auth_logs
    FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Allow insert from anon/auth for logging
CREATE POLICY "Anyone can insert auth logs" ON public.auth_logs
    FOR INSERT WITH CHECK (true);
