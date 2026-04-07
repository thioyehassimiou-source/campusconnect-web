-- Ultimate Fix for "Database error saving new user"
-- The generic Supabase trigger is conflicting with our custom registration logic.
-- Since our Next.js backend handles the profile creation perfectly via upsert,
-- we can safely disable the automatic database trigger.

-- 1. Drop the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- 2. Drop the function
DROP FUNCTION IF EXISTS public.handle_new_user();
