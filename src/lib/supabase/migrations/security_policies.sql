-- # SECURITY HARDENING: RLS POLICIES FOR CAMPUSCONNECT
-- Paste this into the Supabase SQL Editor to secure your database.

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

-- 2. PROFILES POLICIES
-- Everyone can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Teachers can view profiles of all users (to list students)
CREATE POLICY "Teachers can view all profiles" 
ON public.profiles FOR SELECT 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'teacher');

-- 3. ATTENDANCE POLICIES
-- Students can only view their own attendance
CREATE POLICY "Students can view own attendance" 
ON public.attendance FOR SELECT 
USING (auth.uid() = student_id);

-- Students can ONLY insert their own attendance (for markAttendance API bypass check)
-- NOTE: The API handles this, but RLS adds a second layer.
CREATE POLICY "Students can mark own attendance" 
ON public.attendance FOR INSERT 
WITH CHECK (auth.uid() = student_id);

-- Teachers can view all attendance for audit
CREATE POLICY "Teachers can view all attendance" 
ON public.attendance FOR SELECT 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'teacher');

-- 4. GRADES POLICIES
-- Students can ONLY view their own grades
CREATE POLICY "Students can view own grades" 
ON public.grades FOR SELECT 
USING (auth.uid() = student_id);

-- Teachers can manage grades
CREATE POLICY "Teachers can manage grades" 
ON public.grades FOR ALL 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'teacher');

-- 5. NOTIFICATIONS POLICIES
-- Users can only view their own notifications
CREATE POLICY "Users can view own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = profile_id);

-- Users can mark their own notifications as read
CREATE POLICY "Users can update own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = profile_id);

-- 6. COURSES & SCHEDULES
-- Everyone can view courses and schedules
CREATE POLICY "Public courses view" 
ON public.courses FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Public schedules view" 
ON public.schedules FOR SELECT 
TO authenticated 
USING (true);

-- 7. ADMIN BYPASS
-- Ensure service_role can always bypass (default, but good to explicit)
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
