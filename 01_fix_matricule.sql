-- Fix script for CampusConnect: Allow Supabase Trigger to work

-- The default Supabase Auth trigger (handle_new_user) fails because it tries to 
-- insert into `profiles` without knowing the `matricule`. 
-- To fix "Database error saving new user", we must drop the NOT NULL constraint 
-- on `matricule`. Our Next.js backend will handle the insertion immediately after.

ALTER TABLE public.profiles ALTER COLUMN matricule DROP NOT NULL;
