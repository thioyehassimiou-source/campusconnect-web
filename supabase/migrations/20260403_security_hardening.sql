-- Migration: Security Hardening for Financial Data
-- 20260403_security_hardening.sql

-- 1. Restrict UPDATE on financial_summaries
-- Only admins should be able to update financial summaries directly.
-- Students should only be able to view them.

DROP POLICY IF EXISTS "Users can update their own financial summary" ON public.financial_summaries;
CREATE POLICY "Admins can update all financial summaries" 
ON public.financial_summaries FOR UPDATE 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 2. Ensure transactions are read-only for students
-- If there were any INSERT/UPDATE policies for non-admins, we drop them.
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can update their own transactions" ON public.transactions;

-- 3. Add validation triggers (Optional but recommended)
-- Prevent manual amount modification for transactions once created
CREATE OR REPLACE FUNCTION public.prevent_transaction_update()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        RAISE EXCEPTION 'Transactions are immutable after creation.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS transaction_immutability ON public.transactions;
CREATE TRIGGER transaction_immutability
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.prevent_transaction_update();
