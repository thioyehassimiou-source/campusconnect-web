-- Security Updates: Profiles RLS and Role Protection

-- 1. Profiles Table Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own profile during signup
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile (except role)
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Prevent role modification by users
-- This trigger will ensure that only admins can change the role of a user.
-- Regular users attempting to change their own role will have the change reverted.

CREATE OR REPLACE FUNCTION public.handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  -- If the role is being changed
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- If the current user is NOT an admin, revert the role change
    IF (SELECT role FROM public.profiles WHERE id = auth.uid()) IS DISTINCT FROM 'admin' THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_update_protect_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_profile_update();

-- 3. Ensure all critical tables have RLS enabled
ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
