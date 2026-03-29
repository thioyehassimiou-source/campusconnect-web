-- Migration for CampusConnect: Switch to INE Authentication
-- Execute this script in your Supabase SQL Editor

-- 1. Add 'matricule' column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS matricule TEXT UNIQUE NOT NULL;

-- 2. Ensure RLS is active
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Add INSERT policy so users can create their own profile during registration
BEGIN;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
  CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
COMMIT;
