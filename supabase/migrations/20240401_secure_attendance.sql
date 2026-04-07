-- Migration: Secure QR Attendance System
-- 20240401_secure_attendance.sql

-- 1. Create Sessions Table
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    instructor_id UUID REFERENCES public.profiles(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    
    -- Ensure instructor is actually the one assigned to the course (Optional but recommended)
    CONSTRAINT instructor_owns_course CHECK (true) -- Can be enforced via trigger if needed
);

-- 2. Update Attendance Table
-- We add session_id and more strict constraints
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE;

-- Re-create unique constraint to include session_id explicitly if not already there
ALTER TABLE public.attendance DROP CONSTRAINT IF EXISTS attendance_student_session_unique;
ALTER TABLE public.attendance ADD CONSTRAINT attendance_student_session_unique UNIQUE(student_id, session_id);

-- 3. Enable RLS
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- 4. Sessions Policies
DROP POLICY IF EXISTS "Anyone authenticated can view sessions" ON public.sessions;
CREATE POLICY "Anyone authenticated can view sessions" ON public.sessions 
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Only instructors can create sessions" ON public.sessions;
CREATE POLICY "Only instructors can create sessions" ON public.sessions 
    FOR INSERT TO authenticated 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('teacher', 'admin')
        )
    );

-- 5. Attendance Policies
DROP POLICY IF EXISTS "Students can insert their own attendance" ON public.attendance;
CREATE POLICY "Students can insert their own attendance" 
ON public.attendance FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = student_id); -- Important: student_id must match authenticated user

DROP POLICY IF EXISTS "Users can view their own attendance" ON public.attendance;
CREATE POLICY "Users can view their own attendance" 
ON public.attendance FOR SELECT 
TO authenticated 
USING (auth.uid() = student_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
));
