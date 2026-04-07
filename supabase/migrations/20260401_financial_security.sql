-- Migration: Securing Financial Summaries with Row Level Security
-- 20260401_financial_security.sql

-- 1. Create table with proper constraints
CREATE TABLE IF NOT EXISTS public.financial_summaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    remaining_balance DECIMAL(10,2) DEFAULT 0,
    total_paid DECIMAL(10,2) DEFAULT 0,
    pending_fees DECIMAL(10,2) DEFAULT 0,
    payment_plan TEXT,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    next_deadline TEXT,
    currency TEXT DEFAULT '€',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one summary per user
    CONSTRAINT financial_summaries_user_id_key UNIQUE(user_id)
);

-- 2. Enable Row Level Security
ALTER TABLE public.financial_summaries ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- SELECT: Users can only read their own financial data
DROP POLICY IF EXISTS "Users can view their own financial summary" ON public.financial_summaries;
CREATE POLICY "Users can view their own financial summary" 
ON public.financial_summaries FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- INSERT: Only authenticated users can insert their own data (usually created upon first payment or profile setup)
DROP POLICY IF EXISTS "Users can insert their own financial summary" ON public.financial_summaries;
CREATE POLICY "Users can insert their own financial summary" 
ON public.financial_summaries FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own data (though usually this belongs to a service, we allow it for profile-linked updates if any)
DROP POLICY IF EXISTS "Users can update their own financial summary" ON public.financial_summaries;
CREATE POLICY "Users can update their own financial summary" 
ON public.financial_summaries FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- ADMIN: Admins can manage all financial data
DROP POLICY IF EXISTS "Admins can manage all financial summaries" ON public.financial_summaries;
CREATE POLICY "Admins can manage all financial summaries" 
ON public.financial_summaries FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 4. Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_financial_summaries_updated_at ON public.financial_summaries;
CREATE TRIGGER set_financial_summaries_updated_at
BEFORE UPDATE ON public.financial_summaries
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5. Add to Realtime (Optional but useful for live balance updates)
ALTER PUBLICATION supabase_realtime ADD TABLE public.financial_summaries;
